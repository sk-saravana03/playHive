"use strict";
import multer from "multer";
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null,
            new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
        );
    },
});
const filefilter = (req,file, cb) => {
    if (file.mimetype.startsWith("video/")) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({ storage: storage, fileFilter: filefilter });
export default upload