import express from 'express'
import { generateRoadmap, getAllRoadmap, getRoadmapById } from '../controllers/roadmapController.js'

const roadmapRouter = express.Router()

roadmapRouter.post("/generate", generateRoadmap)
roadmapRouter.get("/all", getAllRoadmap)
roadmapRouter.get("/:id", getRoadmapById)

export default roadmapRouter