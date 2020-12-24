const client = require("./client");
const sync = require("./sync");

async function createLink({newLink, comment, clickCount}) {
  try {
    const { rows: [ link ] } = await client.query(`
      INSERT INTO links(link, comment, clickCount)
      VALUES($1, $2, $3)
      RETURNING *;
    `, [newLink, comment, clickCount]);

    return link;
  } catch (error) {
    throw error;
  }
}

async function getAllLinks() {
 try {
   const { rows } = await client.query(`
    SELECT *
    FROM links;
   `)

   return {rows};
 } catch (error) {
  throw error;
}
}

async function createInitialLink() {
  try {
    console.log("starting to create links!");
    await createLink({
      newLink: "www.google.com",
      comment: "This is the best search engine around",
      clickCount: 1
    })

    await createLink({
      newLink: "www.imgur.com",
      comment: "Love memes? This is meme heaven.",
      clickCount: 1
    })

    console.log("Finished creating links!");
  } catch(error) {
    throw error;
  }
}

async function getLinkById(linkId) {
  //if we introduce tags, then we'll need to also pull those over so they can be updated
  try {
    const {rows: [link] } = await client.query(`
      SELECT *
      FROM links
      WHERE id=${linkId};
    `);

    if(!link) {
      throw {
        message: "Could not find a link with that name"
      }
    }

    return link;

  } catch(error) {
    throw error
  }
}

async function updateLink(linkId, fields = {}) {
  //this needs to be written to update the tags too if we get that far
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');
  
  try {
    if(setString.length > 0) {
      await client.query(`
      UPDATE links
      SET ${ setString }
      WHERE id=${ linkId }
      RETURNING *;
      `, Object.values(fields));
    }

    return await getLinkById(linkId);

  } catch(error) {
    throw error
  }
}


module.exports = {
  sync,
  getAllLinks,
  createLink,
  createInitialLink,
  updateLink,
  getLinkById,
};
