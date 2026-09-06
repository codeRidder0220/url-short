import { validateUserToken } from "../utils/token.js"

export function authenticationMiddleware(req,res,next){
    const authHeader = req.headers['authorization'];

    if(!authHeader) return next(); //agr token nhi aya

    if(!authHeader.startsWith('Bearer')) return res.status(400).json({error:'authorization must start with bearer'})

    const [_,token] = authHeader.split(' ');//token nikal liya 

    const payload = validateUserToken(token); //payload me dal diya verify krke token ko
 
    req.user = payload; //token se mila data req me dal diya
    next();
}

export function ensureAuthenticated(req,res,next){


    if(!req.user || !req.user.id){
        return res
        .status(401)
        .json({error: "You must be logged in to access this resource"})
    }
    next();
}