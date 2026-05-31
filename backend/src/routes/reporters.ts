import { Router } from 'express';
import { prisma } from '../db/prisma';

const router = Router();
router.get('/', async (req, res) => {
  const reporters = await prisma.reporter.findMany();
  res.json(reporters);
});
export default router;