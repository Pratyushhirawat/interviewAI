import redis from "../../../shared/redis/redis.js";
import { resumeAgent } from "../agents/resumeAgent.js";
import extractText from "../config/pdf.js";
import Resume from "../models/resumeModel.js";
import fs from 'fs';

// LLM se aaya kuch bhi (string ya object) ho, use clean string mein convert karta hai
function normalizeToStringArray(data) {
  if (!data) return [];
  if (!Array.isArray(data)) return [String(data)];

  return data.map((item) => {
    if (typeof item === "string") return item;

    if (typeof item === "object" && item !== null) {
      // Projects: { name, description }
      if (item.name && item.description) {
        return `${item.name}: ${item.description}`;
      }
      // Education: { degree, institution, duration, relevantCourses }
      if (item.degree) {
        const courses = Array.isArray(item.relevantCourses)
          ? ` | Courses: ${item.relevantCourses.join(", ")}`
          : "";
        return `${item.degree}, ${item.institution || ""} (${item.duration || ""})${courses}`;
      }
      // Experience: { role, company, duration, description } jaisa kuch bhi ho sakta hai
      if (item.role || item.company || item.title) {
        return Object.values(item).filter(Boolean).join(" - ");
      }
      // Unknown shape — sab keys ko fallback ke roop mein join kar do
      return Object.entries(item)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
        .join(" | ");
    }

    return String(item);
  });
}

// resumeData ke saare array fields ko normalize karta hai
function normalizeResumeData(resumeData) {
  const arrayFields = [
    "education",
    "skills",
    "projects",
    "experience",
    "strengths",
    "weaknesses",
    "missingSkills",
    "recommendations",
  ];

  const normalized = { ...resumeData };

  arrayFields.forEach((field) => {
    if (field in normalized) {
      normalized[field] = normalizeToStringArray(normalized[field]);
    }
  });

  return normalized;
}

export const uploadResume = async (req,res) => {
    let file;
    try {
         file = req.file;
        if (!file) {
            return res.status(400).json({
                success:false,
                message:"Resume PDF is required"
            })
        }

        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(400).json({
                success:false,
                message:"UserId is required"
            })
        }

        const resumeText = await extractText(file.path)

        const aiResponse = await resumeAgent(resumeText)

        const resumeData = normalizeResumeData(JSON.parse(aiResponse))

        let resume = await Resume.findOne({userId})

        if (resume) {
            Object.assign(resume,{
                ...resumeData,
                extractedText: resumeText
            } 
        )
        await resume.save()
    }else {
        resume = await Resume.create({
            userId,
            extractedText: resumeText,
            ...resumeData
        })
    }

    await redis.set(`resume:${userId}`, JSON.stringify(resume))

    await fs.unlinkSync(file.path);

    return res.status(200).json({
        success: true,
        message:"Resume analyzed successfully.",
        data: resume
    })

    } catch (error) {

        console.log(error)

        if (file) {
            await fs.unlinkSync(file.path);
        }
        return res.status(500).json({
        success: false,
        message:error.message
    })


    }
}


export const getResume = async (req,res) => {

    try {
    const userId = req.headers["x-user-id"];

    const cache = await redis.get(`resume:${userId}`)

    if (cache) {
        return res.status(200).json({
            success: true,
            source:"redis",
            data: JSON.parse(cache)
        })
    }  

    const resume = await Resume.findOne({userId})
    
    if (!resume) {
        return res.status(404).json({
            success: false,
            message: "resume not found"
        })
    }

    await redis.set(`resume:${userId}`, JSON.stringify(resume));

    return res.status(200).json({
            success: true,
            source:"mongodb",
            data: resume
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
        success: false,
        message:error.message
    })
    }
    
}