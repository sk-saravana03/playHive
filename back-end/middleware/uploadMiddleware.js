import multer from "multer";
import upload from "../Helper/profileHelper.js"; // Import the upload configuration

const uploadMiddleware = (req, res, next) => {
    upload.single("channelProfile")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Handle Multer-specific errors (e.g., file too large)
            return res.status(400).json({ message: err.message });
        } else if (err) {
            // Handle unknown errors
            return res.status(400).json({ message: err.message });
        }
        next(); // Proceed to the next middleware or controller
    });
};

export default uploadMiddleware;
