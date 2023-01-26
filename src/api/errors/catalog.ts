import { StatusCodes } from 'http-status-codes'

export enum ErrorTypes {
  GenericError = 'GenericError',
  BadRequest = 'BadRequest',
}

interface ErrorResponseObject {
  message: string
  httpStatus: number
}

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
}

export const errorCatalog: ErrorCatalog = {
  GenericError: {
    message: 'Something wrong happend',
    httpStatus: StatusCodes.INTERNAL_SERVER_ERROR
  },
  BadRequest: {
    message: 'Something wrong happend',
    httpStatus: StatusCodes.BAD_REQUEST
  },
}
