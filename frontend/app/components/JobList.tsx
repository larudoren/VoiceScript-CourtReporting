'use client';
import { useJobStore, Job } from '../store/jobStore';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function JobList() {
  const { jobs, assignReporter, assignEditor, updateStatus, getPayment, fetchJobs } = useJobStore();
  const [editors, setEditors] = useState<{ id: number; name: string }[]>([]);
  const [selectedEditor, setSelectedEditor] = useState<Record<number, number>>({});
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchJobs();
      setLoading(false);
    };
    load();
  }, [fetchJobs]);

  useEffect(() => {
    axios.get(`${API}/editors`).then(res => setEditors(res.data)).catch(console.error);
  }, []);

  const handlePayment = async (jobId: number) => {
    const data = await getPayment(jobId);
    setPayment(data);
    setTimeout(() => setPayment(null), 4000);
  };

  const getStatusActions = (job: Job) => {
    // ... same as before
  };

  if (loading) {
    return <div className="p-4 text-center">Loading jobs...</div>;
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="bg-white rounded shadow p-8 text-center text-gray-500">
        📭 No jobs yet. Click "New Job" to create one.
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Case</th>
            <th>Duration</th>
            <th>Location</th>
            <th>Status</th>
            <th>Reporter</th>
            <th>Editor</th>
            <th>Actions</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id} className="border-b">
              <td className="p-3">{job.caseName}</td>
              <td>{job.duration} min</td>
              <td>{job.locationType}{job.city && ` (${job.city})`}</td>
              <td><span className="px-2 py-1 rounded bg-gray-100">{job.status}</span></td>
              <td>{job.reporter?.name || '—'}</td>
              <td>{job.editor?.name || '—'}</td>
              <td>{getStatusActions(job)}</td>
              <td><button onClick={() => handlePayment(job.id)} className="text-blue-600 underline">Calc</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {payment && (
        <div className="p-4 bg-green-100 m-4 rounded">
          <p>💰 Reporter ({payment.reporterName}): Rp {payment.reporterEarnings?.toLocaleString()}</p>
          <p>📝 Editor ({payment.editorName}): Rp {payment.editorEarnings?.toLocaleString()}</p>
          <p className="font-bold">Total: Rp {payment.total?.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}