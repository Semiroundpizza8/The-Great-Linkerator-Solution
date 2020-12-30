const sync = require("./sync");
const client = require("./client");

// get all links
async function getAllLinks() {
  try {
    const { rows: links } = await client.query(`
      SELECT *
      FROM links
    `);

    console.log("These are the links:", links);

    return links;
  } catch (error) {
    throw error;
  }
}

// create new link
const createLink = async (linkFields) => {
  const { url, comment } = linkFields;

  try {
    if (!url) {
      return null;
    }
    const {
      rows: [link],
    } = await client.query(
      `
      INSERT INTO 
      links(url, comment)
      VALUES($1, $2)
      RETURNING *;
    `,
      [url, comment]
    );
    return link;
  } catch (error) {
    throw error;
  }
};
// get link by id

async function createInitialLinks() {
  try {
    const linkOne = await createLink("www.google.com", "search engine");

    const linkTwo = await createLink("www.amazon.com", "shopping engine");
  } catch (error) {
    throw error;
  }
}

async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const insertValues = tagList.map((_, index) => `$${index + 1}`).join("), (");

  const selectValues = tagList.map((_, index) => `$${index + 1}`).join(", ");

  console.log("these are insert values", insertValues);
  console.log("these are select values", selectValues);

  try {
    await client.query(
      `INSERT INTO tags(name) 
      VALUES(${insertValues}) 
      ON CONFLICT (name) DO NOTHING;`,
      tagList
    );
    const { rows } = await client.query(
      `SELECT * FROM  tags
      WHERE name 
      IN (${selectValues});
    `,
      tagList
    );

    return rows;
  } catch (error) {
    console.log("this is error");
    throw error;
  }
}

async function getAllTags() {
  try {
    const { rows } = await client.query(`SELECT * FROM tags;`);

    return rows;
  } catch (error) {
    throw error;
  }
}

createInitialLinks();

module.exports = {
  sync,
  client,
  getAllLinks,
  createLink,
  createInitialLinks,
  createTags,
  getAllTags,
};
