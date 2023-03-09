import React from 'react';
import './contentsidebody.css';
import { useEffect, useState } from 'react';
import search from '../../assets/Images/search.png';
import axios from 'axios';
import rename from '../../assets/Images/rename.png';
import edit from '../../assets/Images/edit.png';
import deletePic from '../../assets/Images/delete.png';

function ContentSideBody() {
  const [contentTypes, setContentTypes] = useState([]);
  const [currentContentType, setCurrentContentType] = useState(undefined);

  function changeContentType(name) {
    axios.get(`http://localhost:8081/content-type/${name}`).then(res => {
      setCurrentContentType(res.data);
    });
  }

  useEffect(() => {
    axios.get('http://localhost:8081/content-type').then(res => {
      setContentTypes(res.data);
      console.log(contentTypes);
    });
  }, []);
  return (
    <div id="mainsidebody">
      <div id="left">
        <div id="lefttop">
          <div>{`${contentTypes.length} Types`}</div>
          <img src={search} alt="search" width="25px" height="25px" />
        </div>
        <div className="midleftbody" id="midlelefttop">
          <p className="newType">+ New Type</p>
        </div>
        {contentTypes.map(content => {
          return (
            <div className="midleftbody" key={content.id} onClick={() => changeContentType(content.name)}>
              <p className="newTypet">{content.name}</p>
              <p className="newTypet">{content.attributes.length}</p>
            </div>
          );
        })}
      </div>
      {currentContentType ? (
        <div id="midrightbody">
          <div id="headername">
            <div id="headingname">{currentContentType.name}</div>
            <div id="imgid">
              <img src={rename} alt="rename" width="20px" height="20px" />
            </div>
          </div>
          <div>{`${currentContentType.attributes.length} Fields`}</div>
          <div className="midleftbody" id="midlelefttop">
            <p className="newType">Add another field</p>
          </div>
          {currentContentType.attributes.map(attribute => {
            return (
              <div className="midleftbody2" key={attribute.id}>
                <div id="leftside">
                  <div id="leftbox">
                    <div id="abbox">
                      <p>AB</p>
                    </div>
                    <div id="horseleft">
                      <bold>{attribute}</bold>
                    </div>
                  </div>
                  <div id="lefttext">
                    <p>Text</p>
                  </div>
                </div>
                <div id="images">
                  <img src={edit} alt="edit" width="20px" height="20px" />
                  <img src={deletePic} alt="delete" width="20px" height="20px" />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default ContentSideBody;
