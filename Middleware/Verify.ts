import jwt from "jsonwebtoken"

// const veryfyToken = async(req:any,res:any,next:any)=>{
//     const getSession = req.headers["cookie"]

//     if(!getSession){
//         return res.status(404).json({message:"login to generate token"})
//     }
//     const tokenCookies = await getSession.split("=")[1]
//     console.log("first",tokenCookies)

//     if(tokenCookies){
//         const tokens = await tokenCookies
//     jwt.verify(tokens,"mynameisjoanbadmus", (err:any,payload:any)=>{
//         if(err){
//             return res.status(404).json({message:"token time out"})
//         }
//         req.user = payload
//         next()
//     }
//     )
//     }else{
//         return res.status(404).json({message:"invalid token"})
//     }
// }

export const verifyToken = async(req:any,res:any,next:any)=>{
    if(req.headers.authorization){
        const token = await req.headers.authorization.split(" ")[1]
        console.log(token)
        jwt.verify(token,"mynameisjoanbadmus",(err:any,payload:any)=>{
            if(err)
            {
                return res.status(404).json({
                    message:"token expire"
                })
            }
            req.user = payload
            next()
        })
    }else{
        return res.status(404).json({
            message:"please provide a valid token"
        })
    }
}