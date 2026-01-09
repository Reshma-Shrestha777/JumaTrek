import mongoose from "mongoose";

const { Schema } = mongoose;

const EmergencyContactSchema = new Schema(
    {
        name: String,
        relationship: String,
        phone: String,
        email: String,
    },
    { _id: false }
);

const ContactInfoSchema = new Schema(
    {
        name: String,
        email: String,
        phone: String,
        country: String,
        emergencyContact: EmergencyContactSchema,
    },
    { _id: false }
);

const ItineraryItemSchema = new Schema(
    {
        day: Number,
        title: String,
        description: String,
        maxAltitude: String,
        accommodation: String,
        meals: String,
    },
    { _id: false }
);

const CustomTripSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        destination: { type: String, required: true },
        customDestination: String,
        startDate: Date,
        endDate: Date,
        duration: Number,
        groupSize: Number,
        groupType: String,
        ageRange: {
            min: Number,
            max: Number,
        },
        difficulty: String,
        experienceLevel: String,
        fitnessLevel: String,
        accommodation: String,
        mealPreferences: [String],
        dietaryRestrictions: String,
        guideRequired: Boolean,
        porterRequired: Boolean,
        transportation: [String],
        insuranceRequired: Boolean,
        equipmentRental: Boolean,
        budgetRange: String,
        budgetAmount: Number,
        specialRequests: String,
        contactInfo: ContactInfoSchema,
        itinerary: [ItineraryItemSchema],
        gearRecommendations: [String],
        costBreakdown: Schema.Types.Mixed,
        safetyNotes: [String],
        termsAgreed: Boolean,
        status: {
            type: String,
            enum: ["pending", "reviewed", "replied", "confirmed", "archived"],
            default: "pending",
        },
        adminNotes: String,
        lastReply: {
            text: String,
            sentAt: Date,
            adminEmail: String,
            adminName: String,
        },
    },
    { timestamps: true }
);

const CustomTrip = mongoose.model("CustomTrip", CustomTripSchema);

export default CustomTrip;
