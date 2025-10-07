import http from 'k6/http';
import { check, sleep } from 'k6';
import { pegarBaseUrl } from '../utils/variaveis.js';
import { obterToken } from '../helpers/autenticacao.js';

export const options = {
   
    stages:[
        {duration: '5s',  target: 100},
        {duration: '10s', target: 400},  
        {duration: '5s',  target: 600},
        {duration: '10s', target: 800},
        {duration: '5s',  target: 1000},
        {duration: '10s', target: 1000},
        {duration: '5s',  target:  0}   

    ],
   
    thresholds: {
        http_req_duration: ['p(95)<2000'], 
        http_req_failed: ['rate<0.01'], 
    },
};  

export default function () {
    const token = obterToken();
    const url = pegarBaseUrl() + '/transfers';
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };
    const res = http.get(url, params);
    console.log(res.body);
    check(res, {
        'status é 200': (r) => r.status === 200,
        'Response não é vazio': (r) => r.body && r.body.length > 0,  
        
    });
    sleep(2);   
}
