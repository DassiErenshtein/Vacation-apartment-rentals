import React, { useState } from 'react';
import './pop.css';
import { AddModel } from './addModel';

export const PopUp = (props) => {
  // debugger
  let { thisUser,list,type } = props;
  const [isOpen, setIsOpen] = useState(thisUser ? false : true);

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };
  return (
    <div id='popUp'>
      <div className={`pop-up ${isOpen ? 'open' : ''}`}>
        <div className="content">
          <div className="container">
            <span className="close" onClick={handleCloseClick}>
              ❌
            </span>
            <AddModel setFlag={setIsOpen} flag={isOpen} list={list} type={type}></AddModel>
            <div className="subscribe">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;