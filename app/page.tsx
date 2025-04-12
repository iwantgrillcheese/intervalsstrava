'use client'

import { useState } from 'react'

export default function Home() {
  const [form, setForm] = useState({
    raceType: 'Half Ironman (70.3)',
    raceDate: '',
    bikeFTP: '',
    runPace: '',
    swimPace: '',
    experience: 'Intermediate',
    maxHours: '',
    restDay: 'Sunday',
  })

  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setPlan(null)

    try {
      const res = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      setPlan(data.plan || 'No plan returned.')
    } catch (err) {
      setPlan('Error generating plan.')
    }

    setLoading(false)
  }

  const handleReRoll = async () => {
    setLoading(true)
    setPlan('')

    // Simulate new data for re-rolling
    try {
      const res = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      setPlan(data.plan || 'No plan returned.')
    } catch (err) {
      setPlan('Error generating plan.')
    }

    setLoading(false)
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">TrainGTP</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Other fields */}
          <div>
            <label>Race Date</label>
            <input type="date" name="raceDate" onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          {/* More form inputs as needed */}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </form>

      {/* Plan Preview */}
      {plan && (
        <div className="mt-8 whitespace-pre-wrap border p-4 rounded bg-gray-100">
          {/* Previewing the first 3 days */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {plan.slice(0, 3).map((day, index) => (
              <div key={index} className="p-4 bg-white border rounded shadow-lg">
                <h3 className="font-bold mb-2">Day {index + 1}</h3>
                <p><strong>Bike:</strong> {day.bike}</p>
                <p><strong>Run:</strong> {day.run}</p>
                <p><strong>Swim:</strong> {day.swim}</p>
              </div>
            ))}
          </div>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
            onClick={handleReRoll}
            disabled={loading}
          >
            Re-roll Plan
          </button>
        </div>
      )}
    </main>
  )
}
