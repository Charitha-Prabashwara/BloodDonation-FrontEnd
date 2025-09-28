import React, { useState, useRef, useEffect } from "react";
import API from '../../../../../api/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LocationPicker from "../../Map/LocationPicker";
import Locations from "../../../../../data/countryLocations";
const CampComboBox = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const locationData = new Locations();

  const [allCampData, setAllCampData] = useState([]); // all camps from API
  const [inputValue, setInputValue] = useState("");     // input text
  const [open, setOpen] = useState(false);             // dropdown open state
  const ref = useRef(null);

  const [selectedCamp, setSelectedCamp] = useState(null)
  const [campName, setCampName] = useState("")
  const [districtList, setDistrictList] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [cityList, setCityList] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [addressLineOne, setAddressLineOne] = useState(null)
  const [addressLineTwo, setAddressLineTwo] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState({lat:7.8731, lng: 80.7718});

  const [enableBtnText, setEnableBtnText] = useState("click to enable update")
  

  //const selectedProvinceCombo = useRef(null);
  
  const [enableUpdate, setEnableUpdate] = useState(false)// container ref

   const loadtoChange = (camp)=>{
     
     setSelectedCamp(camp)
     setCampName(camp.name)
     setSelectedProvince(camp.address.province)
    
     setDistrictList(locationData.DistrictList(camp.address.province))
     setSelectedDistrict(camp.address.district)
    

     setCityList(locationData.CityList(camp.address.district))
     setSelectedCity(camp.address.city)
     

     setAddressLineOne(camp.address.address_line1)

     let coordinate = camp.location.coordinates;
     
     setSelectedLocation({
      lat: coordinate[0],
      lng: coordinate[1]
     })

     
    
  }
  // Load all camps from API
  useEffect(() => {
    console.log(selectedLocation);
    
    const loadAllCampData = async () => {
      try {
        const res = await API.get("/camp/", {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        });
        // API might return data in res.data.data or res.data
        const dataArray = res.data.data || res.data;
        if (Array.isArray(dataArray)) {
          setAllCampData(dataArray);
          toast.success("Camps loaded successfully");
        } else {
          toast.error("Invalid data format from server");
        }
      } catch (err) {
        if (err.response) toast.error(err.response.data.message || "Error fetching camps");
        else if (err.request) toast.error("Cannot connect to server");
        else toast.error(err.message);
      }
    };

    loadAllCampData();

    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [accessToken, selectedCamp]);

  // Filter camps based on input
  const filtered = allCampData.filter(camp =>
    camp.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
    camp.address?.city?.toLowerCase().includes(inputValue.toLowerCase()) ||
    camp.address?.address_line1?.toLowerCase().includes(inputValue.toLowerCase())
  );


  const updateCamp = async()=>{
     try {
        const res = await API.put(`/camp/${selectedCamp._id}`,{
          name: campName,
          address:{
            province: selectedProvince,
            district: selectedDistrict,
            city: selectedCity,
            address_line1: addressLineOne,
            address_line2: addressLineTwo
          },
          location:{
            coordinates:[selectedLocation.lat, selectedLocation.lng]
          }
        }, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        });
        // API might return data in res.data.data or res.data
        const data = res.data;
        toast.success(data.message)
        console.log(data)
      } catch (err) {
        if (err.response) toast.error(err.response.data.message || "Error fetching camps");
        else if (err.request) toast.error("Cannot connect to server");
        else toast.error(err.message);
      }
  }
 

  return (
    <>
    <div className="relative w-full max-w-sm" ref={ref}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search camp..."
        className="py-1.5 sm:py-2 px-3 pe-9 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm 
                 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
      />

      {open && filtered.length > 0 && (
        <div className="absolute z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto">
          {filtered.map((camp) => (
            <div
              key={camp._id}
              className="px-3 py-2 cursor-pointer hover:bg-green-100"
              onClick={() => {
                loadtoChange(camp)
                setOpen(false); 
              }}
            >
             <div className="text-lg">{camp.name}</div><div className="px-3 text-sm">{camp.address?.city}, {camp.address?.province}</div>
            </div>
          ))}
        </div>
      )}

      {open && filtered.length === 0 && (
        <div className="absolute z-50 w-full max-h-72 p-2 bg-white border border-gray-200 rounded-lg text-gray-500">
          No results found
        </div>
      )}
    </div>



    {/* DATA SHOW START */}
    {/* Card Section */}

  <form>
    {/* Card */}
   


      <div className="pt-0 p-4 sm:pt-0 sm:p-7">
        {/* Grid */}
        <div className="space-y-4 sm:space-y-6">
    <div className="space-y-2">
  <div className="flex items-center mt-5">
    <label htmlFor="hs-small-switch-with-icons" className="flex items-center cursor-pointer">
      {/* Switch */}
      <div className="relative inline-block w-11 h-6 mr-3">
        <input
          type="checkbox"
          id="hs-small-switch-with-icons"
          className="peer sr-only"
          onClick={() => {
            if(enableUpdate){
              setEnableBtnText("Click to enable update options")
            }else{
              setEnableBtnText("Click to disable update options")
            }
            setEnableUpdate(!enableUpdate)
          }
        }
          disabled={!selectedCamp}
        />
        <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-blue-600 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
        <span className="absolute top-1/2 start-0.5 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
        {/* Left Icon (Off) */}
        <span className="absolute top-1/2 start-0.5 -translate-y-1/2 flex justify-center items-center w-5 h-5 text-gray-500 peer-checked:text-white transition-colors duration-200">
          <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </span>
        {/* Right Icon (On) */}
        <span className="absolute top-1/2 end-0.5 -translate-y-1/2 flex justify-center items-center w-5 h-5 text-gray-500 peer-checked:text-blue-600 transition-colors duration-200">
          <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
      </div>
      {/* Label text on right */}
      <span className="text-gray-800 select-none text-sm">{enableBtnText}</span>
    </label>
  </div>
</div>


            
        <>
              {/* Card */}
    <div className="bg-white rounded-xl shadow-xs">
 

      <div className="pt-0 p-4 sm:pt-0 sm:p-7">
        {/* Grid */}
        <div className="space-y-4 sm:space-y-6">


          <div className="space-y-2">
            <label htmlFor="af-submit-app-project-name" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
              Camp name
            </label>

            <input id="af-submit-app-project-name" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter camp name" 
            value={campName}
            onChange={(e)=>{
              setCampName(e.target.value)
            }}
            disabled={!enableUpdate}
            />
          </div>

          <div className="space-y-2">
        

          </div>

   <div className="space-y-2 relative">
  <label
    htmlFor="af-submit-app-upload-images"
    className="inline-block text-sm font-medium text-gray-800 mt-2.5"
  >
    Pin camp location
  </label>

  <div className="relative z-0 bg-green-200 py-3 px-3 rounded-2xl"> 
    {/* Ensure map stays below navbar */}
    <div className="rounded-2xl">
      {/* <LocationPicker initialCoords={selectedLocation} onLocationSelect={(coords) => setSelectedLocation(coords)} /> */}
    <LocationPicker
  initialCoords={{lat:selectedLocation.lat ||7.8731, lng:selectedLocation.lng || 80.7718 }} // Colombo
  onLocationSelect={(coords) => setSelectedLocation(coords)}
  disabled={!enableUpdate}
/>
    </div>
    
  </div>
</div>

          {/* Province / District / City in one row */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  {/* Province */}
  <div className="space-y-2">
    <label htmlFor="province" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
      Province
    </label>
    <select
      id="province"
      className="py-1.5 sm:py-2 px-3 pe-9 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm 
                 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
      onChangeCapture={(e)=>{
        
        setSelectedProvince(e.target.value)
        setDistrictList(locationData.DistrictList(e.target.value))
        
      }}
      value={selectedProvince}
      disabled={!enableUpdate}
    >
      {locationData.provinceList.map((province, index) => (
        <option key={index} value={province}>
          {province}
        </option>
      ))}
    </select>
  </div>

  {/* District */}
  <div className="space-y-2">
    <label htmlFor="district" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
      District
    </label>
    <select
      id="district"
      className="py-1.5 sm:py-2 px-3 pe-9 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm 
                 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
     onChangeCapture={(e)=>{
        setSelectedDistrict(e.target.value);
        setCityList(locationData.CityList(e.target.value))
     }}
      value={selectedDistrict}
      disabled={!enableUpdate}
    >
     {districtList.map((dist, index) => (
        <option key={index} value={dist}>
          {dist}
        </option>
      ))}
    </select>
  </div>

  {/* City */}
  <div className="space-y-2">
    <label htmlFor="city" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
      City
    </label>
    <select
      id="city"
      className="py-1.5 sm:py-2 px-3 pe-9 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm 
                 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
      
      value={selectedCity}
      disabled={!enableUpdate}
    >
       {cityList.map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
    </select>
  </div>
</div>


        {/* Address Line 1 & 2 in one row */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {/* Address Line 1 */}
  <div className="space-y-2">
    <label
      htmlFor="address-line-1"
      className="inline-block text-sm font-medium text-gray-800 mt-2.5"
    >
      Address-Line One
    </label>
    <input
      id="address-line-1"
      type="text"
      className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs 
                 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 
                 disabled:opacity-50 disabled:pointer-events-none"
      placeholder="Address line one"
      value={addressLineOne}
      onChangeCapture={(e)=>{
        setAddressLineOne(e.target.value);
      }}
      disabled={!enableUpdate}
    
    />
  </div>

  {/* Address Line 2 */}
  <div className="space-y-2">
    <label
      htmlFor="address-line-2"
      className="inline-block text-sm font-medium text-gray-800 mt-2.5"
    >
      Address-Line Two
    </label>
    <input
      id="address-line-2"
      type="text"
      className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs 
                 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 
                 disabled:opacity-50 disabled:pointer-events-none"
      placeholder="Optional"
      value={addressLineTwo}
      onChangeCapture={(e)=>{
        setAddressLineTwo(e.target.value)
      }}
      disabled={!enableUpdate}
     
     
    />
  </div>
</div>

<div className="space-y-2">
  <label className="inline-block text-sm font-medium text-gray-800 mt-2.5">
    GEO Coordinates
  </label>

  <div className="flex flex-col sm:flex-row gap-2">
    <input
      type="text"
      className="flex-1 py-1.5 sm:py-2 px-3 pe-11 block border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
      placeholder="Latitude"
      value={selectedLocation.lat}
      disabled={true}
    />
    <input
      type="text"
      className="flex-1 py-1.5 sm:py-2 px-3 pe-11 block border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
      placeholder="Longitude"
      value={selectedLocation.lng}
      disabled={true}
     
    />
  </div>
</div>

<div>
  <div className="flex flex-col">
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle">
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Field</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Selected value</th>
            
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Province</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{selectedProvince}</td>
             
            </tr>

            <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">District</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{selectedDistrict}</td>
              
            </tr>

            <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">City</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{selectedCity}</td>
              
            </tr>

            <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Address Line One</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{addressLineOne}</td>
           
            </tr>

            <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Address Line Two</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{addressLineTwo}</td>
          
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</div>

          
        </div>
        {/* End Grid */}

        <div className="mt-5 flex justify-end gap-x-2">
          <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          disabled={!enableUpdate}
          onClick={async()=>{
            await updateCamp()
          }}
          >
            Save changes
          </button>

           <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-yellow-500 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          disabled={!enableUpdate}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    {/* End Card */}       
        </>
           


        </div>
        {/* End Grid */}

      
      </div>
  
    {/* End Card */}
  </form>

{/* End Card Section */}
    {/* DATA SHOW END */}



    

   </>
  );
};

export default CampComboBox;
