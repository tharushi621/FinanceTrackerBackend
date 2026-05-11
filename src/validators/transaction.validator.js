const { z } = require('zod');

const transactionSchema = z.object({
  title: z.string().min(1),
  amount: z.number().positive(),
  type: z.enum(['INCOME', 'EXPENSE']),
  categoryId: z.string().uuid(),
  date: z.string(),
  note: z.string().optional(),
});

module.exports = { transactionSchema };