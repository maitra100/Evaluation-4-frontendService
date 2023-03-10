import React from 'react';
import './contentsidebody.css';
import { useEffect, useState } from 'react';
import search from '../../assets/Images/search.png';
import axios from 'axios';
import rename from '../../assets/Images/rename.png';
import edit from '../../assets/Images/edit.png';
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

function ContentSideBody() {
  const [contentTypes, setContentTypes] = useState([]);
  const [currentContentType, setCurrentContentType] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenTwo, setModalOpenTwo] = useState(false);
  const [modalOpenThree, setModalOpenThree] = useState(false);
  const [modalInput, setModalInput] = useState('');
  const [modalInputAttribute, setModalInputAttribute] = useState('');

  function changeInputAttribute(e) {
    setModalInputAttribute(e.target.value);
  }

  function changeInput(e) {
    setModalInput(e.target.value);
  }

  function addAttribute(name) {
    const token = localStorage.getItem('token');
    axios
      .put(
        'http://localhost:8081/add-attribute',
        { name: name, attribute: modalInputAttribute },
        {
          headers: {
            token: token,
          },
        }
      )
      .then(res => {
        console.log(res.data);
      });
    axios
      .get(`http://localhost:8081/content-type/${name}`, {
        headers: {
          token: token,
        },
      })
      .then(res => {
        setCurrentContentType(res.data);
      });

    setModalOpenTwo(false);
    window.location.reload();
  }

  function changeContentType(name) {
    const token = localStorage.getItem('token');
    axios
      .get(`http://localhost:8081/content-type/${name}`, {
        headers: {
          token: token,
        },
      })
      .then(res => {
        setCurrentContentType(res.data);
      });
  }

  function addContentType() {
    axios
      .post(
        'http://localhost:8081/content-type',
        { name: modalInput },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
      .then(res => {
        setContentTypes([...contentTypes, res.data]);
      });
    setModalOpen(false);
    window.location.reload();
  }

  function deleteAttributeName(id, attribute) {
    axios
      .delete(`http://localhost:8081/delete-attribute/${id}/${attribute}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
    window.location.reload();
  }

  function editContentTypeName(id) {
    axios
      .put(
        'http://localhost:8081/edit-content-type-name',
        { id: id, newName: modalInput },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
      .then(res => {
        console.log(res.data);
      });
    window.location.reload();
    // axios.get(`http://localhost:8081/content-type/${name}`).then(res => {
    //   setCurrentContentType(res.data);
    // });
    setModalOpenThree(false);
  }

  useEffect(() => {
    axios
      .get('http://localhost:8081/content-type', {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then(res => {
        setContentTypes(res.data);
      });
  }, []);
  return (
    <div id="mainsidebody">
      <div id="left">
        <div id="lefttop">
          <div>{contentTypes && `${contentTypes.length} Types`}</div>
          <img src={search} alt="search" width="25px" height="25px" />
        </div>
        <div className="midleftbody" id="midlelefttop" onClick={setModalOpen}>
          <p className="newType">+ New Type</p>
        </div>
        <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={customStyles}>
          <div id="modalBox">
            <div id="modalheader">
              <b>Create a new content type</b>
            </div>
            <div>Name of the content type</div>
            <input id="modalinput" onChange={changeInput} value={modalInput} placeholder="Input" />
            <div id="buttons">
              <button id="cancelbutton" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button id="createbutton" onClick={addContentType}>
                Create
              </button>
            </div>
          </div>
        </Modal>
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
            <div id="imgid" onClick={setModalOpenThree}>
              <img src={rename} alt="rename" width="20px" height="20px" />
            </div>
            <Modal isOpen={modalOpenThree} onRequestClose={() => setModalOpenThree(false)} style={customStyles}>
              <div id="modalBox">
                <div id="modalheader">
                  <b>Write a new content type name</b>
                </div>
                <div>New Name of the content type</div>
                <input id="modalinput" onChange={changeInput} value={modalInput} placeholder="Input" />
                <div id="buttons">
                  <button id="cancelbutton" onClick={() => setModalOpenThree(false)}>
                    Cancel
                  </button>
                  <button id="createbutton" onClick={() => editContentTypeName(currentContentType.id)}>
                    Create
                  </button>
                </div>
              </div>
            </Modal>
          </div>
          <div>{currentContentType && `${currentContentType.attributes.length} Fields`}</div>
          <div className="midleftbody" id="midlelefttop" onClick={setModalOpenTwo}>
            <p className="newType">Add another field</p>
          </div>
          <Modal isOpen={modalOpenTwo} onRequestClose={() => setModalOpen(false)} style={customStyles}>
            <div id="modalBox">
              <div id="modalheader">
                <b>Create a new attribute in this content type</b>
              </div>
              <div>Attribute to be added</div>
              <input id="modalinput" onChange={changeInputAttribute} value={modalInputAttribute} placeholder="Input" />
              <div id="buttons">
                <button id="cancelbutton" onClick={() => setModalOpenTwo(false)}>
                  Cancel
                </button>
                <button id="createbutton" onClick={() => addAttribute(currentContentType.name)}>
                  Create
                </button>
              </div>
            </div>
          </Modal>
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
                  <img
                    src={deletePic}
                    alt="delete"
                    width="20px"
                    height="20px"
                    onClick={() => deleteAttributeName(currentContentType.id, attribute)}
                  />
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
