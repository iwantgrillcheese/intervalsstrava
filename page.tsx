'use client';

import React, { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    raceType: '',
    raceDate: '',
    bikeFTP: '',
    runPace: '',
    swimPace: '',
    experience: '',
    maxHours: '',
    restDay: '',
  });

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const dummyOutput = {
    Friday: [
      '🏊 AM: 30 min endurance swim @ 1:45/100m',
      '🏃 PM: 45 min easy run @ 8:05/mi <span class="text-green-600 font-semibold">(Z2)</span>',
    ],
    Saturday: [
      '🚴 Brick: 2 hr ride @ <span class="text-green-600 font-semibold">175–185w (Z2)</span>',
      '🏃 20 min transition run @ <span class="text-blue-600 font-semibold">6:45–7:00/mi (race pace)</span>',
    ],
    Sunday: [
      '🏃 Long run: 75 min steady @ <span class="text-orange-600 font-semibold">7:30–7:45/mi</span>',
      '🏊 Optional swim: 15 min easy @ 1:55/100m',
    ],
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setOutput(JSON.stringify(dummyOutput));
      setLoading(false);
    }, 800);
  };

  const workouts = output ? JSON.parse(output) : null;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6 tracking-tight">Smarter Endurance Plans. Instantly.</h1>
      <p className="text-center text-gray-500 text-lg mb-12">
        Generate your personalized triathlon training plan in seconds.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          { id: 'raceType', label: 'Race Type', type: 'select', options: ['Half Ironman (70.3)', 'Ironman (140.6)', 'Olympic', 'Sprint'] },
          { id: 'raceDate', label: 'Race Date', type: 'date' },
          { id: 'bikeFTP', label: 'Bike FTP (watts)', type: 'number' },
          { id: 'runPace', label: 'Run Threshold Pace (min/mi)', type: 'text', placeholder: 'e.g. 7:30' },
          { id: 'swimPace', label: 'Swim Threshold Pace (per 100m)', type: 'text', placeholder: 'e.g. 1:38' },
          { id: 'experience', label: 'Experience Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced'] },
          { id: 'maxHours', label: 'Max Weekly Training Hours', type: 'number' },
          { id: 'restDay', label: 'Preferred Rest Day', type: 'select', options: ['Sunday', 'Monday', 'Friday'] },
        ].map(({ id, label, type, options, placeholder }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-semibold mb-1">{label}</label>
            {type === 'select' ? (
              <select id={id} name={id} onChange={handleChange} className="w-full border p-2 rounded bg-gray-50">
                <option value="">Select...</option>
                {options?.map(option => <option key={option}>{option}</option>)}
              </select>
            ) : (
              <input
                type={type}
                id={id}
                name={id}
                placeholder={placeholder}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-50"
              />
            )}
          </div>
        ))}

        <div className="md:col-span-2 flex justify-center pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-orange-500 text-white font-medium text-sm tracking-wide rounded-full hover:bg-orange-600 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Plan'}
          </button>
        </div>
      </form>

      {workouts && (
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {Object.entries(workouts).map(([day, sessions]) => (
            <div
              key={day}
              className="bg-gradient-to-br from-white to-orange-50 p-6 rounded-2xl shadow-md border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-4">{day}</h3>
              <ul className="space-y-2 text-sm leading-relaxed text-gray-800">
                {(sessions as string[]).map((s, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: s }} />
                ))}
              </ul>
            </div>
          ))}
        </div>
        
      )}
      {/* Floating Coach Bubble */}
<div className="fixed bottom-6 right-6 z-50">
  <button className="bg-white px-5 py-3 rounded-full shadow-xl border border-gray-300 text-sm text-gray-700 hover:shadow-2xl transition-all cursor-pointer text-base font-medium">
    🤖 Ask your coach anything
  </button>
</div>
    </main>
  );
}
