import http from 'k6/http';

export default async function () {
  // const options = {
  //   discardResponseBodies: true,
  //   scenarios: {
  //     contacts: {
  //       executor: 'constant-arrival-rate',
  //
  //       // 테스트는 총 30초 동안 지속되어야 한다.
  //       duration: '30s',
  //
  //       //  timeUnit당 30번의 반복을 시작해야한다. 반복 시작점에 유의하라.
  //       //  timeUnit 기간에 고르게 분산된다.
  //       rate: 30,
  //
  //       //  초당 rate 반복을 시작해야한다.
  //       timeUnit: '1m',
  //
  //       //  테스트를 시작하기 전에 2개의 VU를 미리 할당해야 한다.
  //       preAllocatedVUs: 2,
  //
  //       // 정의된 일정 도착율을 유지하기 위해 최대 50개의 VU를 회전할 수 있다.
  //       maxVUs: 50,
  //     },
  //   },
  // };
  const url = 'http://localhost:8000/api/v1/boards/3/views';
  const payload = JSON.stringify({
    userId: 1,
    title: '게시글 테스트11',
    description: '게시글 테스트11',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJleGFtcGxlQGVtYWlsLmNvbSIsImlzcyI6Inl1bi1oZWFsaW5nLWFyZWEuc3RvcmUiLCJzdWIiOiJhY2Nlc3NUb2tlbiIsImlhdCI6MTcwNzE0MjEyMSwiZXhwIjoxNzA3MTQyNzIxfQ.bBCcmuncPjGFro4lfgPCC80NBjNg1EUXQWGEELLzzpk`,
    },
  };
  await http.post(url, payload, params);
  console.log(await http.post(url, payload, params));
  // sleep(1);
}
