const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        const finalDestination = path.join('uploads') 
        cb(null,finalDestination)
    },

    filename : (req,file,cb)=> {
        const fileName = `${Date.now()}_${file.originalname}_anandclicks_.jpg`
        cb(null,fileName)
    }
})
const upload = multer({storage})

module.exports = upload