import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import moment from "moment";
import { Modal, Button } from "antd";
import axios from "axios";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";

const HistoryTable = ({ fileData, selectedFile }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [singleData, setSingleData] = useState({});
  useEffect(() => {
    console.log(fileData, "table files");
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
        title: "Version Content",
        dataIndex: "vcon",
        key: "vcon",
        render: (vcon) => (
          <Space size="middle">
            <span
              style={{ color: "purple", cursor: "pointer" }}
              onClick={() => getContent(vcon)}
            >
              Ver
            </span>
          </Space>
        ),
      },
  ];

  const data = [
    ...(fileData &&
      fileData.map((m, ind) => ({
        key: ind + 1,
        id: ind + 1,
        name: m.name,
        version: m.version,
        modifiedBy: m.modifiedBy,
        modifiedDate: moment(m.modifiedDate).format("MMMM Do YYYY, h:mm:ss a"),
        commitMessage: m.commitMessage,
        vcon: m.version,
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
