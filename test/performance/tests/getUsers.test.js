import http from 'k6/http';
import { check, sleep } from 'k6';
import { pegarBaseUrl } from '../utils/variaveis.js';

export const options = {
   vus: 1000, 
   duration: '15s', 
 

    thresholds: {
        http_req_duration: ['p(95)<200'], 
        http_req_failed: ['rate<0.01'], 
    },
};

export default function () {
    const url = pegarBaseUrl() + '/users';
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.get(url, params);
    console.log(res.body);
    check(res, {
        'status is 200': (r) => r.status === 200,
        'body is not empty': (r) => r.body && r.body.length > 0,  
    });

    sleep(1); 
}