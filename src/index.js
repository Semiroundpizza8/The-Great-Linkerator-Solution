import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import fetchAPI from './api';
import CreateLinkForm from "./components/CreateLinkForm";

const App = () => {
  const [linkList, setLinkList] = useState([]);
  const [search, setSearch] = useState('');

useEffect(async () => {
    fetchAPI('http://localhost:3001/api/links')
      .then((resp) => {
        setLinkList(resp);
      })
      .catch(console.error);
}, [])

function filteredLinks() {
  return linkList.filter((_link) => {
    return _link.link.includes(search.toLowerCase());
  });
}
  return <h1>The Great Linkerator</h1>;
};

function addNewLink(newLink) {
  setLinkList([...linkList, newLink]);
}

ReactDOM.render(
  <Router>
    <App />
    <Route exact path="/api">
    <CreateLinkForm linkList={linkList} setLinkList={setLinkList} addNewLink={addNewLink}/>
    </Route>
  </Router>,
  document.getElementById("app")
);
