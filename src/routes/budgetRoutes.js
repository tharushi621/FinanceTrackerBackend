const router = require('express').Router();
const { getAll, create, update, remove } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validate.middleware');
const { budgetSchema } = require('../validators/budget.validator');

router.use(protect);
router.get('/', getAll);
router.post('/', validate(budgetSchema), create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;