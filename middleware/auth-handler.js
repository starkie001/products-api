import { ApiError } from "../errors/api-error.js";

export function checkApiKey(req, res, next) {
    const apiKey = req.headers['authorization']; // Expect: "ApiKey your-demo-key"
    const EXPECTED_KEY = process.env.API_KEY;

    if (!apiKey || apiKey !== `ApiKey ${EXPECTED_KEY}`) {
        //return res.status(401).json({ message: 'Unauthorized: Invalid or missing API key' });
        throw new ApiError(401, "Unauthorized: Invalid or missing API key");
    }

    next();
}