import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes, getStatusCode } from 'http-status-codes';

import logger from 'monitoring/logger';

/**
 * Usage: When an error occurs use next(new Error(message)); to pass the request to this handler.
 */
export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { message, stack } = error;

  // logging the error for debugging purposes.
  logger.error(
    `Error occurred while calling endpoint ${req.originalUrl} with ${stack}`,
  );

  // If error is not a valid ReasonPhrase, in that case we can just send a generic error message,
  // as errors can sometimes consist of sensitive info.
  if (message && Object.values(ReasonPhrases).includes(message)) {
    return res.status(getStatusCode(message)).json({ message });
  }

  // Default error
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
};
