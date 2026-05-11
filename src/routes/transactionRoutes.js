const router = require('express').Router();
const { getAll, getOne, create, update, remove } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validate.middleware');
const { transactionSchema } = require('../validators/transaction.validator');

router.use(protect);
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', validate(transactionSchema), create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;