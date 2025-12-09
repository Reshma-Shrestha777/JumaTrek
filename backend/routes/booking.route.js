import express from "express";
import { createBooking } from "../controllers/booking.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);

export default bookingRouter;
