// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { BrowserRouter, Routes, Route } from 'react-router-dom';


import GuestRouter from './Routes/guest.routes';
import UserRouter from './Routes/user.routes';
import DonorRouter from './Routes/donor.routes';
import DoctorRouter from './Routes/doctor.routes';
import AssistantRouter from './Routes/assistant.routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest Routes */}
        <Route path="/*" element={<GuestRouter/>} />

        {/* User Routes */}
        <Route path="/user/*" element={<UserRouter />} />

        {/* Donor Routes */}
        <Route path="/donor/*" element={<DonorRouter />} />

        {/* Doctor Routes */}
        <Route path="/doctor/*" element={<DoctorRouter />} />

        {/* Assistant Routes */}
        <Route path="/assistant/*" element={<AssistantRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
