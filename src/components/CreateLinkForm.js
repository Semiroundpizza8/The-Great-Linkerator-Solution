import React, {useState} from 'react';
import { fetchAPI } from "../api";

const BASE_URL= "http://localhost:3001/api";

const CreateLinkForm = (props) => {

  const {linkList, setLinkList, addNewLink } = props;

  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");

  function clearForm() {
    setLink("");
    setComment("");
  }

  return (
    <form
      className="newLinkForm"
      onSubmit={async (event) => {
        event.preventDefault();

        const newLinkData = {
          link: link,
          comment: comment, 
          clickCount: 1
        }

        try {
          const newLink = await fetchAPI(`${BASE_URL}/links`, "POST", newLinkData);

          addNewLink(newLink.link);
          clearForm();

        } catch(error) {
          throw error;
        }
      }}
    >
      <h3>Create a Link</h3>
      <label>URL</label>
      <input type="text" value={link} onChange={(event) => setLink(event.target.value)}></input>
      <label>Comment</label>
      <input type="text" value={comment} onChange={(event) => setComment(event.target.value)}></input>
      <button>Submit</button>
    </form>
  )



}

export default CreateLinkForm;


