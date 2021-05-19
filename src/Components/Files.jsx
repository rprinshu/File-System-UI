import React,{useEffect,useState} from 'react'
import { Breadcrumb } from "antd";
import {Link} from 'react-router-dom'
import axios from "axios";


const Files = () => {
    const [files,setfiles] = useState([])
    useEffect(() => {
        connect()
    },[]);

    const connect = async () => {
        await axios.get('http://localhost:8081/jsonVersionFileSystem/api/fetchFileNames')
            .then((res) => {
                console.log(res,"response")
                setfiles(res.data)
            });
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
              <Link to="/fetch/files">Files</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          </div>
      <div className="files-cont">
          {
              files.length>0 && files.map((m,ind)=>(<span key={ind} className="files-data">{ind+1}{"."}{" "}{m.name}</span>))
          }
      </div>
           
        </div>
    )
}

export default Files
