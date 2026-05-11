const router = require('express').Router();
const { getAll, create, update, remove } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validate.middleware');
const { categorySchema } = require('../validators/category.validator');

router.use(protect);
router.get('/', getAll);
router.post('/', validate(categorySchema), create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;