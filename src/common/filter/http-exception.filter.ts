import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DateFormat } from '../enum/dateformat.enum';
import { format } from 'date-fns';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    response.status(status).json({
      statusCode: status,
      message: exception['response']['message'],
      timestamp: format(
        new Date(),
        DateFormat.YEAR_MONTH_DAY_HOUR_MINUTE_SECOND_FORMAT,
      ),
      path: request.url,
    });
  }
}
