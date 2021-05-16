import React, { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import { Button, Menu, Dropdown } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CreateFile = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState({});

  const jsonData = {
    commitMessage: "",
    fileContent: {
      constantName: "",
      extendsPage: null,
      fileTimestamp: "",
      owner: "",
      description: "",
    },
  };
  const createFile = async () => {
    await axios
      .post(
        `http://localhost:8081/jsonVersionFileSystem/api/createFileVersions`,
        file
      )
      .then((res) => {
        console.log(res);
        toast.success("File created successfully");
      })
      .catch((err) => {
        toast.error(
          "Fill all required fields,Commit Message,Constant Name,owner,FileTimeStamp"
        );
      });
  };

  const handleChng = async (val) => {
    console.log(val);
    setFile(val);
  };

  return (
    <div>
      <div className="bread">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/create">Create</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/create/create-file">Create File</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <center style={{ margin: "1rem" }} onClick={() => setOpen(!open)}>
        <Button type="primary">Create File</Button>
      </center>
      {open && (
        <div>
          <center style={{ margin: "1.5rem" }}></center>

          <Editor value={jsonData} onChange={handleChng} />
          <center style={{ margin: "1rem" }}>
            <span onClick={createFile}>
              {" "}
              <Button type="primary">Save File</Button>
            </span>
          </center>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CreateFile;
