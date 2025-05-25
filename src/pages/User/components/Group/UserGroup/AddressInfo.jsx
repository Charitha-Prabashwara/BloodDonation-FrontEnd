import {React, useState, useEffect} from "react";
import Locations from "../../../../../data/countryLocations";
import { toast } from "react-toastify";
import API from "../../../../../api/api";
import { useSelector } from 'react-redux';
const AddressInfo = ()=>{
    const accessToken = useSelector((state) => state.auth.accessToken);

    const [disctrictList, setdisctrictList] = useState([]);
    const [cityList, setcityList] = useState([]);
    const location = new Locations;

    const [addressLine1, setaddressLine1] = useState('');
    const [addressLine2, setaddressLine2] = useState('');
    const [zipCode, setzipCode] = useState('')

    const [dataprovince, setdataprovince] = useState('');
    const [datadistrict, setdatadistrict] = useState('');
    const [datacity, setdatacity] = useState('');

    const loadFields =()=>{
            API.get('/user/profile/',{
              headers:{
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              }
            }).then((profileData)=>{
    
              console.log(profileData)
              const {address} = profileData.data.data;
              
              setaddressLine1(address.address_line1);
              setaddressLine2(address.address_line2)
              setzipCode(address.postal_code)

              setdataprovince(address.province)
              setdatadistrict(address.district)
              setdatacity(address.city)

              //setsaveBTNActive(true);
            }).catch((error)=>{
              // Handles API error and backend-down (network) errors
             //setsaveBTNActive(false)
            if (error.response) {
                // Server responded with a status code outside 2xx
                toast.error(error.response.data.message || "An error occurred");
            } else if (error.request) {
                // Request was made but no response (e.g., backend is down)
                toast.error("Cannot connect to server. Please try again later.");
            } else {
                // Something else went wrong
                toast.error(error.message);
               
            }
            })
        }

    const saveData = ()=>{
       API.put('/user/profile/',{
           address:{
            province:dataprovince,
            district:datadistrict,
            city:datacity,
            postal_code:zipCode,
            address_line1:addressLine1,
            address_line2:addressLine2
           }
          
       },{
          headers:{
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }).then((response)=>{
          const {message} = response.data;
          toast.success(message)
        }).catch((error)=>{
           // Handles API error and backend-down (network) errors
        
        if (error.response) {
            // Server responded with a status code outside 2xx
            toast.error(error.response.data.message || "An error occurred");
        } else if (error.request) {
            // Request was made but no response (e.g., backend is down)
            toast.error("Cannot connect to server. Please try again later.");
        } else {
            // Something else went wrong
            toast.error(error.message);
           
        }
        })
    }
    useEffect(()=>{
      loadFields()
    },[])
    return(
        <>
     <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800">
        Address Information
      </h2>
      <p className="text-sm text-gray-600">
        Manage your name, password and account settings.
      </p>
    </div>
   <form>
      

      {/* Section */}
      <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
       

        <div className="mt-2 space-y-3">
          <input id="af-payment-billing-address" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Street Address" value={addressLine1} onChange={(e)=>{
            setaddressLine1(e.target.value)
          }}/>
          <input type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Apt, Syuite, Building (Optional)" value={addressLine2} onChange={(e)=>{
            setaddressLine2(e.target.value)
          }}/>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Zip Code" value={zipCode} onChange={(e)=>{
              setzipCode(e.target.value)
            }}/>
            <select className="py-1.5 sm:py-2 px-3 pe-9 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" value={dataprovince}onChange={(e)=>{
                const dstList = location.DistrictList(e.target.value);
                setdisctrictList(dstList);
                setdataprovince(e.target.value)
            }}>
                {
                    location.ProvinceList.map((province)=>{
                        return(
                            <>
                            <option>{province}</option>
                            </>
                        )
                    })
                    
                }
              
            </select>
            <select className="py-1.5 sm:py-2 px-3 pe-9 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" value={datadistrict} onChange={(e)=>{
                setcityList(location.CityList(e.target.value));
                setdatadistrict(e.target.value)
            }}>
            {disctrictList.map((district)=>{
                return(
                    <>
                    <option>{district}</option>
                    </>
                )
            })}
            </select>

            <select className="py-1.5 sm:py-2 px-3 pe-9 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" value={datacity} onChange={(e)=>{
              setdatacity(e.target.value)
            }}>
            {cityList.map((city)=>{
                return(
                    <>
                    <option>{city}</option>
                    </>
                )
            })}
            </select>
          </div>
        </div>
      </div>
      {/* End Section */}

    </form>

     <div className="mt-5 flex justify-end gap-x-2">
   
      <button type="button" className="py-1.5 sm:py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" onClick={()=>{
        saveData()
      }}>
        Save changes
      </button>
    </div>
  </>
    )
}

export default AddressInfo;