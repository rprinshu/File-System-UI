import React, { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { Switch } from "antd";
import axios from "axios";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import { Button, Menu, Dropdown } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "antd";

const Versionsystem = ({ }) => {
  const [visible, setVisible] = useState(false);
  const [project, setProject] = useState(false);

  const openProject = () => {
    setVisible(true);
    setProject(true);
  };

  const close = () => {
    setVisible(false);
    setProject(false);
  };

  const [projectData, setProjectData] = useState({
    name: "",
    version: "",
  });

  const submitCreateProject = async () => {
    const { name, version } = projectData;
    if (!name || !version) {
      return;
    }
    await axios
      .post(
        `http://localhost:8081/jsonVersionFileSystem/api/revertFileContent`,
        projectData
      )
      .then((res) => {
        console.log(res);
        setProjectData({
          name: "",
          version: "",
        });
        toast.success("Project created successfully");
      });
  };

  return (
    <div className="create">
      <div className="bread">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/create">Create</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/create/version-system">Version Content</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="fetch">
        <div onClick={openProject} className="box">
          <span className="box-1">
            <i className="fas fa-plus-circle"></i>
          </span>
          <span className="box-2">File</span>
        </div>
      </div>
      <div
        className="modal-wrapper"
        onClick={close}
        style={visible ? { display: "block" } : { display: "none" }}
      ></div>
      <div
        className="modal"
        style={visible ? { display: "block" } : { display: "none" }}
      >
        <div className="x">
          <span onClick={close}>
            <i className="fas fa-times"></i>
          </span>
        </div>
        {project && (
          <div className="create-project-box">
            <div className="form-data">
              <label>File Name</label>
              <input
                value={projectData.name}
                onChange={(e) =>
                  setProjectData({ ...projectData, name: e.target.value })
                }
                placeholder="Enter File Name"
                type="text"
              />
            </div>

            <div className="form-data">
              <label>File Version</label>
              <input
                value={projectData.version}
                onChange={(e) =>
                  setProjectData({ ...projectData, version: e.target.value })
                }
                placeholder="Enter File Version"
                type="text"
              />
            </div>
            <div className="create-button">
              <span onClick={submitCreateProject}>Revert</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Versionsystem;
