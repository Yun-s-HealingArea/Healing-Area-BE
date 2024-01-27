import { ConfigService } from '@nestjs/config';
import * as ip from 'ip';
import { INestApplication } from '@nestjs/common';
import * as os from 'os';
export function appStartMessage<T extends INestApplication>(app: T): void {
  const myIp = ip.address();
  const configService = app.get(ConfigService);
  const NODE_ENV = configService.get('NODE_ENV');
  const PORT = configService.get('PORT');
  console.log(
    `------------------------------Hello, World!-------------------------------\r\n`,
    `Server is Successfully Running.\r\n`,
    `Node Version : ${process.version}\r\n`,
    `CPU Core : ${os.cpus().length}\r\n`,
    `Host Platform : ${process.platform}\r\n`,
    `Host Architecture : ${process.arch}\r\n`,
    `Host Name : ${os.hostname()}\r\n`,
    `User Home : ${os.userInfo().username}\r\n`,
    `User Home Directory : ${os.userInfo().homedir}\r\n`,
    `Server Port Number : ${PORT}\r\n`,
    `Server Environment : ${NODE_ENV}\r\n`,
    `API IP : ${myIp}\r\n`,
    `API DOCS : http://${myIp}:${PORT}/api-docs\r\n`,
    `------------------------------Hello, World!-------------------------------\r\n`,
  );
}
