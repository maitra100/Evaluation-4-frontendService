import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './collectiontypebody.css';
import deletePic from '../../assets/Images/delete.png';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    width: 400,
  },
};

function CollectionTypeBody({ id,name,setStat,stat }) {
  const [collectionType, setCollectionType] = useState(undefined);
  const [jsonObj, setJsonObj] = useState(undefined);
  const [form,setForm]=useState({});
  const [modalOpen, setModalOpen] = useState(false);

  function deleteContentTypeEntry(id) {
    axios.delete(`http://localhost:8081/delete-content-type-entry/${id}`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    setStat(!stat);
  }

  function handleForm(e){
    setForm({...form,[e.target.name]:e.target.value});
  }

  function submit(){
    let values=Object.values(form);
    axios.post('http://localhost:8081/add-content-type-entry',{name:name,values:values},{
      headers: {
        token: localStorage.getItem('token'),
      },
    }).then((res)=>{
      console.log(res);
      setStat(!stat);
      setModalOpen(false);
    }).catch((err)=>{
      console.log(err.message);
    });
  }

  useEffect(() => {
    axios.get(`http://localhost:8081/content-type/${name}`,{
      headers: {
        token: localStorage.getItem('token'),
      },
    }).then((res)=>{
      let newKeys=[];
      newKeys.push('id');
      newKeys=[...newKeys,...res.data.attributes];
      newKeys.push('Actions');
      console.log(newKeys);
      setJsonObj(newKeys);
      const formObj={};
      newKeys.map((key,index)=>{
        if(index!=0 && index!=newKeys.length-1)
          formObj[key]='';
      });
      setForm(formObj);
    });
    axios
      .get(`http://localhost:8081/content-type-entry/${id}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then(res => {
        setCollectionType(res.data);
      });
  }, [stat]);

  
  return (
    <div id="lastbody">
      <div id="entryheading">
        <div id="entries">{collectionType ? `${collectionType.length} ENTRIES FOUND` : null}</div>
        <div id="addentry" onClick={setModalOpen}>Add new entry</div>
        <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={customStyles}>
          <div id="modalBox">
            <div id="modalheader">
              <b>Add Entry</b>
            </div>
            <div>Add values to corresponding attributes</div>
            {
              jsonObj && jsonObj.map((key,index)=>{
                if(index!=0 && index!=jsonObj.length-1){
                  return (
                    <>
                      <label className="inputLabel" htmlFor="email">
                        {key}
                      </label>
                      <input id="modalinput" name={key} placeholder="Input" onChange={handleForm}/>
                    </>
                  );
                }
              })
            }
            <div id="buttons">
              <button id="cancelbutton" onClick={() => setModalOpen(false)}>
                    Cancel
              </button>
              <button id="createbutton" onClick={submit}>
                    Create
              </button>
            </div>
          </div>
        </Modal>
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
                  return (
                    <div id="detailed" key={detail}>
                      {detail ? detail : 'null'}
                    </div>
                  );
                })}
                <div id="lastimg">
                  {/* <div id="firstlastimg">
                  </div> */}
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
  name:PropTypes.string.isRequired,
  setStat:PropTypes.func.isRequired,
  stat:PropTypes.bool.isRequired
};

export default CollectionTypeBody;
