import { verifyToken } from '../services/auth.services.js'
import User from '../models/user.model.js'

const checkToken = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) return res.render('login',
        {
            toastMessage: "Please Login!"
        }
    );
    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);
        if (!user) return res.render('login',
            {
                toastMessage: "Session Expired, Please Login!"
            }
        );
        req.user = user;
        return next();

    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.render("login", {
                toastMessage: "Session expired. Please login again."
            });
        }

        else if (e instanceof jwt.JsonWebTokenError) {
            return res.render("login", {
                toastMessage: "Invalid token. Please login again."
            });
        }
        return res.render('login', {
            toastMessage: "Something went wrong!, Please Login again."
        });
    }

}

export default checkToken;