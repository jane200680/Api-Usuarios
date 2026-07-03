import * as UserModel from '../models/userModel.js';

export const getAll = async() => {
    return await UserModel.findAll()
}

export const getById = async(id) => {
    const user = await UserModel.findById(id);
    if(!user) throw new Error(`El usuario con id: ${id} no existe`);
    return user;
}

export const create = async ({name, email}) =>{
    if (!name) throw new Error("El campo name es requerido");
    if (!email) throw new Error("El campo email es requerido");
    return await UserModel.createUser({name, email});
}

export const update = async (id, data) =>{
    await UserModel.findById(id);
    return UserModel.updateUser(id, data);  
}

export const remove = async (id) => {
  const deleted = await UserModel.removeUser(id);

  if (!deleted) throw new Error(`ID: ${id} Usuario no encontrado`);

  return {
    message: `ID: ${id} Usuario eliminado`
  };
};