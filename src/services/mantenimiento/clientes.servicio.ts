import clientes from "@dbModels/mantenimiento/clientes.model";
import { Cliente, ClienteCreationAttributes } from "@typesApp/entities/mantenimiento/ClientesTypes";

export async function getClientes() {
    const clientesList = await clientes.findAll();
    return clientesList.map((cliente) => cliente.toJSON()) as Cliente[];
}

export async function getCliente(id: number) {
    const cliente = await clientes.findByPk(id);
    return cliente?.toJSON() as Cliente;
}

export async function createCliente(cliente: ClienteCreationAttributes) {
    const newCliente = await clientes.create(cliente);
    return newCliente.toJSON() as Cliente;
}

export async function updateCliente(cliente: Cliente) {
    const updatedCliente = await clientes.update(cliente, {
        where: {
            id_clientes: cliente.id_clientes
        }
    });
    return updatedCliente;
}

export async function deleteClientes(ids: number[]) {
    const deletedClientes = await clientes.destroy({
        where: {
            id_clientes: ids
        }
    });
    return deletedClientes;
}