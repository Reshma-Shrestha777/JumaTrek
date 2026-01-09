import CustomTrip from "../model/CustomTripModel.js";
import User from "../model/UserModel.js";
import Listing from "../model/ListingModel.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { sendEmail } from "../utils/emailService.js";

// Helper to get userId from auth header when cookie is missing
const extractUserIdFromHeader = (authorization) => {
    if (!authorization || !authorization.startsWith("Bearer ")) return null;
    const token = authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId;
    } catch (err) {
        return null;
    }
};

export const createCustomTrip = async (req, res) => {
    try {
        console.log("Headers:", req.headers);
        const userId =
            req.userId ||
            extractUserIdFromHeader(req.headers.authorization);

        console.log("Creating custom trip for user:", userId);
        console.log("Trip data:", req.body);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        const payload = { ...req.body, user: userId };

        if (payload.startDate) payload.startDate = new Date(payload.startDate);
        if (payload.endDate) payload.endDate = new Date(payload.endDate);

        const customTrip = await CustomTrip.create(payload);

        return res.status(201).json({
            success: true,
            data: customTrip,
        });
    } catch (error) {
        console.error("Error creating custom trip:", error);

        // Handle Mongoose validation errors specifically
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            console.error("Validation Errors:", messages);
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: messages,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to submit custom trip request",
            error: error.message,
        });
    }
};

export const getMyCustomTrips = async (req, res) => {
    try {
        const userId =
            req.userId ||
            extractUserIdFromHeader(req.headers.authorization);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const trips = await CustomTrip.find({ user: userId }).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            count: trips.length,
            data: trips,
        });
    } catch (error) {
        console.error("Error fetching user custom trips:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch custom trips",
            error: error.message,
        });
    }
};

export const getAllCustomTripsAdmin = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = {};
        if (status && status !== "all") {
            query.status = status;
        }

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        const [trips, total] = await Promise.all([
            CustomTrip.find(query)
                .populate("user", "name email contact")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum),
            CustomTrip.countDocuments(query),
        ]);

        // Resolve destination IDs to trekking titles for admin display
        const enrichedTrips = await Promise.all(trips.map(async (trip) => {
            const tripObj = trip.toObject();
            if (mongoose.Types.ObjectId.isValid(trip.destination)) {
                const trek = await Listing.findById(trip.destination).select('title');
                if (trek) {
                    tripObj.destinationName = trek.title;
                }
            }
            return tripObj;
        }));

        return res.status(200).json({
            success: true,
            data: enrichedTrips,
            total,
            page: pageNum,
            pages: Math.ceil(total / limitNum) || 1,
        });
    } catch (error) {
        console.error("Error fetching custom trips (admin):", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch custom trip requests",
            error: error.message,
        });
    }
};

export const getCustomTripByIdAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const trip = await CustomTrip.findById(id).populate(
            "user",
            "name email contact"
        );

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Custom trip request not found",
            });
        }

        const tripObj = trip.toObject();
        if (mongoose.Types.ObjectId.isValid(trip.destination)) {
            const trek = await Listing.findById(trip.destination).select('title');
            if (trek) {
                tripObj.destinationName = trek.title;
            }
        }

        return res.status(200).json({
            success: true,
            data: tripObj,
        });
    } catch (error) {
        console.error("Error fetching custom trip (admin):", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch custom trip request",
            error: error.message,
        });
    }
};

export const updateCustomTripStatusAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminNotes } = req.body;

        const validStatuses = ["pending", "reviewed", "replied", "confirmed", "archived"];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value",
            });
        }

        const trip = await CustomTrip.findById(id);
        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Custom trip request not found",
            });
        }

        if (status) {
            trip.status = status;
        }
        if (adminNotes !== undefined) {
            trip.adminNotes = adminNotes;
        }

        await trip.save();

        return res.status(200).json({
            success: true,
            message: "Custom trip updated",
            data: trip,
        });
    } catch (error) {
        console.error("Error updating custom trip (admin):", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update custom trip request",
            error: error.message,
        });
    }
};

export const deleteCustomTripAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const trip = await CustomTrip.findByIdAndDelete(id);
        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Custom trip request not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Custom trip request deleted",
        });
    } catch (error) {
        console.error("Error deleting custom trip (admin):", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete custom trip request",
            error: error.message,
        });
    }
};

