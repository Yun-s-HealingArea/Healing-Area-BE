# Yun's Healing Area

## 개발환경
<img alt="" src="https://img.shields.io/badge/pnpm-F69220?style=flat&logo=pnpm&logoColor=white"/>  
<img alt="" src="https://img.shields.io/badge/TypeScript 5.3.2-3178C6?style=flat&logo=TypeScript&logoColor=white"/>  
<img alt="" src="https://img.shields.io/badge/Node.js 20.9.0-339933?style=flat&logo=Node.js&logoColor=white"/>
<img alt="" src="https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=NestJS&logoColor=white"/>
<img alt="" src="https://img.shields.io/badge/postgreSQL-4169E1?style=flat&logo=postgreSQL&logoColor=white"/>
<img alt="" src="https://img.shields.io/badge/TypeORM 0.3.17-880000?style=flat&logo=&logoColor=white"/>
<img alt="" src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=Docker&logoColor=white"/>

## 개발환경 설치 및 실행 가이드
> 로컬 포트 : 8000  
> DB 포트 : 5432

차례대로 따라해주세요.

- #### nvm 버전 변경
> nvm install  
> nvm use

- #### .env 파일 생성
- .env 파일은 루트에 위치해야 합니다.
- .env 파일은 아래의 .env 구성을 참고하여 작성해주세요.
> POSTGRES_HOST=host.docker.internal
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=postgres
PORT=8000
NODE_ENV=DEV
HEALING_AREA_URL=http://localhost:8000/api/v1
TYPEORM_SEEDING_FACTORIES=src/seed/factories/**/*{.ts,.js}
TYPEORM_SEEDING_SEEDS=src/seed/seeders/**/*{.ts,.js}

- #### 패키지 설치 
> npm install -g pnpm  
> pnpm i

- #### DB 컨테이너 실행
> docker-compose up -d

- #### 서버 실행 & DB 테이블 생성
> pnpm run start:dev

- #### DB SEEDING
- DB 시딩은 실행 1번당 게시글 50개,  
- 댓글은 각 게시글당 20개 총 1000개가 생성됩니다.
> pnpm seed:run

- #### 서버 재가동
> pnpm run start:dev

## Swagger
* [로컬 Swagger 환경 바로가기](http://localhost:8000/api/v1/api-docs)

## 폴더 구조
```
📦src
 ┣ 📂common
 ┃ ┣ 📂abstract
 ┃ ┣ 📂constant
 ┃ ┣ 📂enum
 ┃ ┣ 📂filter
 ┃ ┣ 📂function
 ┃ ┣ 📂interceptor
 ┃ ┗ 📂interface
 ┣ 📂config
 ┃ ┣ 📂app
 ┃ ┗ 📂database
 ┣ 📂database
 ┃ ┣ 📂factory
 ┃ ┗ 📂seeds
 ┣ 📂module
 ┃ ┗ 📂feature
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┣ 📂entity
 ┃ ┃ ┣ 📂interface
 ┃ ┃ ┣ 📜feature.controller.ts
 ┃ ┃ ┣ 📜feature.module.ts
 ┃ ┃ ┣ 📜feature.repository.ts
 ┃ ┃ ┗ 📜feature.service.ts
 ┗ 📂util
 ┃ ┣ 📂function
 ┃ ┣ 📂type
 ┃ ┗ 📂validator
 ┣ 📜app.controller.ts
 ┣ 📜app.module.ts
 ┣ 📜app.service.ts
 ┣ 📜main.ts
```

## 커밋 컨벤션
* 커밋 제목은 50자를 최대한 넘지 않도록 합니다.
* 내용은 작업 상세 내용을 알 수 있게 자세하면 자세할수록 좋습니다.
* 기능 단위 커밋을 진행합니다.

| 분류        | 내용                           |
|-----------|------------------------------|
| ✨ 기능 추가   | ✨FEAT : Auth Guard           |
| 🐛 버그 수정  | 🐛FIX : Role Guard           |
| 📝 문서 작업  | 📝DOCS : README on root      |
| 🎭 스타일 변경 | 🎭STYLE : eslint             |
| ❌ 파일 삭제   | ❌DELETE : docker-compose.yml |
| 🚑 긴급 수정  | 🚑HOTFIX : Login access token |
| ♻ 리팩토링    | ♻REFACTOR : jwt.strategy     |
| ✅ 테스트 코드  | ✅TEST : Auth Guard           |
| 🚚 기타     | 🚚ETC : package.json         |

