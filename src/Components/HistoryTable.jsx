import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import moment from "moment";
import { Modal, Button } from "antd";
import axios from "axios";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import {toast} from "react-toastify";

const HistoryTable = ({ fileData, selectedFile }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [singleData, setSingleData] = useState({});
    const [tableContent, setTableContent] = useState({data:[]})
  useEffect(() => {
    console.log(fileData, "table files");
      setTableContent(fileData);
  }, [fileData]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "File Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Author",
      key: "modifiedBy",
      dataIndex: "modifiedBy",
    },
    {
      title: "Modified Date",
      key: "modifiedDate",
      dataIndex: "modifiedDate",
    },
    {
      title: "Commit Message",
      key: "commitMessage",
      dataIndex: "commitMessage",
    },
    {
        title: "Actions",
        dataIndex: "actionData",
        key: "actionData",
        render: (actionData) => (
          <Space size="middle">
            <span
              style={{ color: "purple", cursor: "pointer" }}
              onClick={() => getContent(actionData.vcon)}
            >
              Get
            </span>
              <>
                  {actionData.currentVersion !== actionData.vcon &&
                  <span
                      style={{color: "purple", cursor: "pointer"}}
                      onClick={() => revert({name:actionData.name, version:actionData.vcon})}
                  >
              Revert
            </span>
                  }
                  </>

          </Space>
        ),
      },
  ];

  const data = [
    ...(tableContent && tableContent.data &&
        tableContent.data.map((m, ind) => ({
        key: ind + 1,
        id: ind + 1,
        name: m.name,
        version: m.version + `${tableContent.currentVersion === m.version ? "(Current)" : ""}`,
        modifiedBy: m.modifiedBy,
        modifiedDate: moment(m.modifiedDate).format("MMMM Do YYYY, h:mm:ss a"),
        commitMessage: m.commitMessage,
        actionData: {vcon: m.version, currentVersion: tableContent.currentVersion,name: m.name},
      }))),
  ];

  const getContent = async (vcon) => {
    await axios
      .get(
        `http://localhost:8081/jsonVersionFileSystem/api/fileContent/${selectedFile}/${vcon}`
      )
      .then((res) => {
        console.log(res);
        setSingleData(res.data);
        showModal();
      });
  };

  const revert = async (revertData) => {
      await axios
          .post(
              `http://localhost:8081/jsonVersionFileSystem/api/revertFileContent`,
              {name:revertData.name,version:revertData.version}
          )
          .then((res) => {
              console.log(res);
              setTableContent(res.data);
          });
  }


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


  return (
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
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default HistoryTable;