export const replyToCustomTripAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { replyMessage } = req.body;

        if (!replyMessage || replyMessage.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Reply message is required",
            });
        }

        const trip = await CustomTrip.findById(id).populate("user", "name email");
        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Custom trip request not found",
            });
        }

        const userEmail = trip.contactInfo?.email || (trip.user?.email);
        const userName = trip.contactInfo?.name || (trip.user?.name) || "Valued Adventurer";

        if (!userEmail) {
            return res.status(400).json({
                success: false,
                message: "User email not found for this request",
            });
        }

        const emailSubject = `Update on your Custom Trip Request: ${trip.destination}`;
        const emailBody = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <div style="background-color: #1a73e8; color: white; padding: 10px; text-align: center; border-radius: 5px 5px 0 0;">
                    <h2 style="margin: 0;">JumaTrek Custom Trip Support</h2>
                </div>
                <div style="padding: 20px;">
                    <p>Dear ${userName},</p>
                    <p>Thank you for your interest in a custom trekking adventure with JumaTrek. We have reviewed your request for <strong>${trip.destination}</strong> and have the following update for you:</p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #1a73e8;">
                        <p style="margin: 0; white-space: pre-wrap;">${replyMessage}</p>
                    </div>
                    <p>If you have any further questions or would like to discuss this further, please don't hesitate to reply to this email.</p>
                    <p>Best regards,<br/><strong>The JumaTrek Adventure Planning Team</strong></p>
                </div>
                <div style="text-align: center; font-size: 12px; color: #777; margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">
                    <p>&copy; ${new Date().getFullYear()} JumaTrek. All rights reserved.</p>
                </div>
            </div>
        `;

        await sendEmail(userEmail, emailSubject, emailBody);

        trip.status = "replied";
        trip.lastReply = {
            text: replyMessage,
            sentAt: new Date(),
            adminEmail: req.user?.email || "admin@juma-trek.com",
            adminName: req.user?.name || "Admin",
        };
        await trip.save();

        return res.status(200).json({
            success: true,
            message: "Reply sent successfully",
            data: trip,
        });
    } catch (error) {
        console.error("Error replying to custom trip (admin):", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send reply",
            error: error.message,
        });
    }
};

export const getTrekInfoByDestination = async (req, res) => {
    try {
        const { destination } = req.params;

        // Map destination values to trek titles (for legacy/static support)
        const destinationMap = {
            'everest_base_camp': 'Everest Base Camp',
            'annapurna_circuit': 'Annapurna Circuit',
            'langtang_valley': 'Langtang Valley',
            'manaslu_circuit': 'Manaslu Circuit',
            'upper_mustang': 'Upper Mustang',
            'annapurna_base_camp': 'Annapurna Base Camp',
            'ghorepani_poonhill': 'Ghorepani Poon Hill',
            'kanchenjunga': 'Kanchenjunga Base Camp',
            'makalu_base_camp': 'Makalu Base Camp',
            'rolwaling_valley': 'Rolwaling Valley'
        };

        // Try to get title from map, otherwise use the destination parameter as the title directly
        const trekTitle = destinationMap[destination] || destination;

        if (!trekTitle) {
            return res.status(404).json({
                success: false,
                message: "Trek destination not found",
            });
        }

        // Find the trek in the Listing collection (using case-insensitive regex for flexibility)
        const trek = await Listing.findOne({
            title: { $regex: new RegExp(`^${trekTitle.replace(/[-_]/g, ' ')}$`, 'i') }
        }) || await Listing.findOne({ title: trekTitle });

        if (!trek) {
            return res.status(404).json({
                success: false,
                message: "Trek information not available in our database",
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                title: trek.title,
                description: trek.description,
                duration: trek.duration,
                difficulty: trek.difficulty,
                maxAltitude: trek.maxAltitude,
                bestSeason: trek.bestSeason,
                groupSize: trek.groupSize,
                highlights: trek.highlights,
                itinerary: trek.itinerary,
                gallery: trek.gallery,
                includes: trek.includes,
                excludes: trek.excludes
            }
        });
    } catch (error) {
        console.error("Error fetching trek info:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch trek information",
            error: error.message,
        });
    }
};
