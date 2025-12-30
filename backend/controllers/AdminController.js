import User from "../model/UserModel.js";
import Booking from "../model/BookingModel.js";
import Listing from "../model/ListingModel.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password").sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({})
            .populate("user", "name email contact")
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings",
            error: error.message
        });
    }
};

export const updateBookingStatusAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate("user", "name email contact");

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        res.status(200).json({
            success: true,
            message: "Booking status updated",
            booking
        });
    } catch (error) {
        console.error("Error updating booking status:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update booking status",
            error: error.message
        });
    }
};

export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: "User" });
        const totalAdmins = await User.countDocuments({ role: "Admin" });
        const totalListings = await Listing.countDocuments({});
        const totalBookings = await Booking.countDocuments({});
        const pendingBookings = await Booking.countDocuments({ status: "pending" });
        const confirmedBookings = await Booking.countDocuments({ status: "confirmed" });

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalAdmins,
                totalListings,
                totalBookings,
                pendingBookings,
                confirmedBookings
            }
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard stats",
            error: error.message
        });
    }
};

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Admin doesn't exist!" });
        }
        if (user.role !== "Admin") {
            return res.status(403).json({ message: "Access denied. Not an admin." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Sorry! Incorrect Password. Please Try Again" });
        }
        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(500).json({ message: `Admin login error: ${error.message}` });
    }
};