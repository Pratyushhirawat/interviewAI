import { feebackAgent } from "../agents/feedbackAgent.js";
import { InterviewAgent } from "../agents/interviewAgent.js";
import { summaryAgent } from "../agents/summaryAgent.js";

export async function interviewNode(state) {
    const questions = await InterviewAgent({
        role:state.role,
        type:state.type,
        useResume:state.useResume,
        resume:state.resume
    })

    return {
        questions
    }
}

export async function feedbackNode(state) {
    const feedback  = await feebackAgent({
        question: state.question,

        answer: state.answer,

        difficulty: state.difficulty
    })

    return {
        feedback
    }
}

export async function summaryNode(state) {
    const report  = await summaryAgent({
        role: state.role,
        type:state.type,
        questions:state.questions
    })

    return {
        report
    }
}