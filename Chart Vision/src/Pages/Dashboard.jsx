import React from 'react'
import { GiMicrochip } from "react-icons/gi";
import { FcAreaChart } from "react-icons/fc";
import { FcBarChart } from "react-icons/fc";
import { FcLineChart } from "react-icons/fc";
import { Navigate, useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate=useNavigate()
  
  return (
 <div className="min-h-screen w-full flex flex-col items-center">
  {/* header */}
  <header className="flex flex-col items-start max-w-4xl w-full p-6">
    <p className="text-blue-600 flex items-center gap-2 text-xl">
      <GiMicrochip className="text-blue-800 text-4xl" /> Data Analytics
    </p>
    <h1 className="text-5xl text-white font-extrabold mt-2">
      WELCOME TO YOUR DASHBOARD
    </h1>
    <p className="text-sm text-gray-400 mt-1">
      This is an interactive Dashboard built with React and Recharts.
      We turn your data
    </p>
    <p className="text-sm text-gray-400">
      into beautiful, simple charts. Explore chart types below to see them in action.
    </p>
  </header>

  {/* hero section */}
  <div className="hero-section flex flex-col mt-10 h-1/4 w-full max-w-4xl p-6">
    <p className="text-white font-semibold text-lg">Explore Charts <span className='text-sm text-gray-400'>(Have a Preview of our charts)</span></p>
    <hr className="border-gray-600 mt-2" />
    <div className="charts flex gap-8 mt-5">
      {/* Area chart */}
    <div onClick={()=> navigate("/charts/area")} className="area-chart border border-gray-700 h-52 w-1/3 rounded-2xl flex flex-col items-start cursor-pointer">
    <p className='text-4xl p-2'><FcAreaChart /></p>
    <p className='text-lg font-bold text-white pl-2 '>Area chart</p>
    <p className='text-xs pl-2 text-gray-400'>Best for showing trends overtime,like Website traffic or stock prices.</p>
    <img className='h-1/2 w-1/2' src="https://png.pngtree.com/png-vector/20220517/ourmid/pngtree-area-chart-color-icon-png-image_4637720.png" alt="area chart"  />
    </div>

    {/* bar chart */}
    <div onClick={()=>navigate("/charts/bar")} className="bar-chart border border-gray-700 h-52 w-1/3 rounded-2xl flex flex-col items-start cursor-pointer">
     <p className='text-4xl p-2'><FcBarChart /></p>
    <p className='text-lg font-bold text-white pl-2 '>Bar chart</p>
    <p className='text-xs pl-2 text-gray-400'>Great for comparing values between different groups, like sales per company.</p>
    <img className='h-1/3 w-1/2 mt-2 pl-2 rounded-lg' src="https://t4.ftcdn.net/jpg/16/16/24/41/360_F_1616244134_dpR4fxHQ3FrdbxPEIIXBzgxfSkxGtmid.jpg" alt="bar chart"  /></div>

    {/* line chart */}
    <div onClick={()=>navigate("/charts/line")} className="line-chart border border-gray-700 h-52 w-1/3 rounded-2xl flex flex-col items-start cursor-pointer">
     <p className='text-4xl p-2'><FcLineChart /></p>
    <p className='text-lg font-bold text-white pl-2 '>Line chart</p>
    <p className='text-xs pl-2 text-gray-400'>Used to track changes over short or long periods. Great for many data points.</p>
    <img className='h-1/3 w-1/2 mt-2 pl-2' src="https://img.freepik.com/premium-photo/business-arrow-up-growth-line-circuit-technology-dark-blue-background_327072-9214.jpg" alt="area chart"  /></div>
    
    </div>
    <hr className="border-gray-600 mt-10 " />
  </div>
  {/* footer */}
  <div className="footer">
    
    <div className="btn">
      <button onClick={()=>navigate("/charts/chart-builder")} className='border-2 border-none rounded-lg bg-slate-600 p-3'>Create Your own Charts</button>
    </div>
  </div>
</div>


  )
}

export default Dashboard