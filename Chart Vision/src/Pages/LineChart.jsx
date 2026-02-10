import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { sampleData } from "../data";

export default function LineChartPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = useMemo(() => {
    try {
      if (location.state && location.state.source === "sample") {
        return sampleData;
      }

      const raw = localStorage.getItem("chartData");
      if (!raw) return sampleData;

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) return sampleData;

      return parsed.map((r) => ({
        month: r.label,
        users: Number(r.users),
        sales: Number(r.sales),
      }));
    } catch (e) {
      console.error("Error parsing chartData:", e);
      return sampleData;
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-800 text-white p-4 sm:p-6">

      <div
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 cursor-pointer mb-6 hover:text-sky-300 w-fit"
      >
        <IoMdArrowRoundBack className="text-xl sm:text-2xl" />
        <span className="text-base sm:text-lg font-semibold">
          Back to Dashboard
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        Line Chart — Users vs Sales
      </h1>

      <p className="text-xs sm:text-sm text-slate-400 mb-6">
        Comparing users and sales over time.
      </p>

      <div className="bg-slate-800 rounded-xl p-3 sm:p-4 shadow-lg h-[20rem] sm:h-[24rem] md:h-[26.25rem] overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              tick={{ fill: "#cbd5e1" }}
            />

            <YAxis stroke="#94a3b8" tick={{ fill: "#cbd5e1" }} />

            <Tooltip
              cursor={{ fill: "rgba(56,189,248,0.06)" }}
              contentStyle={{
                backgroundColor: "#0b1220",
                borderRadius: 8,
                border: "1px solid #334155",
              }}
              labelStyle={{ color: "#38bdf8", fontWeight: 600 }}
              itemStyle={{ color: "#e6eef8" }}
            />

            <Legend wrapperStyle={{ color: "#cbd5e1" }} />

            <Line
              dataKey="users"
              stroke="#38bdf8"
              strokeWidth={3}
              name="Users"
            />

            <Line
              dataKey="sales"
              stroke="#a855f7"
              strokeWidth={3}
              name="Sales"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

