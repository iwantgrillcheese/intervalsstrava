"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    raceType: "Half Ironman (70.3)",
    raceDate: "",
    ftp: "",
    runPace: "",
    swimPace: "",
    experience: "Intermediate",
    maxHours: "",
    restDay: "Sunday",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // TODO: call backend API to generate plan
  };

  return (
    <main className="min-h-screen bg-white text-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Triathlon Plan Generator</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Race Type</label>
            <select name="raceType" value={formData.raceType} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option>Sprint</option>
              <option>Olympic</option>
              <option>Half Ironman (70.3)</option>
              <option>Ironman (140.6)</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Race Date</label>
            <input type="date" name="raceDate" value={formData.raceDate} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Bike FTP (watts)</label>
              <input type="number" name="ftp" value={formData.ftp} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Run Threshold Pace (min/mi)</label>
              <input type="text" name="runPace" value={formData.runPace} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="e.g. 7:30" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Swim Threshold Pace (per 100m)</label>
              <input type="text" name="swimPace" value={formData.swimPace} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="e.g. 1:38" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Experience Level</label>
              <select name="experience" value={formData.experience} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Max Weekly Training Hours</label>
              <input type="number" name="maxHours" value={formData.maxHours} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Preferred Rest Day</label>
              <select name="restDay" value={formData.restDay} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option>Sunday</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
              </select>
            </div>
          </div>

          <button type="submit" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">Generate Plan</button>
        </form>
      </div>
    </main>
  );
}
