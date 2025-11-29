import express from "express";
import {
    getMessages,
    generateResponse,
    generateStreamResponse,
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/messages", getMessages);
router.post("/generate", generateResponse);
router.post("/stream", generateStreamResponse);

export default router;
