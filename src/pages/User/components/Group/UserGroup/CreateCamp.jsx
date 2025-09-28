import React, { useEffect, useState } from "react";
import LocationPicker from "../../Map/LocationPicker";
import Locations from "../../../../../data/countryLocations";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import API from "../../../../../api/api";
const CreateCamp = ({onCampCreated}) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const location = new Locations();
  const [selectedLocation, setSelectedLocation] = useState({ lat: null, lng: null });

  //const [provinceDropdownDisabled, setProvinceDropdownDisabled] = useState(false);
  //const [districtDropdownDisabled, setDistrictDropdownDisabled] = useState(true);
  //const [cityDropdownDisabled, setCityDropdownDisabled] = useState(false);

  const [provinceDropdownList, setProvinceDropdownList] = useState([]);
  const [districtDropdownList, setDistrictDropdownList] = useState([]);
  const [cityDropdownList, setCityDropdownList]         = useState([]);

  const [provinceSelected, setProvinceSelected] = useState("")
  const [districtSelected, setDistrictSelected] = useState("");
  const [citySelected, setCitySelected] = useState("");

  const [campName, setCampName] = useState(null);
  const [addressLineOne, setAddressLineOne] = useState("")
  const [addressLineTwo, setAddressLineTwo] = useState("")

  const formValidation = ()=>{
      const trimName = campName.trim()
        
      if(trimName === "" || trimName === null){
        toast.warning("You must enter camp name")
        return false
      }

      setCampName(trimName)

      //Check province selected.
      if(!provinceDropdownList.includes(provinceSelected)){
        toast.warning("You must select province")
        return false
      }

      //Check district is selected
      if(!districtDropdownList.includes(districtSelected)){
        toast.warning("You must select district")
        return false
      }

      if(!cityDropdownList.includes(citySelected)){
        toast.warning("You must select city")
        return false
      }

      const trimmedAddressOne = addressLineOne.trim()
     
      if(trimmedAddressOne == null || trimmedAddressOne == ""){
        toast.warning("Address one is required")
        return false
      }

      setAddressLineOne(trimmedAddressOne);

      if(selectedLocation.lat == null || selectedLocation.lng == null){
         toast.warning("Camp location is not selected")
        return false
      }

      return true;
     
  }

  const formSubmitHandle = ()=>{
    if(!formValidation()){
      return;
    }

    API.post('/camp/',{
    name:campName,
    address:{
        province:provinceSelected,
        district:districtSelected,
        city:citySelected,
        address_line1:addressLineOne,
        address_line2:addressLineTwo
    },
    location:{
        type:"Point",
        coordinates:[selectedLocation.lat, selectedLocation.lng]
    }
    },{
        headers:{
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
    }).then((camp)=>{
      const data = camp.data;
      toast.success(data.message)
      onCampCreated()
         
    }).catch((error)=>{

        if (error.response) {
            toast.error(error.response.data.message || "An error occurred");
        } else if (error.request) {
            toast.error("Cannot connect to server. Please try again later.");
        } else {
            toast.error(error.message);                
        }
        
    })
  }

  useEffect(() => {
    if (selectedLocation.lat && selectedLocation.lng) {
      console.log("Selected location in main component:", selectedLocation);
      // You can use this to send to API or update table
    }

    setProvinceDropdownList(location.ProvinceList);
    

  }, [selectedLocation]);

  return (
    

    <>
    {/* Card Section */}
<div className="max-w-full px-4 py-2 lg:px-2 lg:py-2 mx-auto">
  
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
              setCampName(e.target.value);
            }}/>
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
      
    </div>
    <LocationPicker onLocationSelect={(coords) => setSelectedLocation(coords)} />
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
      onChange={(event) => {
        setProvinceSelected(event.target.value);
        const districtList = location.DistrictList(event.target.value);
        setDistrictDropdownList(districtList);
      }}
      value={provinceSelected || provinceDropdownList[0]}
    >
      {provinceDropdownList.map((province, index) => (
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
      onChange={(event) => {
        setDistrictSelected(event.target.value);
        const cityList = location.CityList(event.target.value);
        setCityDropdownList(cityList);
      }}
      value={districtSelected || districtDropdownList[0]}
    >
      {districtDropdownList.map((district, index) => (
        <option key={index} value={district}>
          {district}
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
      onChange={(event) => setCitySelected(event.target.value)}
      value={citySelected || cityDropdownList[0]}
    >
      {cityDropdownList.map((city, index) => (
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
      onChange={(e)=>{
        setAddressLineOne(e.target.value)
      }}
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
      onChange={(e)=>{
        setAddressLineTwo(e.target.value)
      }}
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
      disabled={true}
      value={selectedLocation.lat + "   (Latitude)"}
    />
    <input
      type="text"
      className="flex-1 py-1.5 sm:py-2 px-3 pe-11 block border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
      placeholder="Longitude"
      disabled={true}
      value={selectedLocation.lng + "   (Longitude)"}
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{provinceSelected}</td>
             
            </tr>

            <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">District</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{districtSelected}</td>
              
            </tr>

            <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">City</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{citySelected}</td>
              
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

        <div className="mt-5 flex justify-center gap-x-2">
          <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          onClick={()=>{
            formSubmitHandle();
          }}>
            Create Camp
          </button>
        </div>
      </div>
    </div>
    {/* End Card */}

</div>
{/* End Card Section */}

    </>
  );
};

export default CreateCamp;
