'use client';
import { useState } from 'react';
import { useJobStore } from '../store/jobStore';

export default function JobForm({ onClose }: { onClose: () => void }) {
  const createJob = useJobStore((s) => s.createJob);
  const [caseName, setCaseName] = useState('');
  const [duration, setDuration] = useState(60);
  const [locationType, setLocationType] = useState('remote');
  const [city, setCity] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createJob({ caseName, duration, locationType, city: locationType === 'physical' ? city : null });
    onClose();
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-3">Create New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="border p-2 w-full" placeholder="Case name" value={caseName} onChange={e => setCaseName(e.target.value)} required />
        <input className="border p-2 w-full" type="number" placeholder="Duration (minutes)" value={duration} onChange={e => setDuration(Number(e.target.value))} required />
        <select className="border p-2 w-full" value={locationType} onChange={e => setLocationType(e.target.value)}>
          <option value="remote">Remote</option>
          <option value="physical">Physical</option>
        </select>
        {locationType === 'physical' && (
          <input className="border p-2 w-full" placeholder="City" value={city} onChange={e => setCity(e.target.value)} required />
        )}
        <div className="flex gap-2">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}