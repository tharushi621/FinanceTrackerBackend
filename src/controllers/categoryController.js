const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAll = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { userId: req.user.id },
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const create = async (req, res) => {
  const { name, type } = req.body;
  try {
    const category = await prisma.category.create({
      data: { name, type, userId: req.user.id },
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findFirst({
      where: { id, userId: req.user.id },
    });
    if (!category) return res.status(404).json({ message: 'Not found' });

    const updated = await prisma.category.update({
      where: { id },
      data: req.body,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findFirst({
      where: { id, userId: req.user.id },
    });
    if (!category) return res.status(404).json({ message: 'Not found' });

    await prisma.category.delete({ where: { id } });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAll, create, update, remove };