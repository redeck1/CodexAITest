import express from "express";
import {
    getMessages,
    generateResponse,
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/messages", getMessages);
router.post("/generate", generateResponse);

export default router;
