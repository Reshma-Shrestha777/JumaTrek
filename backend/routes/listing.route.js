import express from "express";
import { createListing, getAllListings, getListingById } from "../controllers/listing.controller.js";

const listingRouter = express.Router();

listingRouter.post("/", createListing); // Protected route in future
listingRouter.get("/", getAllListings);
listingRouter.get("/:id", getListingById);

export default listingRouter;
