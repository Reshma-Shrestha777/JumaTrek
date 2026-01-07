import express from "express";
import { createCustomTrip, getMyCustomTrips } from "../controllers/CustomTripController.js";
import isAuth from "../middleware/isAuth.js";

const customTripRouter = express.Router();

customTripRouter.post("/", isAuth, createCustomTrip);
customTripRouter.get("/my", isAuth, getMyCustomTrips);

export default customTripRouter;
