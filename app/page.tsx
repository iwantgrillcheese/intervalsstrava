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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Race Type</label>
            <select name="raceType" onChange={handleChange} className="w-full border p-2 rounded">
              <option>Half Ironman (70.3)</option>
              <option>Ironman (140.6)</option>
              <option>Olympic</option>
              <option>Sprint</option>
            </select>
          </div>

          <div>
            <label>Race Date</label>
            <input type="date" name="raceDate" onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label>Bike FTP (watts)</label>
            <input type="number" name="bikeFTP" onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label>Run Threshold Pace (min/mi)</label>
            <input name="runPace" placeholder="e.g. 7:30" onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label>Swim Threshold Pace (per 100m)</label>
            <input name="swimPace" placeholder="e.g. 1:38" onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label>Experience Level</label>
            <select name="experience" onChange={handleChange} className="w-full border p-2 rounded">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div>
            <label>Max Weekly Training Hours</label>
            <input type="number" name="maxHours" onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label>Preferred Rest Day</label>
            <select name="restDay" onChange={handleChange} className="w-full border p-2 rounded">
              <option>Sunday</option>
              <option>Monday</option>
              <option>Friday</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </form>

      {plan && (
        <div className="mt-8 whitespace-pre-wrap border p-4 rounded bg-gray-100">
          {plan}
        </div>
      )}
    </main>
  )
}
