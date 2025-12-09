import Booking from "../model/booking.model.js";

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        // Log the incoming data for debugging
        console.log("Received booking data:", req.body);

        // Destructure to handle the 'trek' -> 'trekName' mapping manually if needed,
        // or just pass the whole body if the frontend sends the right keys.
        // Frontend sends 'trek' but model expects 'trekName'.
        const { trek, ...otherData } = req.body;

        const newBooking = new Booking({
            ...otherData,
            trekName: trek // Map frontend 'trek' to backend 'trekName'
        });

        const savedBooking = await newBooking.save();

        res.status(201).json({
            success: true,
            message: "Booking request submitted successfully!",
            booking: savedBooking
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create booking. Please try again.",
            error: error.message
        });
    }
};
