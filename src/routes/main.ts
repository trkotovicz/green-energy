import EligibilityController from '../controllers/Eligibility';
import EligibilityService from '../services/Eligibility';

const eligibilityService = new EligibilityService();
const eligibilityController = new EligibilityController(eligibilityService);

export { eligibilityController }
