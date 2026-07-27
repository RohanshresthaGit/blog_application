import {verifyToken} from '../services/auth.services.js'

const checkToken = (req, res, next) => {
    const token = req.cookies?.token;
    if(!token)  return next();
    try{
        const decoded = verifyToken(token);
        req.user = decoded;
    }catch(e){}
    return next();
    
}

export default checkToken;