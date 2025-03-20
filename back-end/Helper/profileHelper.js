import multer from "multer";

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // Destination folder for uploads
    },
    filename: (req, file, cb) => {
        cb(
            null,
            new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
        ); // Rename file to avoid conflicts
    },
});

// File filter to allow only specific image formats
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true); // Accept file
    } else {
        cb(new Error("Unsupported file format! Only JPEG, PNG, and JPG are allowed."), false);
    }
};

// Set up multer with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
});

export default upload;
