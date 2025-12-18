import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App"
import Dashboard from "./Pages/Dashboard";
import LineChartPage from "./Pages/LineChart";
import BarChartPage from "./Pages/BarChart";
import AreaChartPage from "./Pages/AreaChart";
import ChartBuilderPage from "./Pages/ChartBuilder";

export const router=createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:[
            {
                index:true,
                element: <Navigate to="/dashboard" replace/>
            },
            // explicit dashboard charts
            {path:"dashboard",element:<Dashboard />},
            {
            path:"charts",
            children:[
                {
                    path:"line",element:<LineChartPage />
                },
                {
                    path:"area",
                    element:<AreaChartPage />
                },
                {
                    path:"bar",
                    element:<BarChartPage />
                },
                {
                    path:"chart-builder",
                    element:<ChartBuilderPage/>
                }
                
            ],
            },
            {path:"*",element: <div className="p-8 text-white">404 -- PAGE NOT FOUND</div>},
        ],
    },
]);