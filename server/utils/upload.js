
import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';  // package for uploading file in mongoDB
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;


const storage = new GridFsStorage({
    url: `mongodb://${username}:${password}@blog-app-shard-00-00.2zm04.mongodb.net:27017,blog-app-shard-00-01.2zm04.mongodb.net:27017,blog-app-shard-00-02.2zm04.mongodb.net:27017/?ssl=true&replicaSet=atlas-2ns39k-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`,
    options:{useNewUrlParser:true},
    file:(request,file) =>{
        const match = ["image/png","image/jpg"];          // only these image formats will be uploaded
        if(match.indexOf(file.memeType)==-1){
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`
        }
        
        

    }
});

export default multer({storage});