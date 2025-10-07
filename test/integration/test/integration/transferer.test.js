const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../../helpers/autenticacao');
const postTransfers = require('../../fixtures/postTransfers.json');
const postUsersLogin = require('../../fixtures/postUsersLogin.json')


describe('Transfers', () => {

    let token

    beforeEach(async () => {
        //Capturar o token antes de cada it  
        token = await obterToken('julio', '123456'); // Estranho: julio logado, consegue obter 201 ao tranferir valores de priscila para sua conta.       
    })

    describe('/POST transfers', () => {


        it('Deve retornar 201 quando a transferência for realizada', async () => {

            const boryPostTransfers = { ...postTransfers }
            boryPostTransfers.from = "julio";
            boryPostTransfers.to = "priscila";
            boryPostTransfers.value = 2000.99;


            const Response = await request(process.env.BASE_URL)
                .post('/transfers')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(boryPostTransfers)


             //console.log(Response.body);
            expect(Response.status).to.equal(201);

        })

        it('Deve retornar 403 ao tentar transferir de outra conta para o próprio usuário logado', async () => {
            const Response = await request(process.env.BASE_URL)
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send({ from: 'priscila', to: 'julio', value: 100 });
             // console.log(Response.body);
            expect(Response.status).to.equals(403);
            expect(Response.body).toHaveProperty('error');
        });


        it('Deve retornar 400 ao transferir acima de 5000 para não favorecidos de sua conta', async () => {
            // Weberth não está na lista de favorecidos de Julio
            const Response = await request(process.env.BASE_URL)
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send({ from: 'julio', to: 'weberth', value: 5000.01 });
                // console.log(Response.body);

            expect(Response.status).to.equal(400); // eu usario 403 aqui
            expect(Response.body).to.have.property('error');

        });


        it('Deve retornar 201 ao transferir abaixo de 5000 para não favorecidos de sua conta', async () => {
            // Weberth não está na lista de favorecidos de Julio
            const Response = await request(process.env.BASE_URL)
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send({ from: 'julio', to: 'weberth', value: 50});
                 //console.log(Response.body);

            expect(Response.status).to.equal(201); 
            expect(Response.body.from).to.equal('julio');
            expect(Response.body.to).to.equal('weberth');
            expect(Response.body.value).to.equal(50);        

        });

    });


    describe('/GET transfers', () => {
        it('Deve retornar 200 e listar as transferência já realizadas', async () => {
            const Response = await request(process.env.BASE_URL)
                .get('/transfers')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            const dadosEsperados = [
                { from: 'priscila', to: 'julio', value: 5001.99, date: '2025-10-04T20:23:50.744Z' }
            ];

            // console.log(Response.body);
            expect(Response.status).to.equal(200);
            expect(Response.body).to.deep.include.members(dadosEsperados);

        })
    })

})