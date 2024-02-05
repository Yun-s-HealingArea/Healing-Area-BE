import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//만든 interceptor 객체를 request 객체로부터 뽑아오는 decorator
export const TransactionManager = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.queryRunnerManager;
  },
);
