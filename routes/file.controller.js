let Sport = require('../model/sport')
const uploadFile = require("../utils/upload");
const fs = require('fs');
const baseUrl = "http://localhost:8010/files/";

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    // console.log(req);
    console.log(req.body.id);
    console.log(req.body.name);
    console.log(req.body.image);
    Sport.findOneAndUpdate({id:req.body.id },{ name: req.body.name,image: req.body.image }, function (err) {
      if (err) return handleError(err);
      console.log(req.body.name+ ' updated'); 
      res.status(200).send({
        message: "Updated the sport successfully!",
      });
    });
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    // res.status(200).send({
    //   message: "Updated sport and Uploaded the file successfully: " + req.file.originalname,
    // });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
    
  });
};

const deleteFile = (req, res, path) => {
  console.log(" req.body.image = " + req.body.image)
  const fileName = req.body.image;
  const imageDirectoryPath = "./resources/static/assets/uploads/" + path + "/" + fileName;
  console.log(" imageDirectoryPath = " + imageDirectoryPath)
  fs.unlink(imageDirectoryPath, (err) => {
    if (err) {
      res.status(400).send({
        message: "Could not delete the file. " + err,
      });
    }
  });

}


module.exports = {
  upload,
  getListFiles,
  download,
  deleteFile
};