import React from 'react';
import "./style.scss";

function Note() {
    return (
        <>
         <div className="note">
          <ul>
            <li>
              <div className={`seat seat--available`}></div>
              <span>Available</span>
            </li>
            <li>
              <div className={`seat seat--occupied`}></div>
              <span>Occupied</span>
            </li>
            <li>
              <div className={`seat seat--selected`}></div>
              <span>Selected</span>
            </li>
            <li>
              <div className={`seat seat--vip`}></div>
              <span>VIP</span>
            </li>
          </ul>
        </div>   
        </>
    );
}

export default Note;