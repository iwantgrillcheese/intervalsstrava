export default function Home() {
  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-center mb-10">TrainGTP</h1>

      <form className="space-y-6 max-w-2xl mx-auto">
        <div>
          <label className="block font-medium">Race Type</label>
          <select className="w-full p-2 border rounded">
            <option>Sprint</option>
            <option>Olympic</option>
            <option>Half Ironman (70.3)</option>
            <option>Full Ironman (140.6)</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Race Date</label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium">Bike FTP (watts)</label>
            <input type="number" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium">Run Threshold Pace (min/mi)</label>
            <input type="text" placeholder="e.g. 7:30" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium">Swim Threshold Pace (per 100m)</label>
            <input type="text" placeholder="e.g. 1:38" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium">Experience Level</label>
            <select className="w-full p-2 border rounded">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Max Weekly Training Hours</label>
            <input type="number" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium">Preferred Rest Day</label>
            <select className="w-full p-2 border rounded">
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
          </div>
        </div>

        <button type="submit" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
          Generate Plan
        </button>
      </form>
    </main>
  );
}
