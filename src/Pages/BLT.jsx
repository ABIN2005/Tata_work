import React from "react";

import IndustrialDashboard from './Dashboard/IndustrialDashboard';



function BLT() {
  
  return (
    <div className="relative min-h-screen bg-white w-full overflow-x-hidden">
      {/* Background Content */}
      <div className="w-full">
        <div className="flex justify-between items-center px-3 sm:px-4 md:px-6 py-2 bg-gray-300 w-full">
          <h2 className="text-center font-bold text-sm sm:text-base md:text-lg w-full">
            BELL LESS TOP (BLT)
          </h2>
        </div>

        <IndustrialDashboard />
      </div>
    </div>
  );
}
export default BLT;