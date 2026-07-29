import User from '../models/user.model.js';
import { generateToken } from '../services/auth.services.js';

const registerView = (req, res) => {
    return res.render("register");
}

const loginView = (req, res) => {
    return res.render("login");
}

const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.render("register", {
                toastMessage: "Email is already registered."
            });
        }

        // Create user
        const user = new User({
            fullName,
            email,
            password
        });

        await user.save();

        // Generate token
        const token = generateToken(user);

        // Set cookie and redirect
        return res
            .cookie("token", token)
            .redirect("/");

    } catch (error) {
        console.error(error);

        return res.status(500).render("register", {
            toastMessage: "Something went wrong. Please try again."
        });
    }
};

const login =async (req, res) => {
    const {email, password} = req.body;
    try{
        const token = await User.matchPassword(email, password);
        return res.cookie("token", token).redirect('/');   
    } catch(error) {
            return res.render('login', {error: error.message});
    }

}

const logout = async (req, res) => {
    return res.clearCookie('token').redirect('/user/login');
}

export {
    registerView,
    loginView,
    register,
    login,
    logout
}