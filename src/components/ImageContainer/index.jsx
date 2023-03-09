import React from 'react';
import './imagecontainer.css';
import frontpic from '../../assets/Images/frontpic.png';

function ImageContainer() {
  return (
    <div id="loginLeft">
      <div id="text1">Design APIs fast,</div>
      <div id="text2">Manage content easily</div>
      <img id="frontimage" src={frontpic} alt="frontpic" />
    </div>
  );
}

export default ImageContainer;
