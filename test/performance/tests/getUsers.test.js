import http, { url } from 'k6/http';
import { check,sleep } from 'k6';
import { pegarBaseUrl } from '../utils/variaveis';


export default function(){

    url = pegarBaseUrl() + '/users';
    
    params ={
        Headers:{
            'content-type':'application/json'
        },
    };
}

