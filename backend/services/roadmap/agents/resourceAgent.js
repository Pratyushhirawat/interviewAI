import searchVideo from "../configs/youtube.js";

const resourceAgent = async (state) => {
    const roadmap = state.roadmap;

    roadmap.modules = await Promise.all(
        roadmap.modules.map(async (module) => {
            let video = null;
            try {
                video = await searchVideo(module.title, module.description);
            } catch (error) {
                console.log(error.message);
            }

            return {
                ...module,
                youtube: video?.url || "",
                // article field roadmapAgent se already aa chuka hai — yahan touch nahi karna
            };
        })
    );

    return {
        ...state,
        roadmap,
    };
};

export default resourceAgent;



// import { HumanMessage, SystemMessage } from "@langchain/core/messages";
// import llm from "../configs/llm.js";
// import searchVideo from "../configs/youtube.js";

// const resourceAgent = async (state) => {
//     const roadmap = state.roadmap;

//     let docsMap = new Map();

//     try {
//         const moduleTitles = roadmap.modules.map((module) => module.title).join("\n");

//         const docsResponse = await llm.invoke([
//             new SystemMessage(`...`),
//             new HumanMessage(`modules: ${moduleTitles}`)
//         ]);

//         const docs = JSON.parse(
//             docsResponse.content.replace(/```json/g, "").replace(/```/g, "").trim()
//         );

//         docs.forEach((item) => {
//             docsMap.set(item.title.toLowerCase(), item.article);
//         });
//     } catch (error) {
//         console.log("Docs fetch failed, continuing without docs:", error.message);
//         // docsMap stays empty — that's fine, article will fallback to ""
//     }

//     // Ye ab hamesha chalega, chahe upar wala LLM call fail ho ya na ho
//     roadmap.modules = await Promise.all(
//         roadmap.modules.map(async (module) => {
//             let video = null;
//             try {
//                 video = await searchVideo(module.title);
//             } catch (error) {
//                 console.log(error.message);
//             }

//             return {
//                 ...module,
//                 youtube: video?.url || "",
//                 article: docsMap.get(module.title.toLowerCase()) || "",
//             };
//         })
//     );

//     return {
//         ...state,
//         roadmap,
//     };
// };

// export default resourceAgent;