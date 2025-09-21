import {React, useState, useEffect} from 'react';
import 'preline/dist/preline';

import Header from '../components/Header';
import BreadCrump from '../components/BreadCrump';

import Profile from '../components/Group/UserGroup/Profile';
import AddressInfo from '../components/Group/UserGroup/AddressInfo';
import UserCredentials from '../components/Group/UserGroup/UserCredentials'
import DonationApplication from '../components/Group/UserGroup/DonationApplication';
import AdminStat from '../components/Group/UserGroup/AdminStat';
import SearchDonors from '../components/Group/UserGroup/SearchDonors';

import logo from '../../../assets/main.png'

import ApplicationReview from '../components/Group/UserGroup/ApplicationReview';
import { setCredentials } from '../../../Redux/authSlice';


const DoctorDashboard = () => {
  const [searchDonorpage, setSearchDonorPage] = useState(false)
  const [adminstat, setAdminStat] = useState(true);
  const [profileView, setProfileView] = useState(false);
  const [addressView, setAddressView] = useState(false);
  const [donationapplicationView, setdonationapplicationView] = useState(false)
  const [credentialsView , setcredentialsView] = useState(false)
  const [ApplicationReviewState, setApplicationReviewState] = useState(false)

  useEffect(()=>{
    
  },[])
  return (
    <>
      <Header/>
      <BreadCrump/>

{/* Sidebar */}
<div id="hs-application-sidebar" className="hs-overlay  [--auto-close:lg]
  hs-overlay-open:translate-x-0
  -translate-x-full transition-all duration-300 transform
  w-65 h-full
  hidden
  fixed inset-y-0 start-0 z-60
  bg-white border-e border-gray-200
  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
  dark:bg-neutral-800 dark:border-neutral-700" role="dialog" tabindex="-1" aria-label="Sidebar">
  <div className="relative flex flex-col h-full max-h-full">
    <div className="px-6 pt-4 flex items-center">
      {/* Logo */}
      <a className="flex items-center" href="#" aria-label="Preline">
        <img src={logo} alt="" width={50} height={50}/>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
          Blood<span class="text-gray-800">Link</span>
        </h1>
      </a>
      {/* End Logo */}

      <div className="hidden lg:block ms-2">

      </div>
    </div>

    {/* Content */}
    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      <nav className="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
        <ul className="flex flex-col space-y-1">
          {/* User group start */}

          <>
             <li className="hs-accordion" id="projects-accordion">
            <button type="button" className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm font-medium text-gray-800 rounded-lg hover:bg-green-200 focus:outline-hidden focus:bg-green-400 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200" onClick={()=>{
              setAdminStat(true)
               setAddressView(false);
              setProfileView(false);
              setdonationapplicationView(false);
              setcredentialsView(false);
              setApplicationReviewState(false);
              setSearchDonorPage(false);
            }}>
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              Dashboard

            
            </button>

          
          </li>
          <li className="hs-accordion" id="projects-accordion">
            <button type="button" className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm font-medium text-gray-800 rounded-lg hover:bg-green-200 focus:outline-hidden focus:bg-green-400 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200" aria-expanded="true" aria-controls="projects-accordion-child">
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              Donors

              <svg className="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>

              <svg className="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>

            <div id="projects-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden" role="region" aria-labelledby="projects-accordion">
              <ul className="ps-8 pt-1 space-y-1">
                <li>
                  <label className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200" onClick={()=>{
                    setAdminStat(false);
                    setAddressView(false);
                    setProfileView(false);
                    setdonationapplicationView(false);
                    setcredentialsView(false);
                    setSearchDonorPage(false);
                    setApplicationReviewState(true);
                    
                  }}>
                    Application
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200" onClick={()=>{
                    setAdminStat(false);
                    setAddressView(false)
                    setdonationapplicationView(false)
                    setApplicationReviewState(false)
                    setProfileView(false)
                    setcredentialsView(false);
                    setSearchDonorPage(true)
                  }}>
                     Search Donors
                  </label>
                </li>
        
              </ul>
            </div>
          </li>

        <li className="hs-accordion" id="projects-accordion">
            <button type="button" className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200" aria-expanded="true" aria-controls="projects-accordion-child">
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              User

              <svg className="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>

              <svg className="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>

            <div id="projects-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden" role="region" aria-labelledby="projects-accordion">
              <ul className="ps-8 pt-1 space-y-1">
                <li>
                  <label className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200" onClick={()=>{
                    setAdminStat(false);
                    setAddressView(false)
                    setdonationapplicationView(false)
                    setApplicationReviewState(false)
                    setProfileView(true)
                    setSearchDonorPage(false);
                  }}>
                    Profile
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200" onClick={()=>{
                   setAdminStat(false);
                   setProfileView(false)
                   setcredentialsView(false);
                   setdonationapplicationView(false)
                   setApplicationReviewState(false)
                   setSearchDonorPage(false);
                   setAddressView(true)
                    
                  }}>
                     Address information
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200" onClick={()=>{
                    setAdminStat(false);
                    setAddressView(false)
                    setProfileView(false);
                    setdonationapplicationView(false)
                    setApplicationReviewState(false)
                    setSearchDonorPage(false);
                    setcredentialsView(true);
                    
                  }}>
                    Account Credentials
                  </label>
                </li>
              </ul>
            </div>
          </li>

           {/* <li>
            <label className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200" onClick={()=>{
              setAdminStat(false);
              setProfileView(false)
              setAddressView(false)
              setcredentialsView(false)
              setApplicationReviewState(false)
              setSearchDonorPage(false);
              setdonationapplicationView(true)
            }}>
              Donation Application
            </label>
          </li> */}
        </>
        {/* User group end */}
        </ul>
      </nav>
    </div>
    
  </div>
</div>
<div className='bg-blue-100'></div>
<div className="w-full lg:ps-64">
  <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
    <div className="px-1 py-1 sm:px-6 lg:px-8 mx-auto">{/* Card */}
      
      <div className=" rounded-xl shadow-xs p-4 sm:p-7">
          
          {adminstat && (<AdminStat/>)}
          {searchDonorpage && (<SearchDonors/>)}
          {profileView && (<Profile/>)}
          {addressView && (<AddressInfo/>)}
          {credentialsView && (<UserCredentials/>)}
          {donationapplicationView && (<DonationApplication />)}
          {ApplicationReviewState && (<ApplicationReview />)}
      </div>
     </div>
  </div>
</div>


   </>
    )
}

export default DoctorDashboard;