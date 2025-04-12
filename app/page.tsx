'use client';

import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    raceType: '70.3',
    raceDate: '',
    ftp: '',
    runPace: '',
    swimPace: '',
    experience: 'intermediate',
    weeklyHours: '',
    restDay: 'Sunday',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    // TODO: send to backend
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Triathlon Plan Generator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Race Type:
          <select name="raceType" value={form.raceType} onChange={handleChange}>
            <option value="Sprint">Sprint</option>
            <option value="Olympic">Olympic</option>
            <option value="70.3">Half Ironman (70.3)</option>
            <option value="140.6">Full Ironman (140.6)</option>
          </select>
        </label>

        <label>
          Race Date:
          <input type="date" name="raceDate" value={form.raceDate} onChange={handleChange} />
        </label>

        <label>
          Bike FTP (watts):
          <input type="number" name="ftp" value={form.ftp} onChange={handleChange} />
        </label>

        <label>
          Run Threshold Pace (min/mile):
          <input type="text" name="runPace" value={form.runPace} onChange={handleChange} placeholder="e.g. 7:30" />
        </label>

        <label>
          Swim Threshold Pace (per 100m):
          <input type="text" name="swimPace" value={form.swimPace} onChange={handleChange} placeholder="e.g. 1:38" />
        </label>

        <label>
          Experience Level:
          <select name="experience" value={form.experience} onChange={handleChange}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>

        <label>
          Max Weekly Training Hours:
          <input type="number" name="weeklyHours" value={form.weeklyHours} onChange={handleChange} />
        </label>

        <label>
          Preferred Rest Day:
          <select name="restDay" value={form.restDay} onChange={handleChange}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </label>

        <button type="submit" className="bg-black text-white py-2 px-4 rounded">
          Generate Plan
        </button>
      </form>
    </main>
  );
}
