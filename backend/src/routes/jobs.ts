import { Router } from 'express';
import { createJob, getAllJobs, updateJobStatus } from '../controllers/jobController';
import { assignReporterToJob, assignEditorToJob } from '../controllers/assignmentController';
import { getJobPayment } from '../controllers/paymentController';

const router = Router();

router.post('/', createJob);
router.get('/', getAllJobs);
router.put('/:id/status', updateJobStatus);
router.post('/:id/assign-reporter', assignReporterToJob);
router.post('/:id/assign-editor', assignEditorToJob);
router.get('/:id/payment', getJobPayment);

export default router;