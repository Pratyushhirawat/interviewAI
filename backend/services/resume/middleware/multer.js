import fs from 'fs';
import multer from 'multer';


const uploadpath = "../uploads"

if (!fs.existsSync(uploadpath)) {
    fs.mkdirSync(uploadpath)
}

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, uploadpath)
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname)
    }
})

const fileFilter = (req,file,cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true)
    }else {
        cb(new Error("Only PDF files are allowed"), false)
    }
}

export const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize: 20 * 1024 * 1024
    }
})

