import {createHmac, randomBytes} from "crypto";
import {Schema, model} from 'mongoose';
import {generateToken} from '../services/auth.services.js';

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
         type: String,
    },
    password: {
         type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: "/images/default_user.png"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, {timestamps: true})

userSchema.pre("save", function (next) {
    const user = this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString("hex");
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

})

userSchema.static('matchPassword', async function (email, password) {
    const user = await this.findOne({email});
    if(!user) throw new Error("User not found");
    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash =  createHmac("sha256", salt).update(password).digest("hex")

    if(hashedPassword !== userProvidedHash) throw new Error("Invalid user credentials");
    const token = generateToken(user);
    return token;
})

const User = model("User", userSchema);

export default User;