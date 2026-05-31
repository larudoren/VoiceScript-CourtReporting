import { prisma } from '../db/prisma';

const REPORTER_RATE_PER_MIN = 2000; // IDR

export async function calculatePayment(jobId: number) {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { reporter: true, editor: true }
  });
  if (!job) throw new Error('Job not found');

  const reporterEarnings = job.duration * REPORTER_RATE_PER_MIN;
  const editorEarnings = job.editor ? job.editor.flatFee : 0;
  const total = reporterEarnings + editorEarnings;

  return {
    reporterName: job.reporter?.name || 'Not assigned',
    reporterEarnings,
    editorName: job.editor?.name || 'Not assigned',
    editorEarnings,
    total
  };
}