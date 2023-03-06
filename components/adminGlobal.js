import React from "react";
import { BsCheck } from "react-icons/bs";

function AdminGlobal({ global }) {
  return (
    <div className="admin-global">
      <div className="admin-item-header">
        <h5 className="h5 black-90">BANNER</h5>
      </div>
      <div className="global-centered-text">
        <p6 className={"h6 black-70"}>global items will be added soon</p6>
      </div>
      {/* <div className="admin-global-banner">
        <div className="admin-global-banner-form">
          <div className="admin-global-input">
            {" "}
            <input type="text" placeholder="empty" />
          </div>
          <div className="admin-global-input">
            {" "}
            <input type="text" placeholder="empty" />
          </div>
          <div className="admin-global-input">
            {" "}
            <input type="text" placeholder="empty" />
          </div>
          <div className="admin-global-input">
            <input type="text" placeholder="empty" />
          </div>
          <div className="admin-global-input">
            <input type="text" placeholder="empty" />
          </div>
          <div className="admin-global-input">
            {" "}
            <input type="text" placeholder="empty" />
          </div>

          <button className="admin-global-btn">
            <h6 className="h6 black-90">apply</h6>
            <i className="icon-24 black-90">
              <BsCheck />
            </i>
          </button>
        </div> 
      </div>*/}
    </div>
  );
}

export default AdminGlobal;
