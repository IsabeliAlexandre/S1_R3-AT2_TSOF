import { connection } from "../../configs/Database.js";

export async function clearDatabase() {
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');

    // apagar registros após cada teste (recomendável o banco não ficar cheio)
    await connection.query('DELETE FROM veiculos');
    await connection.query('DELETE FROM montadoras');
    await connection.query('DELETE FROM clientes');

    await connection.query('SET FOREIGN_KEY_CHECKS = 1');
}