import { Request, Response } from 'express';
import { assignBestReporter } from '../services/assignmentLogic';
import { prisma } from '../db/prisma';

export const assignReporterToJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await assignBestReporter(Number(id));
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const assignEditorToJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { editorId } = req.body;
  const job = await prisma.job.findUnique({ where: { id: Number(id) } });
  if (!job) return res.status(404).json({ error: 'Job not found' });
  if (job.status !== 'TRANSCRIBED') {
    return res.status(400).json({ error: 'Can assign editor only after transcription' });
  }
  const editor = await prisma.editor.findUnique({ where: { id: editorId } });
  if (!editor) return res.status(404).json({ error: 'Editor not found' });

  const updated = await prisma.job.update({
    where: { id: Number(id) },
    data: { editorId, status: 'REVIEWED' },
    include: { reporter: true, editor: true }
  });
  res.json(updated);
};