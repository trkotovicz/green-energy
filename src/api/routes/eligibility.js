const { Router } = require('express');
const eligibilityController = require('../controllers/eligibility');

const router = Router();

router.post('/lemon', eligibilityController.eligibility);

module.exports = router;
