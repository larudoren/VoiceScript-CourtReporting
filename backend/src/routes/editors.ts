import { Router } from 'express';
import { prisma } from '../db/prisma';

const router = Router();
router.get('/', async (req, res) => {
  const editors = await prisma.editor.findMany();
  res.json(editors);
});
export default router;