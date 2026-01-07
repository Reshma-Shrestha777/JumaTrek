import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    maxAltitude: {
        type: String
    },
    bestSeason: {
        type: [String],
        default: []
    },
    groupSize: {
        type: String
    },
    highlights: {
        type: [String],
        default: []
    },
    itinerary: [{
        day: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        maxAltitude: { type: String },
        accommodation: { type: String },
        meals: { type: String }
    }],
    includes: {
        type: [String],
        default: []
    },
    excludes: {
        type: [String],
        default: []
    },
    gallery: {
        type: [String],
        default: []
    },
    discountPrice: {
        type: Number
    },
    singleSupplement: {
        type: Number
    },
    deposit: {
        type: Number
    },
    featured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    groupDiscount: {
        type: Boolean,
        default: false
    },
    privateTrip: {
        type: Boolean,
        default: false
    },
    startPoint: {
        type: String
    },
    endPoint: {
        type: String
    },
    slug: {
        type: String,
        unique: true,
        sparse: true
    },
    seoTitle: {
        type: String
    },
    metaDescription: {
        type: String
    }
}, { timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
