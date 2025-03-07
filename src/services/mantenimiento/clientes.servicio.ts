import Clientes from "@models/mantenimiento/cliente.model";
import { Cliente, ClienteAtributosCreacion } from "@typesApp/mantenimiento/cliente.type";

export async function getClientes() {
    const clientesList = await Clientes.findAll();
    return clientesList.map((cliente) => cliente.toJSON()) as Cliente[];
}

export async function getCliente(id: number) {
    const cliente = await Clientes.findByPk(id);
    return cliente?.toJSON() as Cliente;
}

export async function createCliente(cliente: ClienteAtributosCreacion) {
    const newCliente = await Clientes.create(cliente);
    return newCliente.toJSON() as Cliente;
}

export async function updateCliente(cliente: Cliente) {
    const updatedCliente = await Clientes.update(cliente, {
        where: {
            id_clientes: cliente.id_clientes
        }
    });
    return updatedCliente;
}

export async function deleteClientes(ids: number[]) {
    const deletedClientes = await Clientes.destroy({
        where: {
            id_clientes: ids
        }
    });
    return deletedClientes;
}