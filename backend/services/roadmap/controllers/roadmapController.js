import redis from "../../../shared/redis/redis.js";
import graph from "../graph/roadmapGraph.js";
import Roadmap from "../models/roadmapModel.js";

export const generateRoadmap = async (req,res) => {
    try {
        const { role, targetPackage, useResume = false, resume} = req.body;

        const userId = req.headers["x-user-id"]

        if(!role || !targetPackage){
            return res.status(400).json({
        success: false, message: "Role and Target Package are required."
    });}


    if (useResume && !resume) {
        return res.status(400).json({
        success: false, message: "Resume data is required."
    });
    }

    const result = await graph.invoke({
        role,
        targetPackage,
        useResume,
        resume
    })

    const sanitizedModules = (result.roadmap.modules || []).map((m) => ({
        ...m,
        youtube: m.youtube || "",
        article: m.article || "",
    }));

    const roadmap = await Roadmap.create({
        userId,
        ...result.roadmap,
        modules: sanitizedModules 
    })

    

    await redis.set(`raodmap:${roadmap._id}`, JSON.stringify(roadmap), "EX", 60*60)

    await redis.del(`userRoadmap:${userId}`)

    return res.status(201).json({
        success: true,
        messaage: "Roadmap generated successfully.",
        data: roadmap,
    })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllRoadmap = async (req,res) => {
    try {
        const userId = req.headers["x-user-id"]
        const cache = await redis.get(`userRoadmap:${userId}`)

        if(cache){
            return res.status(200).json({
                success: true,
                data: JSON.parse(cache),
            })
        }

        const roadmaps = await Roadmap.find({userId}).sort({createdAt: -1 })
        await redis.set(`userRoadmap:${userId}`, JSON.stringify(roadmaps), "EX", 60*60)

        return res.json({
            success: true,
            data: roadmaps,
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getRoadmapById = async (req,res) => {
    try {
        const {id} = req.params;
        const userId = req.headers["x-user-id"];

        const cache = await redis.get(`raodmap:${id}`)
        if(cache){
            return res.json({
                success: true,
                fromCache: true,
                data: JSON.parse(cache)
            })
        }

        const roadmap = await Roadmap.findOne({
            _id:  id,
            userId: userId
        })

        if (!roadmap) {
            return res.status(404).json({
                success: false,
                message: "Roadmap not found"
            });
        }

        await redis.set(`raodmap:${id}`, JSON.stringify(roadmap), "EX", 60*60)

        return res.json({
            success: true,
            fromCache: false,
            data: roadmap
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}