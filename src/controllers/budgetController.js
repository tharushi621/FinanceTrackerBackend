const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAll = async (req, res) => {
  try {
    const budgets = await prisma.budget.findMany({
      where: { userId: req.user.id },
      include: { category: true },
    });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const budgetsWithSpending = await Promise.all(
      budgets.map(async (budget) => {
        const spent = await prisma.transaction.aggregate({
          where: {
            userId: req.user.id,
            categoryId: budget.categoryId,
            type: 'EXPENSE',
            date: { gte: startOfMonth },
          },
          _sum: { amount: true },
        });
        return {
          ...budget,
          spent: spent._sum.amount || 0,
          isExceeded: (spent._sum.amount || 0) > budget.amount,
        };
      })
    );

    res.json(budgetsWithSpending);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const create = async (req, res) => {
  const { amount, categoryId, period } = req.body;
  try {
    const budget = await prisma.budget.create({
      data: {
        amount,
        categoryId,
        period: period || 'MONTHLY',
        userId: req.user.id,
      },
      include: { category: true },
    });
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const budget = await prisma.budget.findFirst({
      where: { id, userId: req.user.id },
    });
    if (!budget) return res.status(404).json({ message: 'Not found' });

    const updated = await prisma.budget.update({
      where: { id },
      data: req.body,
      include: { category: true },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const budget = await prisma.budget.findFirst({
      where: { id, userId: req.user.id },
    });
    if (!budget) return res.status(404).json({ message: 'Not found' });

    await prisma.budget.delete({ where: { id } });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAll, create, update, remove };