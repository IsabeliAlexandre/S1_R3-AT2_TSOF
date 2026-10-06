import app from '../app.js'
import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import clienteRepository from '../repositories/clienteRepository.js'
import montadoraRepository from '../repositories/montadoraRepository.js'
import veiculoRepository from '../repositories/veiculoRepository.js'


// MOCK DO REPOSITORY DE CLIENTES
vi.mock('../repositories/clienteRepository.js', () => ({
    default: {
        criar: vi.fn(),
        editar: vi.fn(),
        deletar: vi.fn(),
        selecionar: vi.fn()
    }
}))


// MOCK DO REPOSITORY DE MONTADORAS
vi.mock('../repositories/montadoraRepository.js', () => ({
    default: {
        criar: vi.fn(),
        editar: vi.fn(),
        deletar: vi.fn(),
        selecionar: vi.fn()
    }
}))


// MOCK DO REPOSITORY DE VEÍCULOS
vi.mock('../repositories/veiculoRepository.js', () => ({
    default: {
        criar: vi.fn(),
        editar: vi.fn(),
        deletar: vi.fn(),
        selecionar: vi.fn()
    }
}))


describe('API de Clientes', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });


    // CT-001
    it("deve criar um cliente com sucesso.", async () => {

        clienteRepository.criar.mockResolvedValue({
            insertId: 1,
            affectedRows: 1
        });

        const response = await request(app)
            .post('/clientes')
            .send({
                nome: 'João Silva',
                cpf: '12345678900',
                cep: '01001000',
                numero: '100',
                complemento: 'Apto 10'
            });

        expect(response.status).toBe(201)
        expect(response.body.data).toHaveProperty('insertId');
    });


    // CT-002
    it("deve editar um cliente com sucesso.", async () => {

        clienteRepository.editar.mockResolvedValue({
            affectedRows: 1
        });

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


    // CT-003
    it("deve listar os clientes com sucesso.", async () => {

        clienteRepository.selecionar.mockResolvedValue([
            {
                Id: 1,
                Nome: 'João Silva',
                CPF: '12345678900'
            }
        ]);

        const response = await request(app)
            .get('/clientes');

        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
    });


    // CT-011
    it("deve deletar um cliente com sucesso.", async () => {

        clienteRepository.deletar.mockResolvedValue({
            affectedRows: 1
        });

        const response = await request(app)
            .delete('/clientes/1');

        expect(response.status).toBe(200);
    });

});


describe('API de Montadoras', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });


    // CT-004
    it("deve criar uma montadora com sucesso.", async () => {

        montadoraRepository.criar.mockResolvedValue({
            insertId: 1,
            affectedRows: 1
        });

        const response = await request(app)
            .post('/montadoras')
            .send({
                nome: 'Hyundai',
                pais: 'Coreia do Sul'
            });

        expect(response.status).toBe(201);
        expect(response.body.data).toHaveProperty('insertId');
    });


    // CT-005
    it("deve editar uma montadora com sucesso.", async () => {

        montadoraRepository.editar.mockResolvedValue({
            affectedRows: 1
        });

        const response = await request(app)
            .put('/montadoras?id=1')
            .send({
                nome: 'Honda',
                pais: 'Japão'
            });

        expect(response.status).toBe(200);
    });


    // CT-006
    it("deve listar as montadoras com sucesso.", async () => {

        montadoraRepository.selecionar.mockResolvedValue([
            {
                Id: 1,
                Nome: 'Toyota',
                Pais: 'Japão'
            }
        ]);

        const response = await request(app)
            .get('/montadoras');

        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
    });


    // CT-012
    it("deve deletar uma montadora com sucesso.", async () => {

        montadoraRepository.deletar.mockResolvedValue({
            affectedRows: 1
        });

        const response = await request(app)
            .delete('/montadoras/1');

        expect(response.status).toBe(200);
    });

});


describe('API de Veículos', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });


    // CT-007
    it("deve criar um veículo com sucesso.", async () => {

        veiculoRepository.criar.mockResolvedValue({
            insertId: 1,
            affectedRows: 1
        });

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
        expect(response.body.data).toHaveProperty('insertId');
    });


    // CT-008
    it("deve editar um veículo com sucesso.", async () => {

        veiculoRepository.editar.mockResolvedValue({
            affectedRows: 1
        });

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


    // CT-009
    it("deve listar os veículos com sucesso.", async () => {

        veiculoRepository.selecionar.mockResolvedValue([
            {
                Id: 1,
                IdMontadora: 1,
                IdCliente: 1,
                Modelo: 'Corolla',
                Placa: 'ABC1234',
                Ano: 2025,
                Cor: 'Prata',
                Valor: 120000
            }
        ]);

        const response = await request(app)
            .get('/veiculos');

        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
    });


    // CT-010
    it("deve deletar um veículo com sucesso.", async () => {

        veiculoRepository.deletar.mockResolvedValue({
            affectedRows: 1
        });

        const response = await request(app)
            .delete('/veiculos/1');

        expect(response.status).toBe(200);
    });

});