import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        phone: { type: String, default: "" },
        subject: { type: String, required: true },
        message: { type: String, required: true },
        status: {
            type: String,
            enum: ["new", "read", "replied", "archived"],
            default: "new",
        },
        lastReply: {
            text: String,
            sentAt: Date,
            adminEmail: String,
            adminName: String,
        },
    },
    { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", InquirySchema);

export default Inquiry;

