import React from "react";
import { Breadcrumb } from "antd";
import {Link} from 'react-router-dom'


const Create = ({history}) => {
  return (
    <div className="fetch-main">
    <div className="bread">
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/create">Create</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      </div>
      <div  className="fetch">
        <div onClick={()=>{history.push('/create/create-file')}} className="box">
          <span className="box-1"><i className="fas fa-file"></i></span>
          <span className="box-2">Create File</span>
        </div>
        <div onClick={()=>{history.push('/Create/version-system')}} className="box">
          <span className="box-1"><i className="fas fa-code"></i></span>
          <span className="box-2">Version System</span>
        </div>
      </div>
    </div>
  );
};

export default Create;
