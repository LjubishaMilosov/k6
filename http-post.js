import http from "k6/http";
import { check } from "k6";

export default function () {
  const credentials = {
    username: "test_" + Date.now(),
    password: "secret_" + Date.now(),
  };

  http.post(
    "https://test-api.k6.io/user/register/",
    JSON.stringify(credentials),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let res = http.post(
    "https://test-api.k6.io/auth/token/login/",
    JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const accessToken = res.json().access;
  console.log(accessToken);

  http.get("https://test-api.k6.io/my/crocodiles", {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });

  res = http.post(
    "https://test-api.k6.io/my/crocodiles/",
    JSON.stringify({
      name: "Random croc",
      sex: "M",
      date_of_birth: "1900-10-28",
    }),
    {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );

  const newCrocodileId = res.json().id;

  res = http.get(`https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`, 
  {
    headers: 
    {
      Authorization: "Bearer " + accessToken,
    },
  });
  check(res, {
    'status is 20': (r) => r.status === 200,
    'crocoile id':(r) => r.json().id === newCrocodileId,
    'crocoile name':(r) => r.json().name === "Random croc"
  });
  

}

// //   k6 run --http-debug="full" http-post.js