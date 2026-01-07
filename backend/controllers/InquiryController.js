import Inquiry from "../model/InquiryModel.js";
import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/emailService.js";

const extractUserId = (req) => {
    try {
        if (req.userId) return req.userId;
        let token = req.cookies?.token;
        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) return null;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded?.userId;
    } catch (e) {
        return null;
    }
};

export const createInquiry = async (req, res) => {
    try {
        let { name, email, phone, subject, message } = req.body;

        // If user is authenticated, pull profile details to auto-fill
        const userId = extractUserId(req);
        if (userId) {
            const user = await User.findById(userId);
            if (user) {
                name = name || user.name;
                email = email || user.email;
                phone = phone || user.contact || "";
            }
        }

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email, subject and message are required",
            });
        }

        const inquiry = await Inquiry.create({
            user: userId || undefined,
            name,
            email,
            phone,
            subject,
            message,
        });

        return res.status(201).json({
            success: true,
            data: inquiry,
            message: "Inquiry submitted successfully",
        });
    } catch (error) {
        console.error("Error creating inquiry:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to submit inquiry",
            error: error.message,
        });
    }
};

export const getAllInquiries = async (req, res) => {
    try {
        const { status, search } = req.query;
        const filter = {};

        if (status && status !== "all") {
            filter.status = status;
        }
        if (search && search.trim() !== "") {
            const regex = new RegExp(search.trim(), "i");
            filter.$or = [
                { name: regex },
                { email: regex },
                { subject: regex },
                { message: regex },
            ];
        }

        const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: inquiries.length,
            data: inquiries,
        });
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch inquiries",
            error: error.message,
        });
    }
};

export const getInquiryById = async (req, res) => {
    try {
        const { id } = req.params;
        const inquiry = await Inquiry.findById(id);
        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: inquiry,
        });
    } catch (error) {
        console.error("Error fetching inquiry:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch inquiry",
            error: error.message,
        });
    }
};

export const updateInquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ["new", "read", "replied", "archived"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value",
            });
        }

        const inquiry = await Inquiry.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: inquiry,
        });
    } catch (error) {
        console.error("Error updating inquiry status:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update inquiry status",
            error: error.message,
        });
    }
};

export const replyToInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const { replyMessage } = req.body;
        if (!replyMessage || replyMessage.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Reply message is required",
            });
        }

        const inquiry = await Inquiry.findById(id);
        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found",
            });
        }

        const emailSubject = `Re: ${inquiry.subject}`;
        const emailBody = `
            <p>Hi ${inquiry.name},</p>
            <p>${replyMessage}</p>
            <p>Best regards,<br/>${process.env.APP_NAME || "JumaTrek"} Support</p>
        `;

        await sendEmail(inquiry.email, emailSubject, emailBody);

        inquiry.status = "replied";
        inquiry.lastReply = {
            text: replyMessage,
            sentAt: new Date(),
            adminEmail: req.user?.email,
            adminName: req.user?.name,
        };
        await inquiry.save();

        return res.status(200).json({
            success: true,
            message: "Reply sent",
            data: inquiry,
        });
    } catch (error) {
        console.error("Error replying to inquiry:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send reply",
            error: error.message,
        });
    }
};

export const deleteInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const inquiry = await Inquiry.findByIdAndDelete(id);
        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Inquiry deleted",
        });
    } catch (error) {
        console.error("Error deleting inquiry:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete inquiry",
            error: error.message,
        });
    }
};

