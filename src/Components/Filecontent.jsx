import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { Select } from "antd";
import { Modal, Button } from "antd";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";

const { Option } = Select;

const Filecontent = () => {
  const [filehistory, setfilehistory] = useState([]);
  const [selectedfile, setSelectedfile] = useState("");
  //const [filesContent, setFilesContent] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [singleData, setSingleData] = useState({});

  useEffect(() => {
    console.log("Connect");
    connect();
  }, []);

  useEffect(() => {
    selectedfile && getContent();
  }, [selectedfile]);

  // to pause the function execution and resume after the data comes
  const connect = async () => {
    await axios
      .get("http://localhost:8081/jsonVersionFileSystem/api/fetchFileNames")
      .then((res) => {
        console.log(res, "response");
        setfilehistory(res.data);
      });
  };

  const getContent = async (id) => {
    await axios
      .get(
        `http://localhost:8081/jsonVersionFileSystem/api/fileContent/${
          selectedfile && selectedfile
        }`
      )
      .then((res) => {
        console.log(res);
        setSingleData(res.data);
        showModal();
      });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSingleData({});
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSingleData({});
  };

  function onChange(value) {
    console.log(`selected ${value}`);
    setSelectedfile(value);
  }
  return (
    <div>
      <div className="bread">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/fetch">Fetch</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/fetch/file-content">File Content</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="history-cont">
        <div>
          <div className="history-input">
            <div className="history-input-item">
              <label htmlFor="">Select File</label>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select File"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {filehistory.length > 0 &&
                  filehistory.map((m) => (
                    <option value={m.name}>{m.name}</option>
                  ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="table">
          <Modal
            title=""
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width="50%"
          >
            <div style={{ padding: "3rem" }}>
              {Object.keys(singleData).length > 0 && (
                <Editor value={singleData} onChange={() => {}} />
              )}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Filecontent;
