import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        // Check if the Authorization header is present
        if (!req.headers.authorization) {
            console.error("Authorization header missing");
            return res.status(401).json("Authorization header missing");
        }

        // Extract token from the Authorization header (e.g., "Bearer <token>")
        const token = req.headers.authorization.split(" ")[1];

        // Check if the token exists
        if (!token) {
            console.error("Token missing in Authorization header");
            return res.status(401).json("Token missing in Authorization header");
        }

        // Verify the token using JWT secret
        let decodedData = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the userId from the decoded token to the request object
        req.userId = decodedData?.id;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // Handle token verification failure
        console.error("Token verification failed:", error.message);
        res.status(401).json("Invalid or expired token");
    }
};

export default auth;
