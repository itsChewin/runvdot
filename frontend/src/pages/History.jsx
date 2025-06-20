import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [filterDistance, setFilterDistance] = useState("all");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
        });
    }
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/vdot-history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHistory(
          response.data.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
          )
        );
      } catch (error) {
        console.error("Failed to fetch history", error);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8000/api/vdot-history/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete entry", error);
    }
  };

  return (
    <div className="min-h-screen bg-grayBg px-4 py-10 flex flex-col items-center">
      {user && (
        <div className="w-full max-w-3xl mb-4">
          <h1 className="text-3xl font-bold mb-2 text-black">History</h1>
        </div>
      )}
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-black">{user?.name}</h2>
          <select
            value={filterDistance}
            onChange={(e) => setFilterDistance(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value="all">All Distances</option>
            {[...new Set(history.map((h) => h.distance))].map((d) => (
              <option key={d} value={d}>
                {d} km
              </option>
            ))}
          </select>
        </div>

        {history.length === 0 ? (
          <p className="text-gray-500 text-center">No saved records found.</p>
        ) : (
          <>
            {/* Table */}
            <table className="w-full text-sm text-gray-700">
              <thead className="text-gray-400">
                <tr>
                  <th className="text-left px-2 py-1">Date</th>
                  <th className="text-center px-2 py-1">Distance</th>
                  <th className="text-center px-2 py-1">Time</th>
                  <th className="text-center px-2 py-1">VDOT</th>
                  <th className="text-center px-2 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {history
                  .filter(
                    (item) =>
                      filterDistance === "all" ||
                      item.distance == filterDistance
                  )
                  .sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                  ) // Oldest first
                  .map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="px-2 py-1">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="text-center">{item.distance}</td>
                      <td className="text-center">{item.time}</td>
                      <td className="text-center">{item.vdot}</td>
                      <td className="text-center">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
