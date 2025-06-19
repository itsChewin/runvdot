import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8000/api/vdot-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(response.data);
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
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-6 text-black">History</h2>

        {history.length === 0 ? (
          <p className="text-gray-500 text-center">No saved records found.</p>
        ) : (
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
              {history.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-2 py-1">{new Date(item.created_at).toLocaleDateString()}</td>
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
        )}
      </div>
    </div>
  );
}