import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { DataSource, QueryRunner } from 'typeorm';
import { IsolationLevel } from './enum/isolation.level.enum';

// IsolationLevel = "READ UNCOMMITTED" | "READ COMMITTED" | "REPEATABLE READ" | "SERIALIZABLE";

@Injectable()
// 요청시 intercept method로 요청 객체 가져옴 -> queryRunner manager request 객체에 담음
// next.handle()로 interceptor 메서드 실행 후 pipe() 메서드 실행 후 작업 정의

//1. 컨트롤러/서비스 실행 전
//   a. 새로운 QueryRunner 인스턴스를 생성하고 트랜잭션 start
//   b. Request 객체에 생성된 QueryRunner 인스턴스를 세팅

// 2. 서비스 로직이 실행 후
//   a. 정상적으로 수행되었다면 QueryRunner 인스턴스를 사용해 변경한 모든 내용을 commit
//   b. 에러가 발생했다면 QueryRunner 인스턴스를 사용해 변경한 모든 내용을 rollback 하고 에러 처리

// 3. QueryRunner 인스턴스 릴리즈
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const queryRunner: QueryRunner = await this.startTransaction(
      IsolationLevel.SERIALIZABLE,
    );
    request.queryRunnerManager = queryRunner.manager;
    //catchError로 에러 발생시 rollback 후 release
    //catch 된 에러를 throw
    // 잘 끝났다면 commit 후 release
    return next.handle().pipe(
      catchError(async (error) => {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();

        if (error instanceof HttpException) {
          throw new BadRequestException(error['response']['message']);
        } else {
          throw new InternalServerErrorException(error);
        }
      }),
      tap(async () => {
        await queryRunner.commitTransaction();
        await queryRunner.release();
      }),
    );
  }

  private async startTransaction(
    isolationLevel: IsolationLevel,
  ): Promise<QueryRunner> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction(isolationLevel);
    return queryRunner;
  }
}
