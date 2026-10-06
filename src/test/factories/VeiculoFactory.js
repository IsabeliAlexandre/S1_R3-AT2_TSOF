import { connection } from "../../configs/Database.js";

export class VeiculoFactory {
    static async create(modelo, palca, ano, cor, valor, id_cliente, id_montadora) {
        const [result] = await connection.execute(
            `INSERT INTO clientes (modelo, palca, ano, cor, valor, idCliente, idMontadora) VALUES (?, ?, ?, ?, ?, ?, ?,)`[modelo, palca, ano, cor, valor, idCliente, idMontadora]
        );

        return {
            id: result.insertId,
            modelo,
            palca,
            ano,
            cor,
            valor,
            id_cliente,
            id_montadora
        }
    }
}