import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import TYPE from "../enums/type.jsx";

export default function DbDataTable({type}) {
  const navigate = useNavigate();
  let {id} = useParams();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [plType, sePlType] = useState()
  const {setNotification} = useStateContext()
  
  useEffect(() => {
    convertTypeToPolish(type)
  }, [type])

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/${type}/${id}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/${type}/${user.id}`, user)
        .then(() => {
          setNotification('User was successfully updated')
          navigate(`/${plType}`)
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post(`/${type}`, user)
        .then(() => {
          setNotification('User was successfully created')
          navigate(`/${plType}`)
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
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
    <>
        <h1>Hell o o </h1>
      {/* {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
            <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
            <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
            <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div> */}
    </>
  )
}
