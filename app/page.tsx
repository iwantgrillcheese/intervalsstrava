"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    raceType: "70.3",
    raceDate: "",
    ftp: "",
    runThreshold: "",
    swimThreshold: "",
    experience: "intermediate",
    maxHours: "",
    restDay: "Sunday",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <h1 className="text-3xl font-bold mb-10">Triathlon Plan Generator</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <label className="text-sm font-medium text-gray-700">
            Race Type
            <select
              name="raceType"
              value={formData.raceType}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="sprint">Sprint</option>
              <option value="olympic">Olympic</option>
              <option value="70.3">Half Ironman (70.3)</option>
              <option value="140.6">Full Ironman (140.6)</option>
            </select>
          </label>

          <label className="text-sm font-medium text-gray-700">
            Race Date
            <input
              type="date"
              name="raceDate"
              value={formData.raceDate}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 shadow-sm"
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            Bike FTP (watts)
            <input
              type="number"
              name="ftp"
              value={formData.ftp}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 shadow-sm"
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            Run Threshold Pace (min/mile)
            <input
              type="text"
              name="runThreshold"
              value={formData.runThreshold}
              onChange={handleChange}
              placeholder="e.g. 7:30"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 shadow-sm"
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            Swim Threshold Pace (per 100m)
            <input
              type="text"
              name="swimThreshold"
              value={formData.swimThreshold}
              onChange={handleChange}
              placeholder="e.g. 1:38"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 shadow-sm"
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            Experience Level
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 shadow-sm"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>

          <label className="text-sm font-medium text-gray-700">
            Max Weekly Training Hours
            <input
              type="number"
              name="maxHours"
              value={formData.maxHours}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 shadow-sm"
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            Preferred Rest Day
            <select
              name="restDay"
              value={formData.restDay}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 shadow-sm"
            >
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-black text-white py-3 rounded shadow hover:bg-gray-900 transition"
        >
          Generate Plan
        </button>
      </form>
    </main>
  );
}
