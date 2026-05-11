const { z } = require('zod');

const categorySchema = z.object({
  name: z.string().min(1),
  type: z.enum(['INCOME', 'EXPENSE']),
});

module.exports = { categorySchema };