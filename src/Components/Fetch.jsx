import React from "react";
import { Breadcrumb } from "antd";
import {Link} from 'react-router-dom'

const Fetch = ({history}) => {
  return (
    <div className="fetch-main">
    <div className="bread">
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/fetch">Fetch</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      </div>
      <div  className="fetch">
        <div onClick={()=>{history.push('/fetch/file-content')}} className="box">
          <span className="box-1"><i className="fas fa-folder"></i></span>
          <span className="box-2">File Content</span>
        </div>
        {/* <div onClick={()=>{history.push('/fetch/version-content')}} className="box">
          <span className="box-1"><i className="fas fa-code-branch"></i></span>
          <span className="box-2">Version Content</span>
        </div> */}
        <div onClick={()=>{history.push('/fetch/file-history')}} className="box">
          <span className="box-1"><i className="fas fa-history"></i></span>
          <span className="box-2">File History</span>
        </div>
        <div onClick={()=>{history.push('/fetch/files')}} className="box">
          <span className="box-1"><i className="far fa-file-alt"></i></span>
          <span className="box-2">Files</span>
        </div>
      </div>
    </div>
  );
};

export default Fetch;
