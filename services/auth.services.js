import jwt from "jsonwebtoken";

const generateToken = (user) => {
    const payload = {
        user: user._id,
        email: user.email,
        role: user.role
    }

    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "5h"});
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
}

export {
    generateToken,
    verifyToken
}