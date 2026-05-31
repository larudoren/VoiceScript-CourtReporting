import { Request, Response } from 'express';
import { calculatePayment } from '../services/paymentCalc';

export const getJobPayment = async (req: Request, res: Response) => {
  try {
    const payment = await calculatePayment(Number(req.params.id));
    res.json(payment);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};