import { Router } from 'express';
import { eligibilityController } from './main';

const eligibilityRouter = Router();

eligibilityRouter.post('/lemon', eligibilityController.eligibility);

export default eligibilityRouter;
