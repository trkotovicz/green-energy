import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import EligibilityService from '../services/Eligibility';

export default class EligibilityController {
  constructor(private eligibilityService: EligibilityService) {}

  eligibility = (req: Request, res: Response) => {
    const data = this.eligibilityService.isElegible(req.body);
    res.status(StatusCodes.OK).json(data);
  }
}
