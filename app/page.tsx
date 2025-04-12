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

  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setPlan('')

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
        {/* Form content here (same as before) */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </form>

      {plan && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Preview Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card for Swim */}
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-blue-500">Swim</h3>
              <div className="text-sm text-gray-500">Duration: 45 minutes</div>
              <div className="text-sm text-gray-500">Effort: Moderate</div>
              <p className="mt-2 text-sm text-gray-700">{plan.slice(0, 200)}...</p> {/* Slice for preview */}
            </div>
            {/* Card for Bike */}
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-green-500">Bike</h3>
              <div className="text-sm text-gray-500">Duration: 1 hour</div>
              <div className="text-sm text-gray-500">Effort: High</div>
              <p className="mt-2 text-sm text-gray-700">{plan.slice(201, 400)}...</p>
            </div>
            {/* Card for Run */}
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-yellow-500">Run</h3>
              <div className="text-sm text-gray-500">Duration: 45 minutes</div>
              <div className="text-sm text-gray-500">Effort: Moderate</div>
              <p className="mt-2 text-sm text-gray-700">{plan.slice(401, 600)}...</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
