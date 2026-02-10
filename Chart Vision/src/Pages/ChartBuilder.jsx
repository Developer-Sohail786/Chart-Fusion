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

    if (editingIndex !== null) {
      setdata((prev) =>
        prev.map((row, idx) => (idx === editingIndex ? newRow : row))
      );
      setEditingIndex(null);
    } else {
      setdata((prev) => [...prev, newRow]);
    }

    setlabel("");
    setusers("");
    setsales("");
  }

  function startEdit(idx) {
    const row = data[idx];
    setlabel(row.label);
    setusers(row.users);
    setsales(row.sales);
    setEditingIndex(idx);

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
    <div className="min-h-screen bg-gray-800 text-white p-4 sm:p-6">

      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Build Your Chart here
      </h1>

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
              className="w-full sm:w-28 px-3 py-2 rounded bg-slate-900"
              value={users}
              onChange={(e) => setusers(e.target.value)}
              placeholder="Users"
            />

            <input
              className="w-full sm:w-28 px-3 py-2 rounded bg-slate-900"
              value={sales}
              onChange={(e) => setsales(e.target.value)}
              placeholder="Sales"
            />

            <button
              type="submit"
              className="bg-sky-500 px-4 py-2 rounded"
            >
              {editingIndex !== null ? "Update" : "Add"}
            </button>
          </div>

          {editingIndex !== null && (
            <p className="mt-2 text-sm text-yellow-400">
              Editing row #{editingIndex + 1}. Click "Update" to save changes.
            </p>
          )}
        </form>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
        <h2 className="text-lg sm:text-xl font-semibold">
          Current Data ({data.length})
        </h2>
        <small className="text-slate-400">Saved to localStorage</small>
      </div>

      <div className="max-h-[65vh] overflow-y-auto overflow-x-auto rounded border border-slate-700">
        <table className="w-full min-w-[520px] bg-slate-800">
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
                  <td className="px-3 py-2 text-slate-400 align-top">
                    {idx + 1}
                  </td>

                  <td className="px-3 py-2 break-words max-w-[220px] align-top">
                    {row.label}
                  </td>

                  <td className="px-3 py-2 text-right break-words max-w-[110px] align-top">
                    {row.users}
                  </td>

                  <td className="px-3 py-2 text-right break-words max-w-[110px] align-top">
                    {row.sales}
                  </td>

                  <td className="px-3 py-2 text-right space-x-2 align-top">
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
            if (!data.length) return alert("Please add some data first!");
            navigate("/charts/area");
          }}
          className="p-4 bg-slate-800 rounded cursor-pointer text-center"
        >
          Area chart
        </div>

        <div
          onClick={() => {
            if (!data.length) return alert("Please add some data first!");
            navigate("/charts/bar");
          }}
          className="p-4 bg-slate-800 rounded cursor-pointer text-center"
        >
          Bar chart
        </div>

        <div
          onClick={() => {
            if (!data.length) return alert("Please add some data first!");
            navigate("/charts/line");
          }}
          className="p-4 bg-slate-800 rounded cursor-pointer text-center"
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

    </div>
  );
}

