let express = require('express');
let router = express.Router();

const customers = require('../controllers/controller.js');

router.post('/api/customers/create', customers.create);
router.get('/api/customers/all', customers.retrieveAllCustomers);
router.get('/api/customers/onebyid/:id', customers.getCustomerById);
router.put('/api/customers/update/:id', customers.updateById);
router.delete('/api/customers/delete/:id', customers.deleteById);
// router.delete('/api/customers/deleteall/', customers.deleteAll);

module.exports = router;
