// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { BrowserRouter, Routes, Route } from 'react-router-dom';


import GuestRoutes from './Routes/guest.routes';
import UserRoutes from './Routes/user.routes';
import DonorRoutes from './Routes/donor.routes';
import DoctorRoutes from './Routes/doctor.routes';
import AssistantRoutes from './Routes/assistant.routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest Routes */}
        <Route path="/*" element={<GuestRoutes/>} />

        {/* User Routes */}
        <Route path="/user/*" element={<UserRoutes />} />

        {/* Donor Routes */}
        <Route path="/donor/*" element={<DonorRoutes />} />

        {/* Doctor Routes */}
        <Route path="/doctor/*" element={<DoctorRoutes />} />

        {/* Assistant Routes */}
        <Route path="/assistant/*" element={<AssistantRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
