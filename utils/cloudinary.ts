import cloud, {v2} from "cloudinary"
const cloudinary: typeof v2 = cloud.v2

cloudinary.config({
    cloud_name:"duavu94l2",
    api_key:"364348213316947",
    api_secret:"pBZTOCp5v_TW3bcdsrwR2TcQcTQ"
})

export default cloudinary