import http from 'k6/http';

export const options = {
  // see https://k6.io/docs/using-k6/options/#discard-response-bodies
  // discardResponseBodies: true,
  // see https://k6.io/docs/using-k6/options/#stages
  // ex) 30초 동안 10명
  stages: [{ duration: '30s', target: 10 }],
  // see https://k6.io/docs/using-k6/options/#hosts
  // hosts: {
  //   'test.k6.io': '1.2.3.4',
  //   'test.k6.io:443': '1.2.3.4:8443',
  // },
  hosts: {
    'localhost:8000': '',
  },
};

export default function () {
  const url = 'localhost:8000/api/v1/auth/login';
  const payload = JSON.stringify({
    api_key: 'xxxxx',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}
