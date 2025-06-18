import { useState, useEffect } from "react";
import vdotTable from "../data/vdotTable.json";
import vdotTrainingPaces from "../data/vdot_training_paces.json";

export default function Calculator() {
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [pace, setPace] = useState("");
  const [unit, setUnit] = useState("km");
  const [vdot, setVdot] = useState(null);

  function timeToSeconds(timeStr) {
    const parts = timeStr.split(":").map(Number);
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
      return parts[0];
    }
    return 0;
  }

  const handleCalculate = () => {
    if (!distance || !time) return;

    const totalSeconds = timeToSeconds(time);
    const raceVDOTs = vdotTable[distance.toLowerCase()];
    if (!raceVDOTs) return;

    // Find the closest time match
    let bestVDOT = null;
    let bestDiff = Infinity;
    for (const entry of raceVDOTs) {
      const diff = Math.abs(entry.time_seconds - totalSeconds);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestVDOT = entry.vdot;
      }
    }

    setVdot(bestVDOT);
  };

  const handleReset = () => {
    setDistance("");
    setTime("");
    setPace("");
    setUnit("km");
    setVdot(null);
  };

  // Convert hh:mm:ss to seconds
  const parseTime = (str) => {
    const [h = 0, m = 0, s = 0] = str.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  };

  // Format seconds to mm:ss
  const formatPace = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

useEffect(() => {
  if (time && distance) {
    const timeSec = parseTime(time);
    let distKm =
      distance === "5k"
        ? 5
        : distance === "10k"
        ? 10
        : distance === "half"
        ? 21.0975
        : distance === "full"
        ? 42.195
        : 0;

    if (timeSec > 0 && distKm > 0) {
      const pacePerKm = timeSec / distKm;
      const pacePerMi = pacePerKm * 1.60934;

      const selectedPace =
        unit === "km" ? formatPace(pacePerKm) : formatPace(pacePerMi);
      setPace(selectedPace);
    }
  }
}, [time, distance, unit]); 

const handleTimeChange = (e) => {
  let input = e.target.value.replace(/[^\d]/g, ""); // remove non-digits
  if (input.length > 6) input = input.slice(0, 6); // limit to 6 digits

  // Auto-insert colons
  let formatted = input;
  if (input.length >= 5) {
    formatted = `${input.slice(0, 2)}:${input.slice(2, 4)}:${input.slice(4, 6)}`;
  } else if (input.length >= 3) {
    formatted = `${input.slice(0, 2)}:${input.slice(2, 4)}`;
  }

  setTime(formatted);
};

  const handlePaceChange = (e) => {
    const input = e.target.value;
    const valid = /^(\d{0,2}:)?(\d{0,2})?$/.test(input);
    if (valid) setPace(input);
  };

  const training = vdotTrainingPaces.find((row) => row.vdot === vdot);

  return (
    <div className="min-h-screen bg-grayBg px-4 py-10 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-xl relative">
        <div className="absolute top-[-30px] right-[-30px] w-20 h-20 rounded-full bg-orange text-white text-2xl flex items-center justify-center">
          {vdot !== null ? vdot : ""}
        </div>

        <h2 className="text-xl font-semibold mb-6 text-black">
          VDOT Calculator
        </h2>

        <select
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md text-gray-600"
        >
          <option value="">Event Distance</option>
          <option value="5k">5K</option>
          <option value="10k">10K</option>
          <option value="half">Half Marathon</option>
          <option value="full">Full Marathon</option>
        </select>

        <input
          type="text"
          placeholder="Time (hh:mm:ss)"
          value={time}
          onChange={handleTimeChange}
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="Pace (mm:ss)"
            value={pace}
            onChange={handlePaceChange}
            className="flex-grow px-4 py-2 border rounded-md"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="px-2 py-2 border rounded-md"
          >
            <option value="km">km</option>
            <option value="mile">mile</option>
          </select>
        </div>

        <div className="flex justify-center gap-4">
          <button
            className="bg-orange text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition"
            onClick={handleCalculate}
          >
            Calculate
          </button>
          <button
            className="text-gray-400 px-6 py-2 rounded-full hover:text-black transition"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      {training && (
        <div className="bg-white shadow-md rounded-2xl p-6 mt-10 w-full max-w-3xl">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h3 className="text-lg font-semibold text-orange">Training</h3>
          </div>

          {/* Top table: Easy / Marathon / Threshold / Interval / Repetition */}
          <div className="w-full overflow-x-auto mb-6">
            <table className="w-full text-sm text-gray-700">
              <thead className="text-gray-400">
                <tr>
                  <th className="text-left px-2 py-1">Type</th>
                  <th className="text-center px-2 py-1">Mile</th>
                  <th className="text-center px-2 py-1">Km</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50 rounded">
                  <td className="text-red-600 font-medium px-2 py-1">Easy</td>
                  <td className="text-center">{training.easy.mi}</td>
                  <td className="text-center">{training.easy.km}</td>
                </tr>
                <tr>
                  <td className="text-red-600 font-medium px-2 py-1">
                    Marathon
                  </td>
                  <td className="text-center">{training.marathon.mi}</td>
                  <td className="text-center">{training.marathon.km}</td>
                </tr>
                <tr className="bg-gray-50 rounded">
                  <td className="text-red-600 font-medium px-2 py-1">
                    Threshold
                  </td>
                  <td className="text-center">{training.threshold.mi}</td>
                  <td className="text-center">{training.threshold.km}</td>
                </tr>
                <tr>
                  <td className="text-red-600 font-medium px-2 py-1">
                    Interval
                  </td>
                  <td className="text-center">{training.interval.mi}</td>
                  <td className="text-center">{training.interval.km}</td>
                </tr>
                <tr className="bg-gray-50 rounded">
                  <td className="text-red-600 font-medium px-2 py-1">
                    Repetition
                  </td>
                  <td className="text-center">–</td>
                  <td className="text-center">{training.repetition.km}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bottom table: 200m / 400m reps */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="text-gray-400">
                <tr>
                  <th className="text-left px-2 py-1">Type</th>
                  <th className="text-center px-2 py-1">200m</th>
                  <th className="text-center px-2 py-1">400m</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50 rounded">
                  <td className="text-red-600 font-medium px-2 py-1">
                    Threshold
                  </td>
                  <td className="text-center">–</td>
                  <td className="text-center">{training.threshold["400m"]}</td>
                </tr>
                <tr>
                  <td className="text-red-600 font-medium px-2 py-1">
                    Interval
                  </td>
                  <td className="text-center">–</td>
                  <td className="text-center">{training.interval["400m"]}</td>
                </tr>
                <tr className="bg-gray-50 rounded">
                  <td className="text-red-600 font-medium px-2 py-1">
                    Repetition
                  </td>
                  <td className="text-center">{training.repetition["200m"]}</td>
                  <td className="text-center">{training.repetition["400m"]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
