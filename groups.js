import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{expected_response:true}': ['p(95)<1000'],
        'group_duration{group:::News page}': ['p(95)<8000'],
        'group_duration{group:::Main page}': ['p(95)<6000'],
        'group_duration{group:::Main page::Assets}': ['p(95)<3000']
    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('https://run.mocky.io/v3/8b3fd85c-d2bd-473d-ad66-96e4632c5873?mocky-delay=5000ms');
        check(res, { 'status is 200': (r) => r.status === 200 });
    
        group('Assets', function () {
            http.get('https://run.mocky.io/v3/8b3fd85c-d2bd-473d-ad66-96e4632c5873?mocky-delay=1000ms');
            http.get('https://run.mocky.io/v3/8b3fd85c-d2bd-473d-ad66-96e4632c5873?mocky-delay=1000ms'); 
        });
         
    });

    group('News page', function () {
        http.get('https://run.mocky.io/v3/26f71ed9-fdb5-4d0c-97ff-9db8dd947a18');
    });
    
    sleep(1);
}
