const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAll = async (req, res) => {
  const { startDate, endDate, categoryId, type } = req.query;
  const filters = { userId: req.user.id };

  if (type) filters.type = type;
  if (categoryId) filters.categoryId = categoryId;
  if (startDate || endDate) {
    filters.date = {};
    if (startDate) filters.date.gte = new Date(startDate);
    if (endDate) filters.date.lte = new Date(endDate);
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: filters,
      include: { category: true },
      orderBy: { date: 'desc' },
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId: req.user.id },
      include: { category: true },
    });
    if (!transaction) return res.status(404).json({ message: 'Not found' });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const create = async (req, res) => {
  const { title, amount, type, categoryId, date, note } = req.body;
  try {
    const transaction = await prisma.transaction.create({
      data: {
        title,
        amount,
        type,
        categoryId,
        date: new Date(date),
        note,
        userId: req.user.id,
      },
      include: { category: true },
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId: req.user.id },
    });
    if (!transaction) return res.status(404).json({ message: 'Not found' });

    const updated = await prisma.transaction.update({
      where: { id },
      data: {
        ...req.body,
        date: req.body.date ? new Date(req.body.date) : undefined,
      },
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
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId: req.user.id },
    });
    if (!transaction) return res.status(404).json({ message: 'Not found' });

    await prisma.transaction.delete({ where: { id } });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };