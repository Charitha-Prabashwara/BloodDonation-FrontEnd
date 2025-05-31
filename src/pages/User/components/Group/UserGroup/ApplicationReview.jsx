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
        let makeRecord = {};
        makeRecord.id = data._id
        makeRecord.nic = data.user.nic;
        makeRecord.fullName = data.user.full_name;
        makeRecord.age = calculateAge(data.birthday)
        makeRecord.address =()=>{
          if(!data.user.address.address_line1)
            return ""
          return data.user.address.address_line1
        };
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all lg:max-w-lg sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      User Details
                    </h3>
                    <div className="mt-2 space-y-3">
                      <p className="text-sm text-gray-500"><span className="font-medium">ID:</span> {selectedUserId.id}</p>
                      <p className="text-sm text-gray-500"><span className="font-medium">NIC:</span> {selectedUserId.nic}</p>
                      <p className="text-sm text-gray-500"><span className="font-medium">Full Name:</span> {selectedUserId.fullName}</p>
                      <p className="text-sm text-gray-500"><span className="font-medium">Age:</span> {selectedUserId.age}</p>
                      <p className="text-sm text-gray-500"><span className="font-medium">Address:</span> {selectedUserId.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    alert(`Action for user ${selectedUserId.id}`);
                    setIsModalOpen(false);
                  }}
                >
                  Take Action
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