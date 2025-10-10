import http from 'k6/http';
import { sleep,check, fail } from 'k6';
const postUsersLogin =JSON.parse(open('../fixtures/postUsersLogin.json'));
import{pegarBaseUrl} from '../utils/variaveis.js';

export const options = {
//  iterations: 50,  / executa 50 chamadas sequenciais
//vus: 10,    // simula 10 usuários simultaneos
//  duration: '30s',

   stages:[
        {duration: '10s', target: 10},
        {duration: '20s', target: 10},
        {duration: '10s', target: 30},
        {duration: '20s', target: 100},
        {duration: '20s', target: 0}
      ],

    //iterations: 1,
    thresholds: {
    
    http_req_duration: ['p(95)<3000', 'max <5000'], // 95% of requests should be below 5s
    http_req_failed: ['rate<0.01'], // http errors abaixo de 1%
  },
};


export default function () {
  const url = pegarBaseUrl()+'/users/login';
  //postLogin.username = "priscila"; 
  const payload = JSON.stringify(postUsersLogin);
  //console.log(postUsersLogin);


  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
 const msgfalhaexecucao = 'Não foi possível executar os cenário de teste';
 const res = http.post(url, payload, params);
  sleep(1);

console.log(res);

  if(!check(res, {
    'Validar que status é 200': (r) => r.status === 200,
    'Validar que o Token é string':(r) => typeof(r.json().token) == 'string'
  })){
    fail(msgfalhaexecucao);
  };

    
}