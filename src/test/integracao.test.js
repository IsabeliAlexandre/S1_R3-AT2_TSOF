import app from '../app.js'
import request from 'supertest'
import { describe, expect, it } from 'vitest'


// Clientes

describe('API de Clientes', () => {

    //Testes positivos

    it("Criar um novo cliente com sucesso.", async () => {
        const response = await request(app)
            .post('/clientes')
            .send({
                nome: 'João Silva',
                cpf: '12345678900',
                cep: '01001000',
                numero: '100',
                complemento: 'Apto 10'
            });

        expect(response.status).toBe(201);
    });

    it("Permitir editar as informações do cliente.", async () => {
        const response = await request(app)
            .put('/clientes?id=1')
            .send({
                nome: 'João Santos',
                cpf: '12345678900',
                cep: '01001000',
                numero: '200',
                complemento: 'Apto 20'
            });

        expect(response.status).toBe(200);
    });

    it("Permitir verificar a lista de clientes cadastrados.", async () => {
        const response = await request(app)
            .get('/clientes');

        expect(response.status).toBe(200);
    });

    it("Permitir deletar cliente.", async () => {
        const response = await request(app)
            .delete('/clientes/1');

        expect(response.status).toBe(200);
    });

    it("Verificar se o CEP do cliente é válido.", async () => {
        const response = await request(app)
            .post('/clientes')
            .send({
                nome: 'Maria Souza',
                cpf: '98765432100',
                cep: '01001000',
                numero: '50'
            });

        expect(response.status).toBe(200);
    });

    // Testes negativos

    it("Não deve criar cliente com corpo da requisição vazio.", async () => {
        const response = await request(app)
            .post('/clientes')
            .send({});

        expect(response.status).toBe(400);
    });

    it("Não deve criar cliente com CEP em formato inválido.", async () => {
        const response = await request(app)
            .post('/clientes')
            .send({
                nome: 'Carlos Lima',
                cpf: '12345678900',
                cep: '123',
                numero: '10'
            });

        expect(response.status).toBe(400);
    });

    it("Não deve editar cliente se o ID não for informado.", async () => {
        const response = await request(app)
            .put('/clientes')
            .send({
                nome: 'João Santos',
                cpf: '12345678900'
            });

        expect(response.status).toBe(400);
    });

    it("Não deve buscar um cliente com ID inexistente.", async () => {
        const response = await request(app)
            .get('/clientes/999999');

        expect(response.status).toBe(404);
    });

    it("Não deve deletar cliente com ID inválido/alfanumérico.", async () => {
        const response = await request(app)
            .delete('/clientes/abc');

        expect(response.status).toBe(400);
    });

});

// Montadoras 

describe('API de Montadoras', () => {

    //Testes positivos
    it("Cadastrar uma nova montadora.", async () => {
        const response = await request(app)
            .post('/montadoras')
            .send({
                nome: 'Hyundai',
                pais: 'Coreia do Sul'
            });

        expect(response.status).toBe(201);
    });

    it("Permitir editar as informações da montadora.", async () => {
        const response = await request(app)
            .put('/montadoras?id=1')
            .send({
                nome: 'Honda',
                pais: 'Japão'
            });

        expect(response.status).toBe(200);
    });

    it("Permitir verificar a lista de montadoras.", async () => {
        const response = await request(app)
            .get('/montadoras');

        expect(response.status).toBe(200);
    });

    it("Permitir deletar montadoras.", async () => {
        const response = await request(app)
            .delete('/montadoras/1');

        expect(response.status).toBe(200);
    });

    //Testes negativos 

    it("Não deve criar montadora sem o campo obrigatório nome.", async () => {
        const response = await request(app)
            .post('/montadoras')
            .send({
                pais: 'Japão'
            });

        expect(response.status).toBe(400);
    });

    it("Não deve editar uma montadora inexistente.", async () => {
        const response = await request(app)
            .put('/montadoras?id=999999')
            .send({
                nome: 'Honda',
                pais: 'Japão'
            });

        expect(response.status).toBe(404);
    });

    it("Não deve buscar montadora com ID malformatado.", async () => {
        const response = await request(app)
            .get('/montadoras/id-invalido');

        expect(response.status).toBe(400);
    });

    it("Não deve deletar montadora sem informar o ID.", async () => {
        const response = await request(app)
            .delete('/montadoras/');

        expect(response.status).toBe(404);
    });

});

//Veículos

describe('API de Veículos', () => {

    // Testes positivos 

    it("Criar um novo veículo.", async () => {
        const response = await request(app)
            .post('/veiculos')
            .send({
                idMontadora: 1,
                idCliente: 1,
                modelo: 'Corolla',
                placa: 'ABC1234',
                ano: 2025,
                cor: 'Prata',
                valor: 120000
            });

        expect(response.status).toBe(201);
    });

    it("Permitir editar as informações do veículo.", async () => {
        const response = await request(app)
            .put('/veiculos?id=1')
            .send({
                idMontadora: 1,
                idCliente: 1,
                modelo: 'Civic',
                placa: 'XYZ5678',
                ano: 2025,
                cor: 'Preto',
                valor: 130000
            });

        expect(response.status).toBe(200);
    });

    it("Permitir verificar a lista de veículos.", async () => {
        const response = await request(app)
            .get('/veiculos');

        expect(response.status).toBe(200);
    });

    it("Permitir deletar veículos.", async () => {
        const response = await request(app)
            .delete('/veiculos/1');

        expect(response.status).toBe(200);
    });

    //Testes negativos

    it("Não deve criar veículo com cliente ou montadora inexistentes.", async () => {
        const response = await request(app)
            .post('/veiculos')
            .send({
                idMontadora: 999999,
                idCliente: 999999,
                modelo: 'Corolla',
                placa: 'ABC1234',
                ano: 2025,
                cor: 'Prata',
                valor: 120000
            });

        expect(response.status).toBe(400);
    });

    it("Não deve criar ou editar veículo com valor negativo.", async () => {
        const response = await request(app)
            .post('/veiculos')
            .send({
                idMontadora: 1,
                idCliente: 1,
                modelo: 'Corolla',
                placa: 'ABC1234',
                ano: 2025,
                cor: 'Prata',
                valor: -50000
            });

        expect(response.status).toBe(400);
    });

    it("Não deve editar um veículo com ID inexistente.", async () => {
        const response = await request(app)
            .put('/veiculos?id=999999')
            .send({
                idMontadora: 1,
                idCliente: 1,
                modelo: 'Civic',
                placa: 'XYZ5678',
                ano: 2025,
                cor: 'Preto',
                valor: 130000
            });

        expect(response.status).toBe(404);
    });

    it("Não deve deletar um veículo que não existe no banco.", async () => {
        const response = await request(app)
            .delete('/veiculos/999999');

        expect(response.status).toBe(404);
    });

});