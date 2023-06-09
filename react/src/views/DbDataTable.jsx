import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import confirmationMsg from '../utils/confirmationMsg.jsx'
import TYPE from '../enums/type.jsx';

export default function DbDataTable({type}) {
  const [dbData, setDbData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()
  const [plType, sePlType] = useState()

  useEffect(() => {
    getDbData();
    handleTableHeaders(type)
    convertTypeToPolish(type)
  }, [type])

  const onDeleteClick = data => {
    if (!window.confirm(confirmationMsg(type, data).beforeDelete)) {
      return
    }
    axiosClient.delete(`/${type}/${data.id}`)
      .then(() => {
        setNotification(confirmationMsg(type, data).delete)
        getDbData()
      })
  }

  const getDbData = () => {
    setLoading(true)
    axiosClient.get(`/${type}`)
      .then(({ data }) => {
        type === TYPE.ORDERS ? setDbData(data.data) : setDbData(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleTableHeaders = type => {
    switch(type) {
      case TYPE.MECHANICS:
        setTableHeaders(['Imie', 'Nazwisko', 'NIP', 'Telefon', 'Akcje'])
        break;
      case TYPE.ORDERS:
        setTableHeaders(['Nr. Zlecenia','Mechanik', 'zadanie', 'Data', 'Akcje'])
        break;
      case TYPE.OFFERS:
        setTableHeaders(['Nazwa', 'Cena', 'Akcje'])
        break;
      default:
        setTableHeaders([])
    }

  }

  const handleTableData = ( type, data ) => {
    switch(type) {
      case TYPE.MECHANICS:
        return (
          <>
            <td>{data.name}</td>
            <td>{data.last_name}</td>
            <td>{data.nip}</td>
            <td>{data.phone}</td>
          </>
        )
        break;
      case TYPE.ORDERS:
        return (
          <>
            <td>{data.id}</td>
            <td>{data.mechanic?.name}</td>
            <td>{data.offer?.name}</td>
            <td>{data.date}</td>
          </>
        )
        break;
      case TYPE.OFFERS: 
        return (
          <>
            <td>{data.name}</td>
            <td>{data.price}</td>
          </>
        )
        break;
      default: 
          <></>
    }
  }

  const convertTypeToPolish = type => {
    switch(type) {
        case TYPE.MECHANICS:
            sePlType('mechanicy')
        break;
        case TYPE.OFFERS:
            sePlType('oferty')
        break;
        case TYPE.ORDERS:
            sePlType('zlecenia')
        break;
        default:
            sePlType('')
    }
  }


  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>{plType}</h1>
        <Link className="btn-add" to={`/${plType}/new`}>Dodaj nowy</Link>
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
                ładuję...
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
                  <Link className="btn-edit" to={`/${plType}/` + u.id}>Edytuj</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Usuń</button>
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
