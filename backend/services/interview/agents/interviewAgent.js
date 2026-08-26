import llm from "../config/llm.js"
import hrInterviewPrompt from "../prompts/hrInterviewPrompt.js"
import technicalInterviewPrompt from "../prompts/technicalInterviewPrompt.js"

export const InterviewAgent = async (data) => {
    let response;
    try {
        const prompt = data.type?.toLowerCase() === "hr" ? hrInterviewPrompt(data) : technicalInterviewPrompt(data)

         response = await llm.invoke(prompt)

        const cleaned = response.content
        .replace(/```json/g,"")
        .replace(/```/g,"")
        .trim()

        return JSON.parse(cleaned)
    } catch (error) {
         console.log("=== Interview Agent Parse Error ===");
        console.log("Error message:", error.message);
        console.log("Full error object:", error);
        console.log("Raw response:", response);
        throw new Error("Failed to generate interview questions.");
    }
}