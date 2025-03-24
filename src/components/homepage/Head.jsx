import React from 'react';
import { Helmet } from 'react-helmet';

function Head(){
    return(
      
      <Helmet>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Skilline Landing Page</title>
      {/* Tailwind */}
      <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
      {/* Alpine */}
      <script type="module" src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"></script>
      <script nomodule src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine-ie11.min.js" defer></script>
      {/* AOS */}
      <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      {/* Custom style */}
      <link rel="stylesheet" href="css/skilline.css" />
      {/* Poppins font */}
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
    </Helmet>
     
    )
}

export default Head;