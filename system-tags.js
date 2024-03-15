import http from "k6/http";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<1000"],
    'http_req_duration{status:200}': ["p(95)<1000"],
    'http_req_duration{status:201}': ["p(95)<1000"]
  }
 
};
export default function() {
  http.get("https://run.mocky.io/v3/dbcfc497-40b3-45a1-bac6-33877eae4620");
  http.get("https://run.mocky.io/v3/f0a713cd-b645-4d46-bda9-91c404df482d?mocky-delay=2000ms");

}