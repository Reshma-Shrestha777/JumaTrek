import express from "express";
import { createInquiry } from "../controllers/InquiryController.js";

const inquiryRouter = express.Router();

// Public contact form submission
inquiryRouter.post("/", createInquiry);

export default inquiryRouter;

