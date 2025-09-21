import {React, useState, useEffect} from "react";
import Locations from "../../../../../data/countryLocations";
import {useReactTable,getCoreRowModel,getPaginationRowModel,flexRender} from "@tanstack/react-table";

import API from '../../../../../api/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';



const SearchDonors = ()=>{
  const accessToken = useSelector((state) => state.auth.accessToken);
   
  const loadData = (province, district, city, gender, age)=>{
    API.get(`donor/search?province=${province}&district=${district}&city=${city}&gender=${gender}&age=${age}`,{
          headers:{
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
    }).then((application)=>{

        const donors_data = application.data.data;
        toast.success(application.data.message)
        const tableData = []
        
        donors_data.forEach(donor => {
            
          const filter = {
              nic:donor.nic,
              email: donor.email,
              name_with_initials: donor.name_with_initials,
              gender: donor.gender,
              address_line1: donor.address.address_line1,
              province: donor.address.province,
              district: donor.address.district,
              city: donor.address.city,
              zip: donor.address.postal_code,
            }
            tableData.push(filter);
        });
        if(tableData,length == 0){
          setData([]);
        }
        setData(tableData);
        
        
    }).catch((error)=>{
      
      setData([])
      if (error.response) {
   
        toast.error(error.response.data.message || "An error occurred");
      } else if (error.request) {
        toast.error("Cannot connect to server. Please try again later.");
      } else {
        toast.error(error.message);
                     
      }

     
    })
  }


  const locations = new Locations();

  const handleProvinceSelect = (event)=>{
        const selected = event.target.value;
        
        setSelectedProvince(selected);
        if(selected == "Any"){
          setSelectDistrict("Any");
          setSelectCity("Any");
          setCityList([]);
          setDistrictList([]);
          setCityListEnable(true)
          setDistrictListEnable(true);
          return;
        }


        const districtList = locations.DistrictList(selected);
        setDistrictList(districtList)
        setSelectDistrict(districtList[0])
        setDistrictListEnable(false)

}

const handleDistrictSelect = (event)=>{

  const selected = event.target.value;

  if(selected == "Any"){
    setSelectDistrict(selected)
    setCityList([])
    setSelectCity("Any")
    setCityListEnable(true)
    return;
  }

  setCityList(locations.CityList(selected));
  setSelectDistrict(selected)
  setCityListEnable(false)
   
}

const handleCitySelect = (event)=>{
  const selected = event.target.value;
  setSelectCity(selected)
}

const submitSearch = ()=>{
  const province = selectedProvince;
  const district = selectDistrict;
  const city = selectCity;
  const gender = selectGender;
  const age = selectAge;

  loadData(province, district, city, gender, age)

  console.log(province, district, city,gender, age)
  
}

const handleGenderSelect = (event)=>{
     const selected = event.target.value;
     setSelectGender(selected);
}

const handleAgeSelect = (event)=>{
    const selected = event.target.value;
    setSelectAge(selected);
}
const agelist =()=>{
  let list=[];
  for (let index = 18; index <= 60; index++) {
    list.push(index)
    
  }
  return list;

}
  const [data, setData] = useState([]);
  const [provinceList, setProvinceList] = useState([])
  const [districtList, setDistrictList] = useState([])
  const [cityList, setCityList] = useState([])
  const [ageList, setAgeList] = useState([])

  const [districtListEnable, setDistrictListEnable]  = useState(true);
  const [cityListEnable, setCityListEnable] = useState(true)

  const [selectedProvince, setSelectedProvince] = useState("Any");
  const [selectDistrict, setSelectDistrict] = useState("Any");
  const [selectCity, setSelectCity] = useState("Any");
  const [selectGender, setSelectGender] = useState("Any");
  const [selectAge, setSelectAge] = useState("Any");

 
    useEffect(()=>{
      setProvinceList(locations.provinceList)
      setAgeList(agelist());
      //loadData();
    },[])

    const columns = [
      {header: "NIC",accessorKey: "nic"},
      {header:"Email",accessorKey:"email"},
      {header: "Name",accessorKey: "name_with_initials"},
      {header: "Gender",accessorKey: "gender",},
      {header: "Address",accessorKey: "address_line1"},
      {header:"Province",accessorKey:"province"},
      {header:"District",accessorKey:"district"},
      {header:"City",accessorKey:"city"},
      {header:"Post",accessorKey:"zip"}
    ];
      const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        
      });

      const gnderTypes = [ "Any", "Male", "Female", "Other"]
    return (
  <>
    {/* First Row: Province, District, City, Show Button */}
    <div className="flex flex-col md:flex-row flex-wrap gap-4">
      {/* Province */}
      <div className="relative flex-1 w-full md:w-auto">
        <select
          defaultValue="Any"
          className="peer p-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2  bg-blue-100"
          onChange={(e) => {
            handleProvinceSelect(e);
          }}
        >
          <option value="Any">Any</option>
          {provinceList.map((province, index) => (
            <option key={index} value={province}>
              {province}
            </option>
          ))}
        </select>
        <label className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">
          Province
        </label>
      </div>

      {/* District */}
      <div className="relative flex-1 w-full md:w-auto">
        <select
          className="peer p-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  bg-blue-100
            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          disabled={districtListEnable}
          onChange={(e) => {
            handleDistrictSelect(e);

          }}
        >
          <option value="Any">Any</option>
          {districtList.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
        <label className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">
          District
        </label>
      </div>

      {/* City */}
      <div className="relative flex-1 w-full md:w-auto">
        <select
          className="peer p-4 pe-9 block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2  bg-blue-100"
          disabled={cityListEnable}
          onChange={(e) => {
            handleCitySelect(e);
          }}
        >
          <option value="Any">Any</option>
          {cityList.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <label className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">
          City
        </label>
      </div>


    </div>

    {/* Second Row: Gender, Age */}
    <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-4">
      {/* Gender */}
      <div className="relative flex-1 w-full md:w-auto">
        <select
          className="peer p-4 pe-9 block w-full bg-blue-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
        onChange={(e)=>{
          handleGenderSelect(e);
         
        }}>
         
          {gnderTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        <label className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">
          Gender
        </label>
      </div>

      {/* Age */}
      <div className="relative flex-1 w-full md:w-auto">
           <select
          className="peer p-4 pe-9 block w-full bg-blue-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
        
        onChange={(e)=>{
          handleAgeSelect(e);
        }}>
          <option>Any</option>
          {ageList.map((age, index) => (
            <option key={index} value={age} >
              {age}
            </option>
          ))}
         
        </select>
        <label className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">
          Age
        </label>
      </div>
      {/* Show Button */}
      <button className="inline-flex items-center px-5 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 w-full md:w-auto" onClick={()=>{
        submitSearch()
      }}>
        🔍 Search
      </button>
    </div>



          {/* Thread Row:*/}
    <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-4">
      {/* Gender */}
              <div className="relative flex-1 w-full md:w-auto">
                <div className="hs-tooltip flex items-center gap-x-3">
          <label htmlFor="hs-tooltip-example" className="hs-tooltip-toggle relative inline-block w-11 h-6 cursor-pointer">
            <input type="checkbox" id="hs-tooltip-example" className="peer sr-only" />
            <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-blue-600 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
            <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
          </label>
          <label htmlFor="hs-tooltip-example" className="text-sm text-gray-500">Age range selector</label>
          
          
        </div>

        {/* min range - start */}
          {/* Input Number */}
          <div
            className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg mt-2"
            data-hs-input-number
          >
            <div className="flex items-center gap-x-1.5">
              {/* Decrement button */}
              <button
                type="button"
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                tabIndex={-1}
                aria-label="Decrease"
                data-hs-input-number-decrement
              >
                <svg
                  className="shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                </svg>
              </button>

              {/* Input field */}
              <input
                className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                style={{ MozAppearance: "textfield" }}
                type="number"
                aria-roledescription="Number field"
                defaultValue={0}
                data-hs-input-number-input
              />

              {/* Increment button */}
              <button
                type="button"
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                tabIndex={-1}
                aria-label="Increase"
                data-hs-input-number-increment
              >
                <svg
                  className="shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </button>
            </div>
          </div>
          {/* End Input Number */}

        {/* max range - end */}

        {/* max range - start */}
        {/* Input Number */}
          <div
            className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg mt-2"
            data-hs-input-number
          >
            <div className="flex items-center gap-x-1.5">
              {/* Decrement button */}
              <button
                type="button"
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                tabIndex={-1}
                aria-label="Decrease"
                data-hs-input-number-decrement
              >
                <svg
                  className="shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                </svg>
              </button>

              {/* Input field */}
              <input
                className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                style={{ MozAppearance: "textfield" }}
                type="number"
                aria-roledescription="Number field"
                defaultValue={0}
                data-hs-input-number-input
              />

              {/* Increment button */}
              <button
                type="button"
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                tabIndex={-1}
                aria-label="Increase"
                data-hs-input-number-increment
              >
                <svg
                  className="shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </button>
            </div>
          </div>
          {/* End Input Number */}

        {/* max range - end */}
        
      </div>

      {/* Age */}
      <div className="relative flex-1 w-full md:w-auto">
          
      </div>
      {/* Show Button */}
     
    </div>







    <div className="flex flex-col mt-5">
      <div className="-m-1.5 overflow-x-auto">
      <div className="p-1.5 min-w-full inline-block align-middle">
        <div className="overflow-hidden">
      <table className="min-w-full divide-y bg-green-50 divide-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-3 text-start text-xl font-extrabold text-green-500 uppercase align-middle">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-red-50 cursor-pointer">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}
                className="px-6 py-4 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-green-400 text-sm font-bold text-gray-500 hover:bg-green-500 disabled:opacity-50"
        >
          ⏮ First
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          ◀ Prev
        </button>
        <span>
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next ▶
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-green-400 text-sm font-bold text-gray-500 hover:bg-green-500 disabled:opacity-50"
        >
          Last ⏭
        </button>

        {/* Page size selector */}
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="border rounded p-1"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
      </div>
      </div>
      </div>
  </>
);

}

export default SearchDonors;