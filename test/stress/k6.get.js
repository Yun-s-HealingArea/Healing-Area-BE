import http from 'k6/http';

export default function () {
  http.get('http://localhost:8000/api/v1/boards');
}
