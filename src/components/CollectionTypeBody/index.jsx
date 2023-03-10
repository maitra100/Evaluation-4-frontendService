import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './collectiontypebody.css';
import edit from '../../assets/Images/edit.png';
import deletePic from '../../assets/Images/delete.png';

function CollectionTypeBody({ id }) {
  const [collectionType, setCollectionType] = useState(undefined);
  const [jsonObj, setJsonObj] = useState(undefined);

  function deleteContentTypeEntry(id) {
    axios.delete(`http://localhost:8081/delete-content-type-entry/${id}`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    // window.location.reload();
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8081/content-type-entry/${id}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then(res => {
        setCollectionType(res.data);
        const obj = JSON.parse(res.data[0].values);
        const keys = Object.keys(obj);
        const newKeys = ['ID'].concat(keys);
        newKeys.push('Actions');
        setJsonObj(newKeys);
      });
  }, [id]);
  return (
    <div id="lastbody">
      <div id="entryheading">
        <div id="entries">{collectionType ? `${collectionType.length} ENTRIES FOUND` : null}</div>
        <div id="addentry">Add new entry</div>
      </div>
      <div className="entrybody">
        {jsonObj &&
          jsonObj.map(key => {
            return <div key={key}>{key}</div>;
          })}
      </div>
      <div id="boxes">
        {collectionType &&
          collectionType.map(entry => {
            const values = JSON.parse(entry.values);
            const details = Object.values(values);
            const newDetails = [entry.id].concat(details);
            return (
              <div key={5} id="indibox">
                {newDetails.map(detail => {
                  console.log(detail);
                  return (
                    <div id="detailed" key={4}>
                      {detail ? detail : 'null'}
                    </div>
                  );
                })}
                <div id="lastimg">
                  <div id="firstlastimg">
                    <img src={edit} alt="edit" width="20px" height="20px" />
                  </div>
                  <div id="lastlastimg">
                    <img
                      src={deletePic}
                      alt="delete"
                      width="20px"
                      height="20px"
                      onClick={() => deleteContentTypeEntry(entry.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

CollectionTypeBody.propTypes = {
  id: PropTypes.number.isRequired,
};

export default CollectionTypeBody;
