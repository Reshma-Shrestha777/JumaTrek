import express from 'express';
import isAdmin from '../middleware/isAdmin.js';
import { deleteUser, getAllBookings, getAllUsers, getDashboardStats, updateBookingStatusAdmin, adminLogin } from '../controllers/AdminController.js';

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/dashboard", isAdmin, getDashboardStats);

adminRouter.get("/users", isAdmin, getAllUsers);
adminRouter.delete("/users/:id", isAdmin, deleteUser);

adminRouter.get("/bookings", isAdmin, getAllBookings);
adminRouter.patch("/bookings/:id/status", isAdmin, updateBookingStatusAdmin);

export default adminRouter;