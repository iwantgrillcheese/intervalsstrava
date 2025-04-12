<form onSubmit={handleSubmit} className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label htmlFor="raceType">Race Type</label>
      <select
        id="raceType"
        name="raceType"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option>Half Ironman (70.3)</option>
        <option>Ironman (140.6)</option>
        <option>Olympic</option>
        <option>Sprint</option>
      </select>
    </div>

    <div>
      <label htmlFor="raceDate">Race Date</label>
      <input
        type="date"
        id="raceDate"
        name="raceDate"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
    </div>

    <div>
      <label htmlFor="bikeFTP">Bike FTP (watts)</label>
      <input
        type="number"
        id="bikeFTP"
        name="bikeFTP"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
    </div>

    <div>
      <label htmlFor="runPace">Run Threshold Pace (min/mi)</label>
      <input
        id="runPace"
        name="runPace"
        placeholder="e.g. 7:30"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
    </div>

    <div>
      <label htmlFor="swimPace">Swim Threshold Pace (per 100m)</label>
      <input
        id="swimPace"
        name="swimPace"
        placeholder="e.g. 1:38"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
    </div>

    <div>
      <label htmlFor="experience">Experience Level</label>
      <select
        id="experience"
        name="experience"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
    </div>

    <div>
      <label htmlFor="maxHours">Max Weekly Training Hours</label>
      <input
        type="number"
        id="maxHours"
        name="maxHours"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
    </div>

    <div>
      <label htmlFor="restDay">Preferred Rest Day</label>
      <select
        id="restDay"
        name="restDay"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
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
