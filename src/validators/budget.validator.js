const { z } = require('zod');

const budgetSchema = z.object({
  amount: z.number().positive(),
  categoryId: z.string().uuid(),
  period: z.string().optional(),
});

module.exports = { budgetSchema };