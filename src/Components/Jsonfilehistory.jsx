import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { Select } from "antd";
import HistoryTable from "./HistoryTable";

const { Option } = Select;

const Jsonfilehistory = () => {
  const [filehistory, setfilehistory] = useState([]);
  const [selectedfile, setSelectedfile] = useState("");
  const [filesContent, setFilesContent] = useState({data:[]});

  useEffect(() => {
    console.log("Connect");
    connect();
  }, []);

  useEffect(() => {
    selectedfile && fetchFileContent();
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

  const fetchFileContent = async () => {
    await axios
      .get(
        `http://localhost:8081/jsonVersionFileSystem/api/fetchFileVersions/${
          selectedfile && selectedfile
        }`
      )
      .then((res) => {
        console.log(res, "response");
        setFilesContent(res.data);
      });
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
            <Link to="/fetch/file-history">File History</Link>
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
         {
          <div className="table-cont">
            <HistoryTable 
            fileData={filesContent}
            selectedFile={selectedfile}
            />
          </div>
        } 
      </div>
    </div>
  );
};

export default Jsonfilehistory;
