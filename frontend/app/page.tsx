'use client';
import { useEffect, useState } from 'react';
import { useJobStore } from './store/jobStore';
import JobList from './components/JobList';
import JobForm from './components/JobForm';

export default function Home() {
  const fetchJobs = useJobStore((s) => s.fetchJobs);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📝 Transcription Job Workflow</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        + New Job
      </button>
      {showForm && <JobForm onClose={() => setShowForm(false)} />}
      <JobList />
    </main>
  );
}