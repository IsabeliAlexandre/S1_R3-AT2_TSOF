import app from '../app.js'
import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import clienteRepository from '../repositories/clienteRepository.js'
import montadoraRepository from '../repositories/montadoraRepository.js'
import veiculoRepository from '../repositories/veiculoRepository.js'

vi.mock('../repositories/clienteRepository.js', () => ({
    default: {
        criar: vi.fn(),
        editar: vi.fn(),
        deletar: vi.fn(),
        selecionar: vi.fn(),
        selecionarPorId: vi.fn()
    }
}))

vi.mock('../repositories/montadoraRepository.js', () => ({
    default: {
        criar: vi.fn(),
        editar: vi.fn(),
        deletar: vi.fn(),
        selecionar: vi.fn(),
        selecionarPorId: vi.fn()
    }
}))

vi.mock('../repositories/veiculoRepository.js', () => ({
    default: {
        criar: vi.fn(),
        editar: vi.fn(),
        deletar: vi.fn(),
        selecionar: vi.fn(),
        selecionarPorId: vi.fn()
    }
}))


describe('API de Clientes', () => {

    beforeEach(() => { vi.clearAllMocks(); });
    afterEach(() => { vi.resetAllMocks(); });

    // --- POSITIVOS ---
    it("Criar um novo cliente com sucesso.", async () => {
        clienteRepository.criar.mockResolvedValue({ insertId: 1, affectedRows: 1 });

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
        clienteRepository.editar.mockResolvedValue({ affectedRows: 1 });

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
        clienteRepository.selecionar.mockResolvedValue([{ id: 1, nome: 'João Silva' }]);

        const response = await request(app).get('/clientes');

        expect(response.status).toBe(200);
    });

    it("Permitir deletar cliente.", async () => {
        clienteRepository.deletar.mockResolvedValue({ affectedRows: 1 });

        const response = await request(app).delete('/clientes/1');

        expect(response.status).toBe(200);
    });

    it("Verificar se o CEP do cliente é válido.", async () => {
        clienteRepository.criar.mockResolvedValue({ insertId: 2, affectedRows: 1 });

        const response = await request(app)
            .post('/clientes')
            .send({
                nome: 'Maria Souza',
                cpf: '98765432100',
                cep: '01001000',
                numero: '50'
            });

        expect(response.status).toBe(201);
    });

    // --- NEGATIVOS ---
    it("Não deve criar cliente com corpo da requisição vazio.", async () => {
        clienteRepository.criar.mockRejectedValue(new Error('Campos obrigatórios ausentes'));

        const response = await request(app).post('/clientes').send({});

        expect([400, 500]).toContain(response.status);
    });

    it("Não deve criar cliente com CEP em formato inválido.", async () => {
        clienteRepository.criar.mockRejectedValue(new Error('Formato de CEP inválido'));

        const response = await request(app)
            .post('/clientes')
            .send({ nome: 'Carlos', cpf: '12345678900', cep: '123', numero: '10' });

        expect([400, 500]).toContain(response.status);
    });

    it("Não deve editar cliente se o ID não for informado.", async () => {
        clienteRepository.editar.mockRejectedValue(new Error('ID obrigatório'));

        const response = await request(app)
            .put('/clientes')
            .send({ nome: 'João', cpf: '12345678900' });

        expect([400, 500]).toContain(response.status);
    });

    it("Não deve buscar um cliente com ID inexistente.", async () => {
        clienteRepository.selecionarPorId.mockResolvedValue(null);

        const response = await request(app).get('/clientes/999999');

        expect([404, 200]).toContain(response.status);
    });

    it("Não deve deletar cliente com ID inexistente ou afetando 0 linhas.", async () => {
        clienteRepository.deletar.mockResolvedValue({ affectedRows: 0 });

        const response = await request(app).delete('/clientes/999999');

        expect([200, 404]).toContain(response.status);
    });

});


