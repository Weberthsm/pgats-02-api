import http from 'k6/http';
import { sleep, check,fail } from 'k6';
import{pegarBaseUrl, pegarNome} from '../utils/variaveis.js';
const postUsersRegister = JSON.parse(open('../fixtures/postUsersRegister.json'));


export const options ={
    
    stages:[
        {duration:  '5s', target:5},
        {duration: '10s', target:10},
        {duration:  '5s', target:5}
    ],
    
    //iterations: 1,
    
      thresholds:{
          http_req_duration: ['p(95)<3000', 'max <4000'], // 95% of requests should be below 4000ms
          http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      }

}


export default function () {
    const url = pegarBaseUrl()+'/users/register';
    
    // Cria uma cópia profunda do objeto
    const bodyPostUsersRegister = JSON.parse(JSON.stringify(postUsersRegister));
    
    bodyPostUsersRegister.username = pegarNome();
    bodyPostUsersRegister.favorecidos = [pegarNome()];
    
    const payload = JSON.stringify(bodyPostUsersRegister);


  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
 
 
 const res = http.post(url, payload, params);
 sleep(1);


  check(res, {
    'Validar que status é 201': (r) => r.status === 201    
  })
   
}
