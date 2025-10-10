import http from 'k6/http';
import { sleep,check } from 'k6';
import {obterToken} from '../helpers/autenticacao.js';
import{pegarBaseUrl} from '../utils/variaveis.js';
const postTransfers =JSON.parse(open('../fixtures/postTransfers.json'));


export const options = {
    stages:[
        {duration: '5s',  target: 10},
        {duration: '10s', target: 10},
        {duration: '5s',  target: 30},
        {duration: '10s', target: 30},
        {duration: '5s',  target:  0}
      ],
 
//  vus: 10,
//  duration: '30s',
};

export default function() {
  const token = obterToken();
  const url = pegarBaseUrl()+'/transfers';

  const payload = JSON.stringify({
  ...postTransfers,
  from: "julio",
  to: "priscila"
});


 const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  };

 const res = http.post(url, payload, params);
  sleep(1);

// console.log(res);

  check(res, {
    'Validar que status é 201': (r) => r.status === 201,
    'Validar que o Token é string': typeof(token) == 'string'
  });

}
