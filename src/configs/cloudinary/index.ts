import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryOption = {
  cloudinary,
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
  params: {
    folder: "music",
    allowed_formats: ["jpg","jpeg", "png", "mp3"],
    resource_type: "auto",
  },
};

const storage = new CloudinaryStorage(cloudinaryOption);

const uploadCloud = multer({ storage });

export default uploadCloud;
