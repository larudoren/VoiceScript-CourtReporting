import { create } from 'zustand';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL;

export interface Job {
  id: number;
  caseName: string;
  duration: number;
  locationType: string;
  city?: string;
  status: string;
  reporter?: { name: string };
  editor?: { name: string };
}

interface JobStore {
  jobs: Job[];
  fetchJobs: () => Promise<void>;
  createJob: (data: any) => Promise<void>;
  assignReporter: (jobId: number) => Promise<void>;
  assignEditor: (jobId: number, editorId: number) => Promise<void>;
  updateStatus: (jobId: number, status: string) => Promise<void>;
  getPayment: (jobId: number) => Promise<any>;
}

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],
  fetchJobs: async () => {
    try {
      const res = await axios.get(`${API}/jobs`);
      set({ jobs: res.data || [] });  
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      set({ jobs: [] });  
    }
  },
  createJob: async (data) => {
    await axios.post(`${API}/jobs`, data);
    await get().fetchJobs();
  },
  assignReporter: async (jobId) => {
    await axios.post(`${API}/jobs/${jobId}/assign-reporter`);
    await get().fetchJobs();
  },
  assignEditor: async (jobId, editorId) => {
    await axios.post(`${API}/jobs/${jobId}/assign-editor`, { editorId });
    await get().fetchJobs();
  },
  updateStatus: async (jobId, status) => {
    await axios.put(`${API}/jobs/${jobId}/status`, { status });
    await get().fetchJobs();
  },
  getPayment: async (jobId) => {
    const res = await axios.get(`${API}/jobs/${jobId}/payment`);
    return res.data;
  }
}));