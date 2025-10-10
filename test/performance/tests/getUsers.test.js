import http from 'k6/http';
import { check, sleep } from 'k6';
import { pegarBaseUrl } from '../utils/variaveis.js';

export const options = {
//    vus: 200, 
//    duration: '15s', 
   stages:[
        {duration: '5s',  target: 100},
        {duration: '10s', target: 200},  
        {duration: '5s',  target: 300},
        {duration: '10s', target: 400},
        {duration: '5s',  target: 500},
        {duration: '10s', target: 100},
        {duration: '5s',  target:  0}   

    ],

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
   // console.log(res.body);
    check(res, {
        'status é 200': (r) => r.status === 200,
        'body não é vazio': (r) => r.body && r.body.length > 0,  
    });

    sleep(1); 
}