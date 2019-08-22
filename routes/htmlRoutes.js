const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function(app) {

  app.get("/", function(req, res) {
    axios.get("https://www.huffpost.com/impact/topic/good-news/").then(function(response) {
      const $ = cheerio.load(response.data);
      $("div.card__text").each(function(i, element) {
        const result = {};
        result.title = $(this)
          .children("div [class=card__headlines]")
          .children("a")
          .children("h2")
          .text();
        result.link = $(this)
          .children("div [class=card__headlines]")
          .children("a")
          .attr("href");
        result.summary = $(this)
          .children("div [class=card__description]")
          .text();
        db.Article.create(result)
      });
    })
    .then(function(resp) {
      db.Article.find({})
      .populate("note")
      .then(function(dbArticle) {
        res.render("index", {articles: dbArticle});
      })
      .catch(function(err) {
        res.json(err);
      });
    });
  });

  app.get("/savedarticles", function(req, res) {
    db.Article.find({})
    .populate("note")
    .then(function(dbArticle) {
      res.render("savedarticles", {articles: dbArticle});
    })
    .catch(function(err) {
      res.json(err);
    });
  });

};