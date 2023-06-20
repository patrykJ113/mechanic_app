import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import TYPE from "../enums/type.jsx";

export default function DbDataTable({type}) {
  const navigate = useNavigate();
  let {id} = useParams();

  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mechanics, setMechanics] = useState([])
  const [offers, setOffers] = useState([])
  const [plType, sePlType] = useState()
  const [data, setData] = useState({
    id: null,
    mechanic_id: null,
    offer_id: null,
    mechanic: {
      id: null
    },
    offer: {
      id: null
    }
  })

  const {setNotification} = useStateContext()

  useEffect(() => {
    setDataBasedOnType(type)
  },[type])

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/${type}/${id}`)
      .then(({data}) => {
        setLoading(false)
        type === TYPE.ORDERS ? setData(data.data) : setData(data[0])
      })
      .catch(e => {
        setLoading(false)
      })
    }, [])
  }
    
  if(type === TYPE.ORDERS) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get('/mechanics')
      .then(({data}) => {
        setMechanics(data)

        axiosClient.get('/offers')
        .then(({data}) => {
          setOffers(data)
          setLoading(false)
        })
        .catch( e => {
          console.log(e)
          setLoading(false)
        })
        
      })
      .catch( e => {
        setLoading(false)
        console.log(e)
      })

    },[type])
  }
    

  const onSubmit = ev => {
    ev.preventDefault()
    if (data.id) {
      axiosClient.put(`/${type}/${data.id}`, data)
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
        axiosClient.post(`/${type}`, data)
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

  const setDataBasedOnType = type => {
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
      {data.id && <h1>Update User: {data.name}</h1>}
      {!data.id && <h1>New User</h1>}
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
            {
              type === TYPE.MECHANICS ?
              (
                <>
                  <input 
                    value={data.name} 
                    onChange={ev => setData({...data, name: ev.target.value})} 
                    placeholder="Name"
                  />
                  <input 
                    value={data.last_name} 
                    onChange={ev => setData({...data, last_name: ev.target.value})} 
                    placeholder="Last name"
                  />
                  <input 
                    value={data.phone} 
                    onChange={ev => setData({...data, phone: ev.target.value})} 
                    placeholder="Phone"
                  />
                  <input 
                    value={data.nip} 
                    onChange={ev => setData({...data, nip: ev.target.value})} 
                    placeholder="Nip"
                  />
                </>
              ) : ''
            }
            {
              type === TYPE.OFFERS ?
              (
                <>
                  <input 
                    value={data.name} 
                    onChange={ev => setData({...data, name: ev.target.value})} 
                    placeholder="Offer name"
                  />
                  <input 
                    value={data.price} 
                    onChange={ev => setData({...data, price: ev.target.value})} 
                    placeholder="Offer price"
                  />
                </>
              ) : ''
            }
            {
              type === TYPE.ORDERS &&
              (
                <>    
                  <select 
                    value={data.mechanic_id} 
                    onChange={ev => setData({...data, mechanic_id: ev.target.value})}>
                      {mechanics.map( mechanic => (
                        <option value={mechanic.id}>{mechanic.name}</option>
                      ))}
                  </select>
                  <select 
                    value={data.offer_id} 
                    onChange={ev => setData({...data, offer_id: ev.target.value})}>
                      {offers.map( offer => (
                        <option value={offer.id}>{offer.name}</option>
                      ))}
                  </select>
                  <input 
                    type="date"
                    value={data.date} 
                    onChange={ev => setData({...data, date: ev.target.value})} 
                  />
                </>
              )
            }
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
