const express = require('express');

const tableController = require('../controllers/table');
const router = express.Router();
router.get('/', tableController.getTables);
router.get('/getTableData/:tableName', tableController.getTableData);

router.post('/addTable', tableController.addTable);
router.post('/addTableData', tableController.addTableData);

router.post('/deleteTableRow', tableController.deleteTableRow);
router.get('/getDataTypes/:tableName', tableController.getDataTypes);

module.exports = router;