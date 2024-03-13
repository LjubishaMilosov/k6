import http from "k6/http";
import { check } from "k6";
import {sleep} from 'k6';
import exec from 'k6/execution';

export const options = {
      vus: 10,
      duration: '10s',
      thresholds: {
        http_req_duration: ['p(95)<200'],
        http_req_duration: ['max<2000'],
        http_req_failed: ['rate<0.2'],
        http_reqs: ['count>20'],
        http_reqs: ['rate>3'], 
        vus: ['value>6'],
        checks: ['rate>=0.98']
      }
    
};

export default function () {
  const res = http.get("https://test.k6.io" + (exec.scenario.iterationInTest === 1 ? 'foo' : ''));
  console.log(exec.scenario.iterationInTest);
  check(res, {
    "status is 200": (r) => r.status === 200,
    "page is Home page": (r) =>
      r.body.includes(
        "Collection of simple web-pages suitable for load testing."
      ),
  });
      sleep(2);
  
  //check(res, { "status is 200": (r) => r.status === 200 });


  //   check(res, {
  //     "page is Landing page": (r) =>
  //       r.body.includes(
  //         "Collection of simple web-pages suitable for load testing."
  //       ),
  //   });

  //console.log(res.status);
  // console.log(res.body);

}
