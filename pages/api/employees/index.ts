import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const employees = await prisma.employee.findMany();
      return res.status(200).json(employees);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching employees' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
