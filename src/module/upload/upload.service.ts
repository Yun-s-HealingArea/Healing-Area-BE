import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { CloudFrontClient } from '@aws-sdk/client-cloudfront';
import { getSignedUrl } from '@aws-sdk/cloudfront-signer';

@Injectable()
export class UploadService {
  // UploadService 인스턴스가 생성 될 때 AWS S3 클라이언트를 초기화 해버림.
  s3Client: S3Client;
  cloudfrontClient: CloudFrontClient;

  constructor(private configService: ConfigService) {
    // AWS S3 클라이언트 초기화. 환경 설정 정보를 사용하여 AWS 리전, Access Key, Secret Key를 설정.
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'), // AWS Region
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'), // Access Key
        secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY'), // Secret Key
      },
    });
    this.cloudfrontClient = new CloudFrontClient({
      region: this.configService.get('AWS_REGION'), // AWS Region
    });
  }

  async imageUploadToS3(
    folderName: string, // 폴더 이름
    fileName: string, // 파일 이름
    file: Express.Multer.File, // 업로드가 될 파일
    ext: string, // 파일 확장자
  ) {
    // AWS S3에 이미지 업로드 명령을 생성합니다. 파일 이름, 파일 버퍼, 파일 접근 권한, 파일 타입 등을 설정합니다.
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'), // S3 버킷 이름
      Key: folderName + fileName, // 업로드될 파일의 이름
      Body: file.buffer, // 업로드할 파일
      // ACL: 'public-read', // 파일 접근 권한
      ContentType: `image/${ext}`, // 파일 타입
    });

    // S3 클라이언트에 전달후 이미지 업로드 작업 수행.
    await this.s3Client.send(command);

    // 업로드된 이미지의 URL을 반환합니다.
    return `https://s3.${this.configService.get(
      'AWS_REGION',
    )}.amazonaws.com/${this.configService.get(
      'AWS_S3_BUCKET_NAME',
    )}/${fileName}`;
  }

  async getPresignedURL(
    folderName: string,
    imageFileURL: string[],
  ): Promise<string[]>;
  async getPresignedURL(
    folderName: string,
    imageFileURL: string,
  ): Promise<string>;
  async getPresignedURL(
    folderName: string,
    imageFileURL: string | string[],
  ): Promise<string | string[]> {
    // if (Array.isArray(fileName)) {
    // } else {
    // const command = new GetObjectCommand({
    //   Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
    //   Key: folderName + imageFileURL,
    // });
    const cloudFrontDomain = this.configService.get(
      'AWS_CLOUDFRONT_DOMAIN_NAME',
    );
    const encodedPrivateKey = this.configService.get(
      'AWS_CLOUDFRONT_PRIVATE_KEY',
    );
    return getSignedUrl({
      url: `${cloudFrontDomain}/${folderName}${imageFileURL}`,
      keyPairId: this.configService.get('AWS_CLOUDFRONT_KEY_PAIR_ID'),
      privateKey: Buffer.from(encodedPrivateKey, 'base64').toString('utf-8'),
      dateLessThan: this.configService.get('AWS_S3_PRESIGNED_URL_EXPIRES_IN'),
    });
    // }
    //   // async getPresignedURL(folderName: string, fileName: string): Promise<string> {
    //   const command = new GetObjectCommand({
    //     Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
    //     Key: folderName + fileName,
    //   });
    //   return await getSignedUrl(this.s3Client, command, {
    //     expiresIn: this.configService.get('AWS_S3_PRESIGNED_URL_EXPIRES_IN'),
    //   });
    // }
  }
}
