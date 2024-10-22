import jwt, { decode } from "jsonwebtoken";
 
export const verifyToken = (req, res, next) => {
    
    
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        
        if(err)
        {
            res.status(401).json({
                status : 108,
                message : "Token tidak valid atau kadaluwarsa",
                data : null
            })
            return;
        } 

        req.email = decoded.emailjwt;
        next();
    })
}