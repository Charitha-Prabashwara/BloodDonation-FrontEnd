import React from "react";

function NotFound(){
    return(
      <>

  {/* ========== END HEADER ========== */}

  {/* ========== MAIN CONTENT ========== */}
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-900 overflow-hidden">
  <main id="content" className="max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
    {/* Floating Blood Drop (Animated) */}
    <div className="mx-auto mb-8 animate-float">
      <svg 
        className="w-24 h-24 text-red-600 dark:text-red-500 mx-auto filter drop-shadow-lg" 
        fill="currentColor" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" 
        />
      </svg>
    </div>

    {/* 404 Text with Heartbeat Pulse */}
    <h1 className="block text-7xl font-bold text-red-600 sm:text-8xl dark:text-red-400 animate-pulse-slow">404</h1>
    
    {/* Fade-in Text */}
    <p className="mt-4 text-xl text-gray-600 dark:text-neutral-300 animate-fade-in-delay">
      Oops! The page you're looking for is missing.
    </p>
    <p className="text-gray-600 dark:text-neutral-400 animate-fade-in-delay-2">
      Just like a blood donor, it seems to have moved elsewhere.
    </p>

    {/* Pulsing CTA Button */}
    <div className="mt-8 animate-bounce-slow">
      <a
        href="/"
        className="inline-flex items-center px-6 py-3 text-white bg-red-600 border border-transparent rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-700 dark:hover:bg-red-800 transition-transform hover:scale-105"
      >
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
          />
        </svg>
        Return to Home
      </a>
    </div>

    {/* Blood Donation Reminder (Slide-up) */}
    <div className="mt-12 p-4 bg-red-50 rounded-lg dark:bg-red-900/30 animate-slide-up">
      <p className="text-red-700 dark:text-red-200 font-medium">
        💉 Every drop counts! While you're here, consider donating blood.
      </p>
      {/* <a 
        href="/donate" 
        className="mt-2 inline-block text-red-600 underline dark:text-red-300 hover:text-red-800 dark:hover:text-red-200 transition-colors"
      >
        Find a donation center near you →
      </a> */}
    </div>
  </main>
</div>

<style jsx>{`
  /* Keyframe Animations */
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
  @keyframes pulse-slow {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.03); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  /* Animation Classes */
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-pulse-slow { animation: pulse-slow 2.5s ease-in-out infinite; }
  .animate-fade-in { animation: fade-in 0.8s ease-out; }
  .animate-fade-in-delay { animation: fade-in 1s ease-out 0.3s forwards; opacity: 0; }
  .animate-fade-in-delay-2 { animation: fade-in 1s ease-out 0.6s forwards; opacity: 0; }
  .animate-slide-up { animation: slide-up 0.8s ease-out 0.9s forwards; opacity: 0; }
  .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
`}</style>
  {/* ========== END MAIN CONTENT ========== */}


      </> 
    )
}

export default NotFound;