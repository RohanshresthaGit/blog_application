import User from '../models/user.model.js';

const registerView = (req, res) => {
    return res.render("register");
}

const loginView = (req, res) => {
    return res.render("login");
}

const register =async (req, res) => {
    const {fullName, email, password} = req.body;

    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect('/', {user: req.user});   
}

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
    return res.clearCookie('token').redirect('/');
}

export {
    registerView,
    loginView,
    register,
    login,
    logout
}