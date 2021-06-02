const Article = require("../model/article");
const uploadFile = require("../utils/upload");
const { deleteFile } = require("./file.controller");

function getArticle(req, res) {
    console.log("call getArticle()");
    try {
        Article.aggregatePaginate(
            null,
            {
                page: parseInt(req.body.page) || 1,
                limit: 2,
            },
            (err, article) => {
            if (err) {
                res.send(err);
            }
            res.send(article);
            }
        );
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({ message: e.message });
    }
  }

  function getOneArticle(req, res) {
    console.log("call getOneArticle()");
    var id = Number(req.params.id);
  
    Article.aggregate(
      [
        { $match: { id: id }},
        { $limit: 1 },
      ],
      (err, article) => {
        if (err) {
          res.send(err);
        }
        res.send(article[0]);
      }
    );
  }

  async function insertArticleWithUpload(req ,res){
    try {
      console.log("insert Article with upload image");
      let newFileName = `article-${ new Date().getTime() }`;
      let path = "articles";
      let upload = uploadFile(path, newFileName);
      await upload(req, res);
      let fileExtension = req.file.originalname.split('.')[1];
      insertArticle(req, res, `${newFileName}.${fileExtension}`);
    } catch (error) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${error}`,
      });
    }
  }

  function insertArticle(req, res, newFileName) {
    try {
      let article = new Article();
      article.id = req.body.id;
      article.image = newFileName;
      article.date = new Date().toLocaleDateString();
      article.description = req.body.description;
      article.save((err) => {
        if (err) {
          res.send("can't post article ", err);
        }
        res.json({ message: `Post created!` });
      }); 
    } catch (error) {
      res.status(500).send({
        message: ` Article created !  ${error}`,
      });
    }
  }


// Update d'un Article (PUT)
async function updateArticleWithUpload(req, res) {
  try {
      console.log("update Article with upload image");
      let newFileName = `Article-${ new Date().getTime() }`;
      let path = "Articles";
      let upload = uploadFile(path, newFileName);
      await upload(req, res);
      await deleteFile(req, res, path);
      let fileExtension = req.file.originalname.split('.')[1];
      updateArticle(req.body.id, req.body.description, `${newFileName}.${fileExtension}`, res);
  } catch (error) {
    res.status(500).send({
      message: ` File : ${req.body.image} is not uploaded !  ${error}`,
    });
  }
}

function updateArticleWithoutUpload(req, res){
  try {
    updateArticle(req.body.id, req.body.description, req.body.image, res);
  } catch (error) {
    res.status(500).send({
      message: ` Article is not updated !  ${error}`,
    });
  }
}

function updateArticle(id, description, image, res){
  Article.findOneAndUpdate({id: id },{ description: description, image: image }, function (err) {
    if (err) return handleError(err);
    res.status(200).send({
      message: "Updated the Article successfully!",
    });
  });
}

  // suppression d'un article (DELETE)
function deleteArticle(req, res) {
  Article.findOne({ id: req.params.id }, (err, article) => {
    if (err) {
      res.send(err);
    }
    Article.deleteOne({ id: article.id }, function (err) {
      if (err) return handleError(err);
      res.status(200).send({ message: "Article deleted" });
    });
  });
}

  module.exports = {
    getArticle,
    getOneArticle,
    insertArticleWithUpload,
    updateArticleWithUpload,
    updateArticleWithoutUpload,
    deleteArticle
  };