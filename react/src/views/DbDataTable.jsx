import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import TYPE_ENUM from '../enums/type.jsx';

export default function DbDataTable({type}) {
  const [dbData, setDbData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableData, setTableData] = useState();
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getDbData();
    handleTableHeaders(type)
  }, [])

  const onDeleteClick = data => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
      return
    }
    axiosClient.delete(`/${type}/${data.id}`)
      .then(() => {
        setNotification(`${type.substr(0, type.lastIndexOf('s'))} was successfully deleted`)
        getDbData()
      })
  }

  const getDbData = () => {
    setLoading(true)
    axiosClient.get(`/${type}`)
      .then(({ data }) => {
        setLoading(false)
        setDbData(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleTableHeaders = type => {
    switch(type) {
      case TYPE_ENUM.MECHANICS:
        setTableHeaders(['Name', 'Last Name', 'NIP', 'Phone', 'Actions'])
        break;
      case TYPE_ENUM.USERS:
        setTableHeaders(['ID', 'Name', 'Email', 'Create Date', 'Actions'])
      default:
        setTableHeaders([])
    }

  }

  const handleTableData = ( type, data ) => {
    switch(type) {
      case TYPE_ENUM.MECHANICS:
        return (
          <>
           <td>{data.name}</td>
            <td>{data.last_name}</td>
            <td>{data.nip}</td>
            <td>{data.phone}</td>
          </>
        )
        break;
      default: 
          <></>
    }
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>{type}</h1>
        <Link className="btn-add" to={`/${type}/new`}>Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            {tableHeaders.map(th => (
              <th>{th}</th>
            ))}
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {dbData.map(u => (
              <tr key={u.id}>
                {handleTableData(type, u)}
                <td>
                  <Link className="btn-edit" to={`/${type}/` + u.id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
