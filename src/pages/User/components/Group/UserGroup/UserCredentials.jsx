import React from "react";

const AccountCredentials = ()=>{
    return(
        <>
        <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800">
        Credentials
      </h2>
      <p className="text-sm text-gray-600">
        Manage your name, password and account settings.
      </p>
    </div>

    <form>
      {/* Grid */}
      <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
       


        





        <div className="sm:col-span-3">
          <label htmlFor="af-account-email" className="inline-block text-sm text-gray-800 mt-2.5">
            Email
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <input id="af-account-email" type="email" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="maria@site.com" />
        </div>
        {/* End Col */}

        <div className="sm:col-span-3">
          <label htmlFor="af-account-password" className="inline-block text-sm text-gray-800 mt-2.5">
            Password
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <div className="space-y-2">
            <input id="af-account-password" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter current password" />
            <input type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter new password" />
          </div>
        </div>
        {/* End Col */}


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

export default AccountCredentials;