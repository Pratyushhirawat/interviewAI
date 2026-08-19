import React from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

function Input({label, value, onChange, placeholder, type= "text"}) {
    return (
        <div className='flex flex-col gap-1'>
            <label className="text-[10px] font-semibold text-black/70 uppercase tracking-wider">
                {label}
            </label>
            <input type={type}
            placeholder={placeholder}
            onChange={(e)=>onChange(e.target.value)}
            value={value}
            className='bg-white border-2 border-black/25 text-[#0A0A0A] text-xs rounded-lg px-2.5 py-2 outline-none focus:border-black/60 transition-colors placeholder-black/30 shadow-[0_2px_8px_rgba(0,0,0,0.04)]' />
        </div>
    )
}

function TextArea({label, value, onChange, placeholder, rows = 3}){
    return (
        <div className='flex flex-col gap-1'>
            <label className="text-[10px] font-semibold text-black/70 uppercase tracking-wider">
                {label}
            </label>
            <textarea
            placeholder={placeholder}
            onChange={(e)=>onChange(e.target.value)}
            value={value}
            rows={rows}
            className='bg-white border-2 border-black/25 text-[#0A0A0A] text-xs rounded-lg px-2.5 py-2 outline-none focus:border-black/60 transition-colors resize-none placeholder-black/30 shadow-[0_2px_8px_rgba(0,0,0,0.04)]' />
        </div>
    )
}

function EntryCard({children, onRemove }){
    return (
        <div className='relative overflow-hidden bg-[#F8F9FA] border-2 border-black/15 rounded-xl p-3 shadow-[0_2px_10px_rgba(0,0,0,0.05)]'>
            <button onClick={onRemove} className='absolute top-2.5 right-2.5 z-10 text-black/35 hover:text-red-500 transition-colors cursor-pointer'>
            <FiTrash2 size={13} />
            </button>
            <div className='relative flex flex-col gap-2.5 pr-6'>{children}</div>
        </div>
    )
}

