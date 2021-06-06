const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

function uploadFile(path, imageName){
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __basedir + "/resources/static/assets/uploads/" + path + "/");
    },
    filename: (req, file, cb) => {
      let fileoriginalname = file.originalname.split('.');
      cb(null, imageName + '.' + fileoriginalname[1]);
    },
  });
  
  let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
  }).single("file");

  return util.promisify(uploadFile);
}

module.exports = uploadFile;