import {React, useState, useEffect} from "react";
import LineChart from "../../../../../Charts/DoctorMainChart";
import BloodPieChart from "../../../../../Charts/BloodPieChart"
const AdminStat = ()=>{

    useEffect(()=>{
              
             
     },[]);
    return(
        
    <>
       {/* Grid */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Card */}
      <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl">
        <div className="p-4 md:p-5">
          <div className="flex items-center gap-x-2">
            <p className="text-xs uppercase text-gray-500">
              Total Donors
            </p>
            <div className="hs-tooltip">
              <div className="hs-tooltip-toggle">
                <svg className="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs" role="tooltip">
                  The number of daily users
                </span>
              </div>
            </div>
          </div>

          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
              72,540
            </h3>
            <span className="flex items-center gap-x-1 text-green-600">
              <svg className="inline-block size-4 self-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              <span className="inline-block text-sm">
                1.7%
              </span>
            </span>
          </div>
        </div>
      </div>
      {/* End Card */}

      {/* Card */}
      <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl">
        <div className="p-4 md:p-5">
          <div className="flex items-center gap-x-2">
            <p className="text-xs uppercase text-gray-500">
              Applications
            </p>
          </div>

          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
              29.4%
            </h3>
          </div>
        </div>
      </div>
      {/* End Card */}

      {/* Card */}
      <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl">
        <div className="p-4 md:p-5">
          <div className="flex items-center gap-x-2">
            <p className="text-xs uppercase text-gray-500">
              Avg. Daily Supply
            </p>
          </div>

          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
              56.8%
            </h3>
            <span className="flex items-center gap-x-1 text-red-600">
              <svg className="inline-block size-4 self-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>
              <span className="inline-block text-sm">
                1.7%
              </span>
            </span>
          </div>
        </div>
      </div>
      {/* End Card */}

      {/* Card */}
      <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl">
        <div className="p-4 md:p-5">
          <div className="flex items-center gap-x-2">
            <p className="text-xs uppercase text-gray-500">
              O :type
            </p>
          </div>

          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
              92,913
            </h3>
          </div>
        </div>
      </div>
      {/* End Card */}
    </div>
    {/* End Grid */}

          {/* Card */}
        <div className="p-4 md:p-5 min-h-102.5 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl mt-4">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div>
              <h2 className="text-sm text-gray-500">
                Daily Donations
              </h2>

            

        
              
            </div>

           
          </div>
          {/* End Header */}

          <div className="mt-3">
                   <LineChart/>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mt-3">
            <div className="flex-1">
                {/* First Column (e.g. Pie Chart) */}
                <BloodPieChart />
            </div>

            <div className="flex-1">
                {/* Second Column (e.g. Another Chart or Table) */}
                <BloodPieChart />
            </div>
        </div>
         
         
        </div>


        
    
    </>)
}

export default AdminStat;