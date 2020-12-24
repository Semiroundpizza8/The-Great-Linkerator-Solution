const {client, getAllLinks, createLink, updateLink, getLinkById} = require('../data_layer');

const apiRouter = require("express").Router();

apiRouter.get("/", async (req, res, next) => {
  res.send("Welcome to The Great Linkerator!")
})

apiRouter.get("/links", async (req, res, next) => {
    try {
      console.log("Requesting all links")
      const allLinks = await getAllLinks();
  
      res.send(allLinks)
      next();
  
      console.log("Finished requesting all links");
    } catch(error) {
      console.log("Error requesting links");
      next(error);
    }
  });

  apiRouter.post("/links", async (req, res, next) => {
    try {
      const newLink = await createLink(req.body);
  
      res.send(newLink);
      next();
    } catch(error) {
      next(error);
    }
  })

  apiRouter.patch("/links/:id", async (req, res, next) => {
    const { linkId } = req.params; 
    const { link, comment, clickCount} = req.body;

    const updateFields = {};

    if(link) {
        updateFields.linkName = link;
    }

    if(comment) {
        updateFields.comment = comment;
    }

    if(clickCount) {
        updateFields.clickCount = clickCount;
    }

    try {
        const originalLink = getLinkById(linkId);

        if(originalLink.id === linkId) {
            const updatedLink = await updateLink(linkId, updateFields);
            res.send({link: updatedLink })
        } else {
            next({
                message: "Error updating link"
            })
        }
    } catch(error) {
        throw error;
    }
  })

  module.exports = apiRouter;
