import {React, useState} from "react";
import Locations from "../../../../../data/countryLocations";

const AddressInfo = ()=>{
    const [disctrictList, setdisctrictList] = useState([]);
    const [cityList, setcityList] = useState([]);
    const location = new Locations;
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
          <input id="af-payment-billing-address" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Street Address" />
          <input type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Apt, Syuite, Building (Optional)" />
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Zip Code" />
            <select className="py-1.5 sm:py-2 px-3 pe-9 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" onChange={(e)=>{
                const dstList = location.DistrictList(e.target.value);
                setdisctrictList(dstList);
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
            <select className="py-1.5 sm:py-2 px-3 pe-9 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" onChange={(e)=>{
                setcityList(location.CityList(e.target.value));
            }}>
            {disctrictList.map((district)=>{
                return(
                    <>
                    <option>{district}</option>
                    </>
                )
            })}
            </select>

            <select className="py-1.5 sm:py-2 px-3 pe-9 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
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
   
      <button type="button" className="py-1.5 sm:py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
        Save changes
      </button>
    </div>
  </>
    )
}

export default AddressInfo;