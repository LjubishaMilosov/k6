import http from "k6/http";
import { check } from "k6";

export default function () {
  const res = http.get("https://test.k6.io");
  check(res, {
    "status is 200": (r) => r.status === 200,
    "page is Home page": (r) =>
      r.body.includes(
        "Collection of simple web-pages suitable for load testing."
      ),
  });

  
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
