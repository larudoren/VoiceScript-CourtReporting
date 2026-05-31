import { Request, Response } from 'express';
import { prisma } from '../db/prisma';

export const createJob = async (req: Request, res: Response) => {
  try {
    const { caseName, duration, locationType, city } = req.body;
    if (locationType === 'physical' && !city) {
      return res.status(400).json({ error: 'City required for physical jobs' });
    }
    const job = await prisma.job.create({
      data: { caseName, duration, locationType, city, status: 'NEW' }
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
};

export const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await prisma.job.findMany({
    include: { reporter: true, editor: true }
  });
  res.json(jobs);
};

export const updateJobStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const job = await prisma.job.findUnique({ where: { id: Number(id) } });
  if (!job) return res.status(404).json({ error: 'Job not found' });

  // State machine validation
  const transitions: Record<string, string[]> = {
    NEW: ['ASSIGNED'],
    ASSIGNED: ['TRANSCRIBED'],
    TRANSCRIBED: ['REVIEWED'],
    REVIEWED: ['COMPLETED'],
    COMPLETED: []
  };
  if (!transitions[job.status].includes(status)) {
    return res.status(400).json({ error: `Invalid transition: ${job.status} → ${status}` });
  }
  
  if (status === 'REVIEWED' && !job.editorId) {
    return res.status(400).json({ error: 'Cannot review without assigned editor' });
  }
  const updated = await prisma.job.update({
    where: { id: Number(id) },
    data: { status },
    include: { reporter: true, editor: true }
  });
  res.json(updated);
};