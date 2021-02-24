const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/Question');

router.post('/list',  QuestionController.Get_All_Questions);
router.post('/create',  QuestionController.Set_Questions);
router.post('/update',  QuestionController.Update_Questions);
router.post('/delete',  QuestionController.Delete_Questions);
router.post('/list-details',  QuestionController.Get_Questions_Details);

module.exports = router;