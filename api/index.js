const express = require("express");
const apiRouter = express.Router();

const {
  getAllLinks,
  createLink,
  createInitialLinks,
  createTags,
  getAllTags,
} = require("../index");

apiRouter.get("/data_layer/index", async (req, res, next) => {
  try {
    const allLinks = await getAllLinks();
    res.send({
      allLinks,
    });
  } catch (error) {
    console.error(error);
  }
});

apiRouter.get(`/data_layer/index.js${tagName}/tags`, async (req, res) => {
  try {
    const allTags = await getAllTags();

    console.log("these are my tags", allTags);

    res.send({
      allTags,
    });
  } catch (error) {
    console.log("error in posts", error);
  }
});

apiRouter.post("/data_layer/index.js", async (req, res, next) => {
  const { url, comments } = req.body;
  try {
    const link = await createLink(url, comments);

    res.send({
      link,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/links
// GET /api/tags/:tagName/links

// POST /api/links (creates tags during link creation)
// PATCH /api/links/:id (used both to update comment/tags as well as to increment the click count)
