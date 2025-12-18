import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { sampleData } from "../data";

export default function AreaChartPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = useMemo(() => {
    try {
      if (location.state && location.state.source === "sample") return sampleData;
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
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <div onClick={() => navigate("/dashboard")} className="flex items-center gap-2 cursor-pointer mb-6 hover:text-sky-300">
        <IoMdArrowRoundBack className="text-2xl" />
        <span className="text-lg font-semibold">Back to Dashboard</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Area Chart — Users vs Sales</h1>
      <p className="text-sm text-slate-400 mb-6">Area chart (filled) for users vs sales.</p>

      <div className="bg-slate-800 rounded-xl p-4 shadow-lg h-[26.25rem]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.85} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.85} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: "#cbd5e1" }} />
            <YAxis stroke="#94a3b8" tick={{ fill: "#cbd5e1" }} />
            <Tooltip
              cursor={{ fill: "rgba(56,189,248,0.06)" }}
              contentStyle={{ backgroundColor: "#0b1220", borderRadius: 8, border: "1px solid #334155" }}
              labelStyle={{ color: "#38bdf8", fontWeight: 600 }}
              itemStyle={{ color: "#e6eef8" }}
            />
            <Legend wrapperStyle={{ color: "#cbd5e1" }} />

            <Area dataKey="users" stroke="#38bdf8" fill="url(#gradUsers)" strokeWidth={2} name="Users" />
            <Area dataKey="sales" stroke="#a855f7" fill="url(#gradSales)" strokeWidth={2} name="Sales" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
