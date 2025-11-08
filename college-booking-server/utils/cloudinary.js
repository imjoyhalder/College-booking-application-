//! I am not use this cloudinary but I have plan to improve this project for this reason I build it 

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (file, folder = 'college-booking') => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder,
            resource_type: 'auto'
        });
        return result;
    } catch (error) {
        throw new Error('Image upload failed');
    }
};

export const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        throw new Error('Image deletion failed');
    }
};

export default cloudinary;