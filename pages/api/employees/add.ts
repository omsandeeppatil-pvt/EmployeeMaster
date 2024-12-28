import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, position } = req.body;

    try {
      const employee = await prisma.employee.create({
        data: { name, email, position },
      });
      return res.status(201).json(employee);
    } catch (error) {
      return res.status(400).json({ error: 'Error creating employee' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
