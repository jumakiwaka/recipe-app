const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuffcontroller');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffCtrl.addProducts);

router.get('/', auth, stuffCtrl.getAllProducts);

router.delete('/:id', auth, stuffCtrl.deleteProduct);

router.put('/:id', auth, multer, stuffCtrl.updateProduct);

router.get('/:id', auth, stuffCtrl.getOneProduct);

module.exports = router;