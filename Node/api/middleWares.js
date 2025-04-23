import jwt from 'jsonwebtoken';
export const checkAuth=(req,res,next)=>{
    if(!req.headers.authorization)
        return res.status(403).send('Authorization failed!')
    const token=req.headers.authorization.split(' ')[1]
    if(!token)
        return res.status(403).send('Authorization failed!')
    jwt.verify(token,process.env.TOKEN,(error,decoded)=>{
        if(error||!decoded){
            return res.status(403).send('Authorization failed!')
        }
        if(decoded)
        {
            req.email=decoded.email
            next()
        }
    })
}