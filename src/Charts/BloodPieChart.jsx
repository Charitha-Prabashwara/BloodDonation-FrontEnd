import React from "react";
import Chart from "react-apexcharts";

const BloodPieChart = () => {
  const series = [40, 25, 15, 10, 5, 3, 2];
  const labels = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+"];

  const options = {
    chart: {
      type: "pie",
      toolbar: { show: false }
    },
    labels: labels,
    legend: {
      position: "bottom"
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} units`
      }
    },
    title: {
      text: "Bool types and donations",
      align: "center"
    },
    responsive: [
      {
        breakpoint: 768, // when screen < 768px (mobile/tablet)
        options: {
          chart: {
            width: "100%"
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };

  return (
    <>
    
    <div className="p-4 bg-white rounded-2xl shadow">
        <div className="flex gap-4">
            {/* Floating Select 1 */}
            <div className="relative flex-1">
                <select className="peer p-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                focus:pt-6
                focus:pb-2
                not-placeholder-shown:pt-6
                not-placeholder-shown:pb-2
                autofill:pt-6
                autofill:pb-2">
                {/* <option selected="">Open this select menu</option> */}
                <option>1</option>
                <option>2</option>
                <option>3</option>
                </select>
                <label className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:text-xs
                peer-focus:-translate-y-1.5
                peer-focus:text-gray-500
                peer-not-placeholder-shown:text-xs
                peer-not-placeholder-shown:-translate-y-1.5
                peer-not-placeholder-shown:text-gray-500">
                Year
                </label>
            </div>

                {/* Floating Select 2 */}
                <div className="relative flex-1">
                    <select className="peer p-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6
                    focus:pb-2
                    not-placeholder-shown:pt-6
                    not-placeholder-shown:pb-2
                    autofill:pt-6
                    autofill:pb-2">
                    {/* <option selected="">Open this select menu</option> */}
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    </select>
                    <label className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:text-xs
                    peer-focus:-translate-y-1.5
                    peer-focus:text-gray-500
                    peer-not-placeholder-shown:text-xs
                    peer-not-placeholder-shown:-translate-y-1.5
                    peer-not-placeholder-shown:text-gray-500">
                    Month
                    </label>
                </div>

                     {/* Search Button */}
      <button
        className="inline-flex items-center px-5 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
      >
        🔍 Show
      </button>
            </div>
     <div className="w-full">
      <Chart options={options} series={series} type="pie" width="100%" />
    </div>

    </div>

    </>
  );
};

export default BloodPieChart;
