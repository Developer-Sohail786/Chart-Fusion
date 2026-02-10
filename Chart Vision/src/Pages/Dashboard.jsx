import React from "react";
import { GiMicrochip } from "react-icons/gi";
import { FcAreaChart, FcBarChart, FcLineChart } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 sm:px-6">

      {/* Header */}
      <header className="flex flex-col items-start max-w-4xl w-full py-6">
        <p className="text-blue-600 flex items-center gap-2 text-lg sm:text-xl">
          <GiMicrochip className="text-blue-800 text-3xl sm:text-4xl" />
          Data Analytics
        </p>

        <h1 className="text-3xl sm:text-5xl text-white font-extrabold mt-2">
          WELCOME TO YOUR DASHBOARD
        </h1>

        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          This is an interactive Dashboard built with React and Recharts.
        </p>

        <p className="text-xs sm:text-sm text-gray-400">
          We turn your data into beautiful, simple charts.
        </p>
      </header>

      {/* Hero Section */}
      <div className="hero-section flex flex-col mt-6 w-full max-w-4xl py-4">

        <p className="text-white font-semibold text-base sm:text-lg">
          Explore Charts
          <span className="text-xs sm:text-sm text-gray-400 ml-1">
            (Have a Preview of our charts)
          </span>
        </p>

        <hr className="border-gray-600 mt-2" />

        <div className="charts grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">

          {/* Area Chart */}
          <div
            onClick={() => navigate("/charts/area")}
            className="border border-gray-700 h-52 rounded-2xl flex flex-col items-start cursor-pointer p-2 hover:bg-slate-700/30 transition"
          >
            <p className="text-3xl sm:text-4xl p-1">
              <FcAreaChart />
            </p>

            <p className="text-lg font-bold text-white pl-1">
              Area chart
            </p>

            <p className="text-xs text-gray-400 pl-1">
              Best for showing trends overtime, like website traffic or stock prices.
            </p>

            <img
              className="h-20 sm:h-24 w-auto mt-2"
              src="https://png.pngtree.com/png-vector/20220517/ourmid/pngtree-area-chart-color-icon-png-image_4637720.png"
              alt="area chart"
              loading="lazy"
            />
          </div>

          {/* Bar Chart */}
          <div
            onClick={() => navigate("/charts/bar")}
            className="border border-gray-700 h-52 rounded-2xl flex flex-col items-start cursor-pointer p-2 hover:bg-slate-700/30 transition"
          >
            <p className="text-3xl sm:text-4xl p-1">
              <FcBarChart />
            </p>

            <p className="text-lg font-bold text-white pl-1">
              Bar chart
            </p>

            <p className="text-xs text-gray-400 pl-1">
              Great for comparing values between different groups.
            </p>

            <img
              className="h-20 sm:h-24 w-auto mt-2 rounded-lg"
              src="https://t4.ftcdn.net/jpg/16/16/24/41/360_F_1616244134_dpR4fxHQ3FrdbxPEIIXBzgxfSkxGtmid.jpg"
              alt="bar chart"
              loading="lazy"
            />
          </div>

          {/* Line Chart */}
          <div
            onClick={() => navigate("/charts/line")}
            className="border border-gray-700 h-52 rounded-2xl flex flex-col items-start cursor-pointer p-2 hover:bg-slate-700/30 transition"
          >
            <p className="text-3xl sm:text-4xl p-1">
              <FcLineChart />
            </p>

            <p className="text-lg font-bold text-white pl-1">
              Line chart
            </p>

            <p className="text-xs text-gray-400 pl-1">
              Used to track changes over short or long periods.
            </p>

            <img
              className="h-20 sm:h-24 w-auto mt-2"
              src="https://img.freepik.com/premium-photo/business-arrow-up-growth-line-circuit-technology-dark-blue-background_327072-9214.jpg"
              alt="line chart"
              loading="lazy"
            />
          </div>

        </div>

        <hr className="border-gray-600 mt-10" />
      </div>

      {/* Footer */}
      <div className="footer mt-4 mb-8">
        <button
          onClick={() => navigate("/charts/chart-builder")}
          className="rounded-lg bg-slate-600 px-5 py-3 hover:bg-slate-500 transition"
        >
          Create Your own Charts
        </button>
      </div>

    </div>
  );
};

export default Dashboard;
