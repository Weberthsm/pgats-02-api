import http from 'k6/http';
const postUserLogin =JSON.parse(open('../fixtures/postUsersLogin.json'));
import{pegarBaseUrl} from '../utils/variaveis.js';

export function obterToken() {
    const url = pegarBaseUrl()+'/users/login';
    const payload = JSON.stringify(postUserLogin);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);
    return res.json('token');
}
