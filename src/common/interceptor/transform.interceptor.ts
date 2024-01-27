import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { format } from "date-fns";
import { Response } from "../interface/response.interface";
import { DateFormat } from "../enum/dateformat.enum";

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();
    const statusCode = response.statusCode;
    const message = response.message;
    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message,
        data,
        timestamp: format(
          new Date(),
          DateFormat.YEAR_MONTH_DAY_HOUR_MINUTE_SECOND_FORMAT,
        ),
        path: request.url,
      })),
    );
  }
}
