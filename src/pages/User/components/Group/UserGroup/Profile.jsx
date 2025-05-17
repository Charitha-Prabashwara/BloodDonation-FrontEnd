//import { tab } from "@material-tailwind/react";
import {React, useState, useEffect} from "react";
import API from "../../../../../api/api";


const Profile=()=>{
   
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [fullName, setfullName] = useState('');
    const [nameWithInitials, setnameWithInitials] = useState('');
    const [nic, setnic] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [gender, setgender] = useState('') 


    useEffect(()=>{
     
      // API.get('/user/profile/',{
      //   headers:{
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json', // Optional, but recommended
      //   }
      // })
    })

    return(
       <>
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800">
        Profile
      </h2>
      <p className="text-sm text-gray-600">
        Manage your name, password and account settings.
      </p>
    </div>

    <form>
      {/* Grid */}
      <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
        <div className="sm:col-span-3">
          <label className="inline-block text-sm text-gray-800 mt-2.5">
            Profile photo
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <div className="flex items-center gap-5">
            <img className="inline-block size-16 rounded-full ring-2 ring-white" src="https://preline.co/assets/img/160x160/img1.jpg" alt="Avatar" />
            <div className="flex gap-x-2">
              <div>
                <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50">
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                  Upload photo
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End Col */}

        

        <div className="sm:col-span-3">
          <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5">
            First Name
          </label>
          <div className="hs-tooltip inline-block">
            <svg className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs" role="tooltip">
              Displayed on public forums, such as Preline
            </span>
          </div>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <input id="af-account-full-name" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg sm:text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
            value={firstName}
            onChange={(e)=>{setfirstName(e.target.value.toLocaleUpperCase())}} />
            
          </div>
        </div>
        {/* End Col */}

                <div className="sm:col-span-3">
          <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5">
            Last name
          </label>
          <div className="hs-tooltip inline-block">
            <svg className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs" role="tooltip">
              Displayed on public forums, such as Preline
            </span>
          </div>
        </div>
        {/* End Col */}

        

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <input id="af-account-full-name" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg sm:text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
            value={lastName}
            onChange={(e)=>{setlastName(e.target.value.toLocaleUpperCase())}} />
            
          </div>
        </div>
        {/* End Col */}

         <div className="sm:col-span-3">
          <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5">
            Full name
          </label>
          <div className="hs-tooltip inline-block">
            <svg className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs" role="tooltip">
              Displayed on public forums, such as Preline
            </span>
          </div>
        </div>
        {/* End Col */}

        

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <input id="af-account-full-name" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg sm:text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
            value={fullName}
            onChange={(e)=>{setfullName(e.target.value.toLocaleUpperCase())}} />
            
          </div>
        </div>
        {/* End Col */}

                 <div className="sm:col-span-3">
          <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5">
            Name with initials
          </label>
          <div className="hs-tooltip inline-block">
            <svg className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs" role="tooltip">
              Displayed on public forums, such as Preline
            </span>
          </div>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <input id="af-account-full-name" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg sm:text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none"  
            value={nameWithInitials}
            onChange={(e)=>{setnameWithInitials(e.target.value.toLocaleUpperCase())}}/>
           
          </div>
        </div>
        {/* End Col */}

                <div className="sm:col-span-3">
          <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5">
            NIC
          </label>
          <div className="hs-tooltip inline-block">
            <svg className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs" role="tooltip">
              Displayed on public forums, such as Preline
            </span>
          </div>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <input id="af-account-full-name" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg sm:text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            value={nic}
            onChange={(e)=>{
                if((e.target.value.match(/[^0-9vV]/g))|| e.target.value.length > 12){
                    return
                }
                    setnic(e.target.value.toUpperCase())
       
                
            }} />
            
          </div>
        </div>
        {/* End Col */}


        <div className="sm:col-span-3">
          <div className="inline-block">
            <label htmlFor="af-account-phone" className="inline-block text-sm text-gray-800 mt-2.5">
              Phone
            </label>
            <span className="text-sm text-gray-400">
              (Optional)
            </span>
          </div>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <input id="af-account-phone" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg sm:text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="+x(xxx)xxx-xx-xx" 
            value={phoneNumber}
            onChange={(e)=>{
                 if((e.target.value.match(/[^0-9]/g))|| e.target.value.length > 10){
                    return
                }
                setphoneNumber(e.target.value)
            }
            }/>
           
          </div>

 
        </div>
        {/* End Col */}

        <div className="sm:col-span-3">
          <label htmlFor="af-account-gender-checkbox" className="inline-block text-sm text-gray-800 mt-2.5">
            Gender
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <label htmlFor="af-account-gender-checkbox" className="flex py-2 px-3 w-full border border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <input type="radio" name="af-account-gender-checkbox" className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" id="af-account-gender-checkbox" checked={gender=== 'male'} 
              onClick={()=>{
                setgender('male')
              }}/>
              <span className="sm:text-sm text-gray-500 ms-3">Male</span>
            </label>

            <label htmlFor="af-account-gender-checkbox-female" className="flex py-2 px-3 w-full border border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <input type="radio" name="af-account-gender-checkbox" className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" id="af-account-gender-checkbox-female" checked={gender==='female'} 
              onChange={()=>{
                setgender('female')
              }}/>
              <span className="sm:text-sm text-gray-500 ms-3">Female</span>
            </label>

            <label htmlFor="af-account-gender-checkbox-other" className="flex py-2 px-3 w-full border border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <input type="radio" name="af-account-gender-checkbox" className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" id="af-account-gender-checkbox-other" checked={gender === 'other'}
              onClick={()=>{
                setgender('other')
              }}/>
              <span className="sm:text-sm text-gray-500 ms-3">Other</span>
            </label>
          </div>
        </div>
        {/* End Col */}

      </div>
      {/* End Grid */}

      <div className="mt-5 flex justify-end gap-x-2">
      
        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
          Save changes
        </button>
      </div>

      
    </form>
 
  </>
    )
}

export default Profile;