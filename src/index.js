import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, useHistory, Switch, Redirect } from "react-router-dom";
import fetchAPI from './api';
import CreateLinkForm from "./components/CreateLinkForm";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [linkList, setLinkList] = useState([]);
  const [search, setSearch] = useState('');
  console.log('hello there!')

  function addNewLink(newLink) {
    setLinkList([...linkList, newLink]);
  }
  
  let history = useHistory();

  // useEffect(async () => {
  //   fetchAPI('http://localhost:3001/api/links')
  //     .then((resp) => {
  //       setLinkList(resp);
  //     })
  //     .catch(console.error);
  // }, [])

  function filteredLinks() {
    return linkList.filter((_link) => {
      return _link.link.includes(search.toLowerCase());
    });
  }
  
  return <>
  <h1>The Great Linkerator</h1>
  <Switch>
    <Route path="/searchBar" render={()=> <SearchBar />} />
    <Route path="/createLink" render={()=><CreateLinkForm linkList={linkList} setLinkList={setLinkList} addNewLink={addNewLink} history={history}/>}/>

    <Redirect from="*" to="/"  />
  </Switch>

  </>
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
