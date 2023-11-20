import mongoose from "mongoose"

const url = "mongodb://0.0.0.0:27017/Classword"
const onlineUrl="mongodb+srv://poshlindajay:jFpGmIG56Jq4x2Qk@cluster0.7pizula.mongodb.net/Ecommerce";

mongoose.connect(onlineUrl).then(()=>{
    console.log("connection has been made")
}).catch((error)=>{
    console.log(error,"error in database connection")
})

export default mongoose