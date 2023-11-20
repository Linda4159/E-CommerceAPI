 import multer from "multer"
import path from "path"


type destinationCallBack = (error:Error | null, destination:string)=>void
type fileNameCallBack = (error:Error | null, filename:string)=>void


const storage = multer.diskStorage({
    destination:function(req:Request,file:any,cb:any){
        
cb(null,path.join(__dirname,"../uploads"))
    },
    filename:function(req:Request,file:any,cb:any){
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random () * 1e9)
                cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
                )
            }
})

export const upload = multer({storage:storage}).single("avatar")



type CallBackDestination = (error:Error | null, destination:string)=>void
type CallBackfileName = (error:Error | null, filename:string)=>void


const Imagestorage = multer.diskStorage({
    destination:function(req:Request,file:any,cb:CallBackDestination){
        
cb(null,path.join(__dirname,"../uploads"))
    },
    filename:function(req:Request,file:any,cb:CallBackfileName){
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random () * 1e9)
                cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
                )
            }
})

 export const uploads = multer({storage:Imagestorage}).single("image")
