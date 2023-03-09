import React from 'react';
import './newuser.css';
import ImageContainer from '../../components/ImageContainer';
import RegisterUser from '../../components/RegisterUser';

function NewUser() {
  return (
    <div id="frontpage">
      <ImageContainer />
      <RegisterUser />
    </div>
  );
}

export default NewUser;
