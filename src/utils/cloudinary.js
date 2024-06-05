import {v2 as cloudinary} from 'cloudinary';

import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {

        if(!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
        });        
        console.log("File uploaded to cloudinary", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) //delete the file from local storage due to upload failure

        console.error("Error in uploading file to cloudinary", error);

        return null;
    }
    
}    

export {uploadOnCloudinary}