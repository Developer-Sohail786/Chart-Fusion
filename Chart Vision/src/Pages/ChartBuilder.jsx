import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChartBuilderPage() {
  const navigate = useNavigate();
  const [label, setlabel] = useState("");
  const [users, setusers] = useState("");
  const [sales, setsales] = useState("");
  const [editingIndex, setEditingIndex] = useState(null); 

  const [data, setdata] = useState(() => {
    try {
      const raw = localStorage.getItem("chartData");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // keep localStorage in sync
  useEffect(() => {
    try {
      localStorage.setItem("chartData", JSON.stringify(data));
    } catch {}
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = label.trim();
    if (!trimmed) return alert("Label Required");

    if (users.trim() === "" || isNaN(Number(users)))
      return alert("Users must be a number");
    if (sales.trim() === "" || isNaN(Number(sales)))
      return alert("Sales must be a number");

    const newRow = {
      label: trimmed,
      users: users.trim(),
      sales: sales.trim(),
    };

    // for editing
    if (editingIndex !== null) {
      setdata((prev) =>
        prev.map((row, idx) => (idx === editingIndex ? newRow : row))
      );
      setEditingIndex(null);
    } else {
      
      setdata((prev) => [...prev, newRow]);
    }

    // clear inputs
    setlabel("");
    setsales("");
    setusers("");
  }

  function startEdit(idx) {
    const row = data[idx];
    setlabel(row.label);
    setusers(row.users);
    setsales(row.sales);
    setEditingIndex(idx);
    // optional: scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(idx) {
    setdata((prev) => prev.filter((_, i) => i !== idx));
    
    if (editingIndex === idx) {
      setEditingIndex(null);
      setlabel("");
      setusers("");
      setsales("");
    }
  }

  return (
    <div className="h-auto bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Build Your Chart here</h1>

      {/* form area */}
      <div id="form" className="mb-6">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 flex-col sm:flex-row">
            <input
              className="flex-1 px-3 py-2 rounded bg-slate-900"
              value={label}
              onChange={(e) => setlabel(e.target.value)}
              placeholder="Label (X axis)"
            />
            <input
              className="w-28 px-3 py-2 rounded bg-slate-900"
              value={users}
              onChange={(e) => setusers(e.target.value)}
              placeholder="Users"
            />
            <input
              className="w-28 px-3 py-2 rounded bg-slate-900"
              value={sales}
              onChange={(e) => setsales(e.target.value)}
              placeholder="Sales"
            />
            <button type="submit" className="bg-sky-500 px-4 py-2 rounded">
              {editingIndex !== null ? "Update" : "Add"}
            </button>
          </div>
          {editingIndex !== null && (
            <p className="mt-2 text-sm text-yellow-400">
              Editing row #{editingIndex + 1}. Click "Update" to save changes or
              clear the form to cancel.
            </p>
          )}
        </form>
      </div>

      {/* header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Current Data ({data.length})</h2>
        <small className="text-slate-400">Saved to localStorage</small>
      </div>

      {/* table container with internal vertical scroll */}
      <div className="max-h-[70vh] overflow-y-auto rounded border border-slate-700">
        <table className="w-full bg-slate-800">
          <thead>
            <tr className="text-left text-slate-300 sticky top-0 bg-slate-800/80">
              <th className="px-3 py-2 w-[48px]">#</th>
              <th className="px-3 py-2">Label</th>
              <th className="px-3 py-2 text-right w-[110px]">Users</th>
              <th className="px-3 py-2 text-right w-[110px]">Sales</th>
              <th className="px-3 py-2 text-right w-[160px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-slate-400">
                  No data yet
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-t border-slate-700 odd:bg-slate-800 even:bg-slate-900/20 ${
                    editingIndex === idx ? "bg-slate-700/40" : ""
                  }`}
                >
                  <td className="px-3 py-2 align-top text-slate-400">
                    {idx + 1}
                  </td>

                  {/* Label - wraps */}
                  <td
                    className="px-3 py-2 break-words whitespace-normal max-w-[220px] align-top"
                    title={row.label}
                  >
                    {row.label}
                  </td>

                  {/* Users - wraps, right aligned */}
                  <td
                    className="px-3 py-2 break-words whitespace-normal max-w-[110px] text-right align-top"
                    title={row.users}
                  >
                    {row.users}
                  </td>

                  {/* Sales - wraps, right aligned */}
                  <td
                    className="px-3 py-2 break-words whitespace-normal max-w-[110px] text-right align-top"
                    title={row.sales}
                  >
                    {row.sales}
                  </td>

                  {/* Action */}
                  <td className="px-3 py-2 text-right w-[160px] align-top space-x-2">
                    <button
                      onClick={() => startEdit(idx)}
                      className="border px-2 py-1 rounded bg-slate-300 text-slate-900 font-semibold text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="border px-2 py-1 rounded bg-slate-500 text-slate-800 font-semibold text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div
          onClick={() => {
            if (!data || data.length === 0) {
              alert("Please add some data before building charts!");
              return;
            }
            navigate("/charts/area");
          }}
          className="p-4 bg-slate-800 rounded cursor-pointer"
        >
          Area chart
        </div>
        <div
          onClick={() => {
            if (!data || data.length === 0) {
              alert("Please add some data before building charts!");
              return;
            }
            navigate("/charts/bar");
          }}
          className="p-4 bg-slate-800 rounded cursor-pointer"
        >
          Bar chart
        </div>
        <div
          onClick={() => {
            if (!data || data.length === 0) {
              alert("Please add some data before building charts!");
              return;
            }
            navigate("/charts/line");
          }}
          className="p-4 bg-slate-800 rounded cursor-pointer"
        >
          Line chart
        </div>
      </div>

      <div className="mt-6">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold"
          onClick={() => {
            localStorage.removeItem("chartData");
            setdata([]);
            setEditingIndex(null);
            setlabel("");
            setusers("");
            setsales("");
          }}
        >
          Clear Data
        </button>
      </div>
    </div>
  );
}
