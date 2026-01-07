import Listing from "../model/ListingModel.js";


export const createListing = async (req, res) => {
    try {
        const listingData = { ...req.body };

        // Parse itinerary if it's a string (from FormData)
        if (listingData.itinerary && typeof listingData.itinerary === 'string') {
            try {
                listingData.itinerary = JSON.parse(listingData.itinerary);
            } catch (parseError) {
                console.error("Error parsing itinerary:", parseError);
                return res.status(400).json({
                    success: false,
                    message: "Invalid itinerary format",
                    error: "Itinerary must be a valid JSON array"
                });
            }
        }

        // Handle array fields that might come as strings or need to be arrays
        // bestSeason, highlights, includes, excludes
        const arrayFields = ['bestSeason', 'highlights', 'includes', 'excludes'];
        arrayFields.forEach(field => {
            if (listingData[field]) {
                // If it's already an array, keep it
                if (Array.isArray(listingData[field])) {
                    return;
                }
                // If it's a string, try to parse it
                if (typeof listingData[field] === 'string') {
                    try {
                        listingData[field] = JSON.parse(listingData[field]);
                    } catch (e) {
                        // If parsing fails, treat as single value and convert to array
                        listingData[field] = [listingData[field]];
                    }
                }
            }
        });

        // Handle numeric fields
        if (listingData.price) listingData.price = Number(listingData.price);
        if (listingData.duration) listingData.duration = Number(listingData.duration);
        if (listingData.groupSize) listingData.groupSize = String(listingData.groupSize);
        if (listingData.maxAltitude) listingData.maxAltitude = String(listingData.maxAltitude);

        // Handle images - first image is featured, rest go to gallery
        if (req.files && req.files.length > 0) {
            const imagePaths = req.files.map(file => file.path);
            // First image can be considered featured, all go to gallery
            listingData.gallery = imagePaths;
        }

        // Ensure itinerary is an array
        if (!Array.isArray(listingData.itinerary)) {
            listingData.itinerary = [];
        }

        // Clean up itinerary items - ensure proper types
        if (listingData.itinerary && listingData.itinerary.length > 0) {
            listingData.itinerary = listingData.itinerary.map(item => ({
                day: Number(item.day) || 1,
                title: String(item.title || ''),
                description: String(item.description || ''),
                maxAltitude: item.maxAltitude ? String(item.maxAltitude) : '',
                accommodation: item.accommodation ? String(item.accommodation) : '',
                meals: item.meals ? String(item.meals) : ''
            }));
        }

        const newListing = new Listing(listingData);
        const savedListing = await newListing.save();
        res.status(201).json({
            success: true,
            data: savedListing
        });
    } catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create listing",
            error: error.message
        });
    }
};

export const updateListing = async (req, res) => {
    try {
        const listingId = req.params.id;
        const updateData = req.body;

        
        delete updateData._id;
        delete updateData.createdAt;
        delete updateData.updatedAt;

        
        const updateOperations = {};

        
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => file.path);
            updateOperations.$push = { gallery: { $each: newImages } };
        }

        
        const setFields = { ...updateData };
        if (Object.keys(setFields).length > 0) {
            updateOperations.$set = setFields;
        }

        const updatedListing = await Listing.findByIdAndUpdate(
            listingId,
            updateOperations,
            { 
                new: true, 
                runValidators: true 
            }
        );

        if (!updatedListing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Listing updated successfully",
            data: updatedListing
        });
    } catch (error) {
        console.error("Error updating listing:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update listing",
            error: error.message
        });
    }
};

export const getAllListings = async (req, res) => {
    try {
        // Extract query parameters
        const {
            region,
            difficulty,
            duration,
            minPrice,
            maxPrice,
            page = 1,
            limit = 10,
            sort = '-createdAt'
        } = req.query;

        // Build filter object dynamically
        const filter = {};

        // Region filter (ignore "All Regions" or empty)
        if (region && region !== 'All Regions' && region.trim() !== '') {
            filter.region = region;
        }

        // Difficulty filter (ignore "All Levels" or empty)
        if (difficulty && difficulty !== 'All Levels' && difficulty.trim() !== '') {
            filter.difficulty = difficulty;
        }

        // Duration filter (ignore "Any Duration" or empty)
        if (duration && duration !== 'Any Duration' && duration.trim() !== '') {
            filter.duration = parseInt(duration);
        }

        // Price range filter
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) {
                filter.price.$gte = parseFloat(minPrice);
            }
            if (maxPrice) {
                filter.price.$lte = parseFloat(maxPrice);
            }
        }

        // Pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Sorting options
        let sortOptions = {};
        switch (sort) {
            case 'price-asc':
                sortOptions = { price: 1 };
                break;
            case 'price-desc':
                sortOptions = { price: -1 };
                break;
            case 'duration-asc':
                sortOptions = { duration: 1 };
                break;
            case 'duration-desc':
                sortOptions = { duration: -1 };
                break;
            case 'title-asc':
                sortOptions = { title: 1 };
                break;
            case 'title-desc':
                sortOptions = { title: -1 };
                break;
            default:
                sortOptions = { createdAt: -1 }; // Newest first by default
        }

        // Execute query with filters, pagination, and sorting
        const listings = await Listing.find(filter)
            .sort(sortOptions)
            .limit(limitNum)
            .skip(skip);

        // Get total count for pagination metadata
        const total = await Listing.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: listings.length,
            total: total,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
            data: listings
        });
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch listings",
            error: error.message
        });
    }
};
        

export const getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({
                success: false,
                message: "Trek not found"
            });
        }
        res.status(200).json({
            success: true,
            data: listing
        });
    } catch (error) {
        console.error("Error fetching listing:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch listing",
            error: error.message
        });
    }
};

export const updateListingGallery = async (req, res) => {
    try {
        const listingId = req.params.id;

        const newImages = req.files.map(file => file.path);

        const updatedListing = await Listing.findByIdAndUpdate(
            listingId,
            {
                $push: { gallery: { $each: newImages } }
            },
            { new: true }
        );

        if (!updatedListing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Gallery updated successfully",
            data: updatedListing
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update gallery",
            error: error.message
        });
    }
};


export const deleteListing = async (req, res) => {
    try {
        const listingId = req.params.id;

        const deletedListing = await Listing.findByIdAndDelete(listingId);

        if (!deletedListing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Listing deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting listing:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete listing",
            error: error.message
        });
    }
};