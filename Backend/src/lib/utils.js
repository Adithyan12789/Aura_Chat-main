import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { 
        expiresIn: "30d" 
    });

    // Set cookie (for same-origin and supporting browsers)
    res.cookie("jwt", token, { 
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true, // Prevent XSS attacks
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" required for cross-origin cookies in production
        secure: process.env.NODE_ENV !== "development" // HTTPS only in production (required with sameSite: "none")
    });

    // Also return token in response body for localStorage fallback
    return token;
}
