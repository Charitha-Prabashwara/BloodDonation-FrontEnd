import {React, useEffect, useState} from 'react'
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import API from '../../../../../api/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const ApplicationReview = ()=>{
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setTableData] = useState([]);
  
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
 

  const calculateAge = (birthDate)=> {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
     return age;
    }



 const loadData = ()=>{
    API.get('/application/all?state=created',{
      headers:{
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
    }).then((response)=>{
      console.log(response)

      const {data} = response.data;
      let tableData = []

      data.map((data)=>{
        //console.log(data)
        console.log(data.user.address)
        let makeRecord = {};
        makeRecord.id = data._id
        makeRecord.nic = data.user.nic;
        makeRecord.fullName = data.user.full_name;
        makeRecord.age = calculateAge(data.birthday)
        makeRecord.hight = data.bodyHight
        makeRecord.weight = data.bodyWeight
        makeRecord.province = data.user.address.province
        makeRecord.city = data.user.address.city
        makeRecord.zip = data.user.address.postal_code
        makeRecord.questions = data.questions

        const getAddress=()=>{
            
            try {
              if(!data.user.address.address_line1){
                return "NAN"
            }else{
                return data.user.address.address_line1
            }
            } catch (error) {
              return "NAN"
            }
        }
        makeRecord.address = getAddress()
        tableData.push(makeRecord)
      })

      setTableData(tableData)
      
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

 useEffect(()=>{
    loadData()
 },[])
// Define columns
  const columns = [

    { 
      header: 'NIC', 
      accessorKey: 'nic',
      cell: info => <span className="text-sm text-gray-800">{info.getValue()}</span>
    },
    { 
      header: 'Full Name', 
      accessorKey: 'fullName',
      cell: info => <span className="text-sm text-gray-800">{info.getValue()}</span>
    },
    { 
      header: 'Age', 
      accessorKey: 'age',
      cell: info => <span className="text-sm text-gray-800">{info.getValue()}</span>
    },
    { 
      header: 'Address', 
      accessorKey: 'address',
      cell: info => <span className="text-sm text-gray-800">{info.getValue()}</span>
    },
    
  ];

  // Create the table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } }
  });

  return (
    <>
    <div className="max-w-6xl mx-auto bg-red-50 rounded-2xl">
      {/* Table with Preline UI styles */}
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y bg-green-50 divide-gray-200">
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th 
                          key={header.id} 
                          scope="col" 
                          className="px-6 py-3 text-start text-xl font-extrabold text-green-500 uppercase align-middle"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {table.getRowModel().rows.map(row => (
                    <tr 
                      key={row.id} 
                      className="hover:bg-red-50 cursor-pointer"
                      onClick={() => {
                          setSelectedUserId(row.original);
                          setIsModalOpen(true);
                        }}
                    >
                      {row.getVisibleCells().map(cell => (
                        <td 
                          key={cell.id} 
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination - Preline UI Style */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-green-600">
              Showing <span className="font-medium">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{' '}
              <span className="font-medium">{
                Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  data.length
                )
              }</span> of{' '}
              <span className="font-medium">{data.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-green-400 text-sm font-bold text-gray-500 hover:bg-green-500 disabled:opacity-50"
              >
                <span className="sr-only">First</span>
                &laquo;
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-400 text-sm font-bold text-white hover:bg-blue-500 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-red-400 text-sm font-bold text-white hover:bg-red-500 disabled:opacity-50"
              >
                Next
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-green-400 text-sm font-bold text-gray-500 hover:bg-green-500 disabled:opacity-50"
              >
                <span className="sr-only">Last</span>
                &raquo;
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Modal - Preline UI Style */}
      {isModalOpen && selectedUserId && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsModalOpen(false)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all lg:max-w-2/4 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Donation Application
                    </h3>
                    <div className="mt-2 space-y-3">
                    <div className="mt-2 space-y-3">
                      <p className="text-sm text-gray-500"><span className="font-medium text-green-500">ID:</span> {selectedUserId.id}</p>
                      <p className="text-sm text-gray-500"><span className="font-medium text-green-500">NIC:</span> {selectedUserId.nic}</p>
                      <p className="text-sm text-gray-500"><span className="font-medium text-green-500">Full Name:</span> {selectedUserId.fullName}</p>
                      <p className="text-sm text-gray-500"><span className="font-medium text-green-500">Age:</span> {selectedUserId.age}</p>
                      <p className="text-sm text-gray-500"><span className="font-medium text-green-500">Address:</span> {selectedUserId.address} / {selectedUserId.province}, {selectedUserId.city} ({selectedUserId.zip})</p>
                      <p className="text-sm text-gray-500"><span className="font-medium text-green-500">Body Hight:</span> {selectedUserId.hight} cm</p>
                      <p className="text-sm text-gray-500"><span className="font-medium text-green-500">Body Weight:</span> {selectedUserId.hight} kg</p>
                    </div>
                    </div>

                    {/* Question Section */}
                    {/* Card */}
  

    
      {/* Section */}
      <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
        <label htmlFor="af-payment-billing-contact" className="inline-block text-sm font-medium">
          Questions
        </label>

        <div className="mt-2 space-y-3 ">
         {/* Q1 */}
                      <div className='grid sm:grid-cols-12 gap-2 sm:gap-1 py-1 first:pt-0 last:pb-0 first:border-transparent '>
                          <div className="sm:col-span-8">
                            <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                                1. Have you ever been refused as a blood donor or told not to donate?
                            </label>
                          </div>

                          <div className="sm:col-span-4">
                            <ul className="flex flex-col sm:flex-row">
                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q1 == true}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
                                    Yes
                                  </label>
                                </div>
                               </li>

                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q1 == false}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
                                    No
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                      </div>
                      
          {/* End Q1 */}

          {/* Q2 */}
                      <div className='grid sm:grid-cols-12 gap-2 sm:gap-1 py-1 first:pt-0 last:pb-0 first:border-transparent '>
                          <div className="sm:col-span-8">
                            <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                               2. Have you ever had hepatitis B or C, HIV/AIDS, or syphilis?
                            </label>
                          </div>

                          <div className="sm:col-span-4">
                            <ul className="flex flex-col sm:flex-row">
                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q2 == true}/>
                                     
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
                                    Yes
                                  </label>
                                </div>
                               </li>

                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                     checked={selectedUserId.questions.q2 == false}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
                                    No
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                      </div>
                      
          {/* End Q2 */}

          {/* Q3 */}
                      <div className='grid sm:grid-cols-12 gap-2 sm:gap-1 py-1 first:pt-0 last:pb-0 first:border-transparent '>
                          <div className="sm:col-span-8">
                            <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                                3. Have you ever tested positive for any sexually transmitted infections (STIs)?
                            </label>
                          </div>

                          <div className="sm:col-span-4">
                            <ul className="flex flex-col sm:flex-row">
                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q3 == true}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
                                    Yes
                                  </label>
                                </div>
                               </li>

                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q3 == false}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
                                    No
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                      </div>
                      
          {/* End Q3 */}

          {/* Q4 */}
                      <div className='grid sm:grid-cols-12 gap-2 sm:gap-1 py-1 first:pt-0 last:pb-0 first:border-transparent '>
                          <div className="sm:col-span-8">
                            <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                                 4. Do you have or have you had any type of cancer?
                            </label>
                          </div>

                          <div className="sm:col-span-4">
                            <ul className="flex flex-col sm:flex-row">
                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q4 == true}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
                                    Yes
                                  </label>
                                </div>
                               </li>

                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q4 == false}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
                                    No
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                      </div>
                      
          {/* End Q4 */}

          {/* Q5 */}
                      <div className='grid sm:grid-cols-12 gap-2 sm:gap-1 py-1 first:pt-0 last:pb-0 first:border-transparent '>
                          <div className="sm:col-span-8">
                            <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                                 5. Have you ever had heart disease, heart attack, or high blood pressure?
                            </label>
                          </div>

                          <div className="sm:col-span-4">
                            <ul className="flex flex-col sm:flex-row">
                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                     checked={selectedUserId.questions.q5 == true}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
                                    Yes
                                  </label>
                                </div>
                               </li>

                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q5 == false}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
                                    No
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                      </div>
                      
          {/* End Q5 */}

          {/* Q6 */}
                      <div className='grid sm:grid-cols-12 gap-2 sm:gap-1 py-1 first:pt-0 last:pb-0 first:border-transparent '>
                          <div className="sm:col-span-8">
                            <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                                6. Have you ever had a stroke or blood clotting disorder?
                            </label>
                          </div>

                          <div className="sm:col-span-4">
                            <ul className="flex flex-col sm:flex-row">
                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q6 == true}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
                                    Yes
                                  </label>
                                </div>
                               </li>

                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q6 == false}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
                                    No
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                      </div>
                      
          {/* End Q6 */}

          {/* Q7 */}
                      <div className='grid sm:grid-cols-12 gap-2 sm:gap-1 py-1 first:pt-0 last:pb-0 first:border-transparent '>
                          <div className="sm:col-span-8">
                            <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                                 7. Do you have diabetes (Type 1 or 2)?
                            </label>
                          </div>

                          <div className="sm:col-span-4">
                            <ul className="flex flex-col sm:flex-row">
                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q7 == true}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
                                    Yes
                                  </label>
                                </div>
                               </li>

                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q7 == false}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
                                    No
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                      </div>
                      
          {/* End Q7 */}

          {/* Q8 */}
                      <div className='grid sm:grid-cols-12 gap-2 sm:gap-1 py-1 first:pt-0 last:pb-0 first:border-transparent '>
                          <div className="sm:col-span-8">
                            <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                                8. Do you have asthma or any respiratory conditions?
                            </label>
                          </div>

                          <div className="sm:col-span-4">
                            <ul className="flex flex-col sm:flex-row">
                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q8 == true}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
                                    Yes
                                  </label>
                                </div>
                               </li>

                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q8 == false}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
                                    No
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                      </div>
                      
          {/* End Q8 */}

          {/* Q9 */}
                      <div className='grid sm:grid-cols-12 gap-2 sm:gap-1 py-1 first:pt-0 last:pb-0 first:border-transparent '>
                          <div className="sm:col-span-8">
                            <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                                9. Do you suffer from bleeding disorders (e.g., hemophilia)?
                            </label>
                          </div>

                          <div className="sm:col-span-4">
                            <ul className="flex flex-col sm:flex-row">
                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q9 == true}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
                                    Yes
                                  </label>
                                </div>
                               </li>

                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q9 == false}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
                                    No
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                      </div>
                      
          {/* End Q9 */}

          {/* Q10 */}
                      <div className='grid sm:grid-cols-12 gap-2 sm:gap-1 py-1 first:pt-0 last:pb-0 first:border-transparent '>
                          <div className="sm:col-span-8">
                            <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                                10. Have you ever used recreational or intravenous (IV) drugs?
                            </label>
                          </div>

                          <div className="sm:col-span-4">
                            <ul className="flex flex-col sm:flex-row">
                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q10 == true}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
                                    Yes
                                  </label>
                                </div>
                               </li>

                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q10 == false}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
                                    No
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                      </div>
                      
          {/* End Q10 */}

                    {/* Q11 */}
                      <div className='grid sm:grid-cols-12 gap-2 sm:gap-1 py-1 first:pt-0 last:pb-0 first:border-transparent '>
                          <div className="sm:col-span-8">
                            <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                                11. Have you ever engaged in high-risk sexual behavior (e.g., multiple partners, unprotected sex)?
                            </label>
                          </div>

                          <div className="sm:col-span-4">
                            <ul className="flex flex-col sm:flex-row">
                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q11 == true}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
                                    Yes
                                  </label>
                                </div>
                               </li>

                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q11 == false}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
                                    No
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                      </div>
                      
          {/* End Q11 */}

                    {/* Q12 */}
                      <div className='grid sm:grid-cols-12 gap-2 sm:gap-1 py-1 first:pt-0 last:pb-0 first:border-transparent '>
                          <div className="sm:col-span-8">
                            <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                                12. Do you have any allergies to latex, antiseptics, or medications?
                            </label>
                          </div>

                          <div className="sm:col-span-4">
                            <ul className="flex flex-col sm:flex-row">
                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q12 == true}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
                                    Yes
                                  </label>
                                </div>
                               </li>

                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q12== false}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
                                    No
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                      </div>
                      
          {/* End Q12 */}

                    {/* Q13 */}
                      <div className='grid sm:grid-cols-12 gap-2 sm:gap-1 py-1 first:pt-0 last:pb-0 first:border-transparent '>
                          <div className="sm:col-span-8">
                            <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                               13. Do you have any chronic illness not listed above?
                            </label>
                          </div>

                          <div className="sm:col-span-4">
                            <ul className="flex flex-col sm:flex-row">
                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q13 == true}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
                                    Yes
                                  </label>
                                </div>
                               </li>

                              <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
                                <div className="relative flex items-start w-full">
                                  <div className="flex items-center h-5">
                                    <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
                                    checked={selectedUserId.questions.q13 == false}/>
                                  </div>
                                  <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
                                    No
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                      </div>
                      
          {/* End Q13 */}
        </div>
      </div>
  {/* End Card */}
  {/* End Question Section */}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    alert(`Action for user ${selectedUserId.id}`);
                    setIsModalOpen(false);
                  }}
                >
                  Pass Application
                </button>

                 <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-400 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Reject
                </button>

                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default ApplicationReview