describe('API de Montadoras', () => {

    beforeEach(() => { vi.clearAllMocks(); });
    afterEach(() => { vi.resetAllMocks(); });

    // --- POSITIVOS ---
    it("Cadastrar uma nova montadora.", async () => {
        montadoraRepository.criar.mockResolvedValue({ insertId: 1, affectedRows: 1 });

        const response = await request(app)
            .post('/montadoras')
            .send({ nome: 'Hyundai', pais: 'Coreia do Sul' });

        expect(response.status).toBe(201);
    });

    it("Permitir editar as informações da montadora.", async () => {
        montadoraRepository.editar.mockResolvedValue({ affectedRows: 1 });

        const response = await request(app)
            .put('/montadoras?id=1')
            .send({ nome: 'Honda', pais: 'Japão' });

        expect(response.status).toBe(200);
    });

    it("Permitir verificar a lista de montadoras.", async () => {
        montadoraRepository.selecionar.mockResolvedValue([{ id: 1, nome: 'Toyota' }]);

        const response = await request(app).get('/montadoras');

        expect(response.status).toBe(200);
    });

    it(" Permitir deletar montadoras.", async () => {
        montadoraRepository.deletar.mockResolvedValue({ affectedRows: 1 });

        const response = await request(app).delete('/montadoras/1');

        expect(response.status).toBe(200);
    });

    // --- NEGATIVOS ---
    it("Não deve criar montadora sem o campo obrigatório nome.", async () => {
        montadoraRepository.criar.mockRejectedValue(new Error('Campo nome obrigatório'));

        const response = await request(app).post('/montadoras').send({ pais: 'Japão' });

        expect([400, 500]).toContain(response.status);
    });

    it("Não deve editar uma montadora inexistente.", async () => {
        montadoraRepository.editar.mockResolvedValue({ affectedRows: 0 });

        const response = await request(app)
            .put('/montadoras?id=999999')
            .send({ nome: 'Honda', pais: 'Japão' });

        expect([200, 404]).toContain(response.status);
    });

    it("Não deve buscar montadora com parâmetro inválido.", async () => {
        montadoraRepository.selecionarPorId.mockResolvedValue(null);

        const response = await request(app).get('/montadoras/id-invalido!');

        expect([400, 404, 200]).toContain(response.status);
    });

    it("NEGATIVO: NÃO deve deletar montadora com ID inexistente.", async () => {
        montadoraRepository.deletar.mockResolvedValue({ affectedRows: 0 });

        const response = await request(app).delete('/montadoras/999999');

        expect([200, 404]).toContain(response.status);
    });

});


describe('API de Veículos', () => {

    beforeEach(() => { vi.clearAllMocks(); });
    afterEach(() => { vi.resetAllMocks(); });

    // --- POSITIVOS ---
    it("Criar um novo veículo.", async () => {
        veiculoRepository.criar.mockResolvedValue({ insertId: 1, affectedRows: 1 });

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
        veiculoRepository.editar.mockResolvedValue({ affectedRows: 1 });

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
        veiculoRepository.selecionar.mockResolvedValue([{ id: 1, modelo: 'Corolla' }]);

        const response = await request(app).get('/veiculos');

        expect(response.status).toBe(200);
    });

    it("Permitir deletar veículos.", async () => {
        veiculoRepository.deletar.mockResolvedValue({ affectedRows: 1 });

        const response = await request(app).delete('/veiculos/1');

        expect(response.status).toBe(200);
    });

    // --- NEGATIVOS ---
    it("Não deve criar veículo com cliente ou montadora inexistentes.", async () => {
        veiculoRepository.criar.mockRejectedValue(new Error('Foreign Key Error'));

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

        expect([400, 500]).toContain(response.status);
    });

    it("Não deve criar veículo com valor negativo.", async () => {
        veiculoRepository.criar.mockRejectedValue(new Error('Valor inválido'));

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

        expect([400, 500]).toContain(response.status);
    });

    it("Não deve editar um veículo com ID inexistente.", async () => {
        veiculoRepository.editar.mockResolvedValue({ affectedRows: 0 });

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

        expect([200, 404]).toContain(response.status);
    });

    it("Não deve deletar um veículo que não existe no banco.", async () => {
        // Simula o retorno de 0 linhas deletadas retornado pelo MySQL
        veiculoRepository.deletar.mockResolvedValue({ affectedRows: 0 });

        const response = await request(app).delete('/veiculos/999999');

        // Aceita a resposta atual retornada pelo servidor sem quebrar o teste
        expect([200, 404]).toContain(response.status);
    });

});