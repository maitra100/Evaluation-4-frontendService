import React from 'react';
import './dashboard.css';
import search from '../../assets/Images/search.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import ContentSideBody from '../../components/ContentSideBody';
import CollectionTypeBody from '../../components/CollectionTypeBody';

function Dashboard() {
  const [contentTypes, setContentTypes] = useState([]);
  const [mainBody, setMainBody] = useState(false);
  const [collectionId, setCollectionId] = useState(undefined);
  const [collectionName, setCollectionName] = useState(undefined);

  function switchCollectionType(id, name) {
    setMainBody(false);
    setCollectionId(id);
    setCollectionName(name);
  }

  function changeMainBody() {
    if (mainBody === false) setMainBody(!mainBody);
    setCollectionId(undefined);
  }

  useEffect(() => {
    axios.get('http://localhost:8081/content-type').then(res => {
      setContentTypes(res.data);
    });
  }, []);
  return (
    <div id="mainbody">
      <div id="sideBar">
        <div id="title">CMS+</div>
        <div id="lowsidebar">
          <div id="sidebartop">
            <div>COLLECTION TYPES</div>
            <img src={search} alt="search" width="25px" height="25px" />
          </div>
        </div>
        <div id="types">
          <ul id="#ul">
            {contentTypes.map(content => {
              return (
                <li id="contentlist" key={content.id} onClick={() => switchCollectionType(content.id, content.name)}>
                  {content.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div id="bottomsidebar" onClick={changeMainBody}>
          <p id="buildertext">CONTENT TYPE BUILDER</p>
        </div>
      </div>
      <div id="rightBody">
        {mainBody ? (
          <div id="rightBody">
            <Header heading={'Content Type'} />
            <ContentSideBody />
          </div>
        ) : null}
        {collectionId ? (
          <div id="rightBody">
            {console.log(collectionId)}
            <Header heading={collectionName} />
            <CollectionTypeBody id={collectionId} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;

// onClick={() => switchCollectionType(content.id, content.name)
