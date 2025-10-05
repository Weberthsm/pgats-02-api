const request = require('supertest');
const {expect} = require('chai');
require('dotenv').config();
const postUsersLogin = require('../../fixtures/postUsersLogin.json');

describe('Login', ()=>{
    describe('/POST /users/login', ()=>{
        it('Deve retornar 200 com um token em string quando usar credenciais válidas', async ()=>{
            
            const bodyUsersLogin =  {...postUsersLogin}
            
            const response = await request(process.env.BASE_URL) 
                .post('/users/login')
                .set('content-type','application/json')
                .send(bodyUsersLogin)

                expect(response.status).to.equal(200);
                expect(response.body.token).to.be.a('string');              

        })
    })
})