function ResumeForm({step, data, setData}) {
  if (step === 1) {
    return (
        <div className='flex flex-col gap-3'>

            <Input label="Full Name" placeholder="Enter your name" onChange={(v)=>setData( {...data, name:v} )} value={data.name} />

            <Input label="Email" placeholder="Enter your email" onChange={(v)=>setData( {...data, email:v} )} value={data.email} />

            <Input label="Phone" placeholder="9876541230" onChange={(v)=>setData( {...data, phone:v} )} value={data.phone} />

            <Input label="Location" placeholder="Delhi, IN" onChange={(v)=>setData( {...data, location:v} )} value={data.location} />

            <Input label="LinedIn URL" placeholder="Enter Here" onChange={(v)=>setData( {...data, linkedin:v} )} value={data.linkedIn} />

            <Input label="Github URL" placeholder="Enter Here" onChange={(v)=>setData( {...data, github:v} )} value={data.github} />

        </div>
    )
  }

  if (step === 2) {
    return (
        <div className='flex flex-col gap-3'>
            <TextArea
            label="Professional Summary"
            placeholder="Backend Developer with 2+ years of experience building scalable Python & AI/ML applications..."
            rows={4}
            onChange={(v)=>setData({...data, summary: v} )}
            value={data.summary} />

            <p className='text-[10px] text-black/40'>Leave Empty to skip this section.</p>
        </div>
    )
  }


  if (step === 3) {
    return (
        <div className='flex flex-col gap-3'>
            <TextArea
            label="Skills"
            placeholder="Python, Java, AI, ML, Deeplearning, Agentic AI"
            rows={4}
            onChange={(v)=>setData({...data, skills: v} )}
            value={data.skills} />

            <p className='text-[10px] text-black/40'>Seperate each skill with a comma.</p>
        </div>
    )
  }

  if (step === 4) {
    const addExperience = () => {
        setData({
            ...data, experience:[...data.experience, { company: "", role: "", duration: "", description: "" } ]
        })
    }

    const removeExperience = (index) => {
        setData({
            ...data, experience: data.experience.filter((_,i) =>i!== index)
        })
    }

    const updateExperience = (index, field, value) => {
        const updated = data.experience.map((exp,i) => i === index ? {...exp, [field]: value } : exp);

        setData({...data, experience: updated });
    }
    return (
        <div className='flex flex-col gap-3'>
            {data.experience.length === 0 &&
             <p className='text-xs text-black/40 text-center py-3'>
                No experience added yet. Click below to add.    
            </p>}

            {data.experience.map((exp,index) => (
                <EntryCard key={index} onRemove={()=>removeExperience(index)}>
                    <Input label="Company" placeholder="XYZ Technologoes" onChange={(v)=>updateExperience(index,"company",v)} value={exp.company} />

                    <Input label="Role" placeholder="ML Engineer" onChange={(v)=>updateExperience(index,"role",v)} value={exp.role} />

                    <Input label="Duration" placeholder="Jan 2023 - Dec 2024" onChange={(v)=>updateExperience(index,"duration",v)} value={exp.duration} />

                    <TextArea label="Description" placeholder="-> Build REST APIs -> Build LLM Models." onChange={(v)=>updateExperience(index,"description",v)} value={exp.description} />

                </EntryCard>
            ))}

            <button onClick={addExperience} className='flex items-center justify-center gap-1.5 w-full py-2.5 border border-dashed border-black/20 rounded-xl text-xs text-black/45 hover:border-black/40 cursor-pointer hover:text-[#0A0A0A] transition-all'>
            <FiPlus size={13} />Add Experience
            </button>
        </div>
    )
  }

  if (step === 5) {
    const addProject = () => {
        setData({
            ...data, projects:[...data.projects, { name: "", techStack: "", github: "", description: "" } ]
        })
    }

    const removeProject= (index) => {
        setData({
            ...data, projects: data.projects.filter((_,i) =>i!== index)
        })
    }

    const updateProject = (index, field, value) => {
        const updated = data.projects.map((pro,i) => i === index ? {...pro, [field]: value } : pro);

        setData({...data, projects: updated });
    }
    return (
        <div className='flex flex-col gap-3'>
            {data.projects.length === 0 &&
             <p className='text-xs text-black/40 text-center py-3'>
                No Projects added yet. Click below to add.    
            </p>}

            {data.projects.map((pro,index) => (
                <EntryCard key={index} onRemove={()=>removeProject(index)}>
                    <Input label="Project Name" placeholder="InterviewAI" onChange={(v)=>updateProject(index,"name",v)} value={pro.name} />

                    <Input label="Tech Stack"  placeholder="React Node.js MongoDB" onChange={(v)=>updateProject(index,"techStack",v)} value={pro.techStack} />

                    <Input label="Github Link" placeholder="github.com/xyz/projects" onChange={(v)=>updateProject(index,"github",v)} value={pro.github} />

                    <TextArea label="Description" placeholder="AI powered interview preperation platform with mock interview and resume builder." onChange={(v)=>updateProject(index,"description",v)} value={pro.description} />

                </EntryCard>
            ))}

            <button onClick={addProject} className='flex items-center justify-center gap-1.5 w-full py-2.5 border border-dashed border-black/20 cursor-pointer rounded-xl text-xs text-black/45 hover:border-black/40 hover:text-[#0A0A0A] transition-all'>
            <FiPlus size={13} />Add Projects
            </button>
        </div>
    )
  }

  if (step === 6) {
    const addEducation = () => {
        setData({
            ...data, education :[...data.education, { college: "", degree: "", branch: "", cgpa: "", year: "" } ]
        })
    }

    const removeEducation = (index) => {
        setData({
            ...data, education: data.education.filter((_,i) => i!== index)
        })
    }

    const updateEducation = (index, field, value) => {
        const updated = data.education.map((edu,i) => i === index ? {...edu, [field]: value } : edu);

        setData({...data, education: updated });
    }
    return (
        <div className='flex flex-col gap-3'>
            {data.projects.length === 0 &&
             <p className='text-xs text-black/40 text-center py-3'>
                No education added yet. Click below to add.    
            </p>}

            {data.education.map((edu,index) => (
                <EntryCard key={index} onRemove={()=>removeEducation(index)}>
                    <Input label="College / University" placeholder="JagganNath Institute of Management Studies (JIMS)" onChange={(v)=>updateEducation(index,"college",v)} value={edu.college} />

                    <Input label="Degree"  placeholder="B.C.A" onChange={(v)=>updateEducation(index,"degree",v)} value={edu.degree} />

                    <Input label="Branch" placeholder="Data Science" onChange={(v)=>updateEducation(index,"branch",v)} value={edu.branch} />

                    <Input label="CGPA" placeholder="8.5" onChange={(v)=>updateEducation(index,"cgpa",v)} value={edu.cgpa} />

                    <Input label="Year" placeholder="2022-2025" onChange={(v)=>updateEducation(index,"year",v)} value={edu.year} />

                </EntryCard>
            ))}

            <button onClick={addEducation} className='flex items-center justify-center gap-1.5 w-full py-2.5 border border-dashed border-black/20 cursor-pointer rounded-xl text-xs text-black/45 hover:border-black/40 hover:text-[#0A0A0A] transition-all'>
            <FiPlus size={13} />Add Education
            </button>
        </div>
    )
  }
}

export default ResumeForm