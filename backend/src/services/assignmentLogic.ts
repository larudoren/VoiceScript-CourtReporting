import { prisma } from '../db/prisma';
import { Job } from '@prisma/client';

export async function assignBestReporter(jobId: number) {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { reporter: true }
  });
  if (!job) throw new Error('Job not found');
  if (job.reporterId) throw new Error('Reporter already assigned');

  let reporters;
  if (job.locationType === 'physical' && job.city) {
    
    reporters = await prisma.reporter.findMany({
      where: { available: true, city: job.city }
    });
    if (reporters.length === 0) {
      
      reporters = await prisma.reporter.findMany({ where: { available: true } });
    }
  } else {
    
    reporters = await prisma.reporter.findMany({ where: { available: true } });
  }

  if (reporters.length === 0) throw new Error('No available reporter');

  const chosen = reporters[0]; 
  const updatedJob = await prisma.job.update({
    where: { id: jobId },
    data: { reporterId: chosen.id, status: 'ASSIGNED' }
  });
  return { job: updatedJob, reporter: chosen };
}