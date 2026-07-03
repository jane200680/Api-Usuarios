import { pool } from "../db/pool.js";


//CRUD de usuarios
// obtener todos los usuarios
export const findAll = async() => {
  const [rows] = await pool.execute('SELECT * FROM users ORDER BY NAME');
  return rows;
}

// obtener un usuario por su id
export const findById = async(id) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}

// crear un nuevo usuario
export const createUser = async({name, email}) => {
    const [result] = await pool.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    return findById(result.insertId);
}

// update
export const updateUser = async(id,{name, email}) => {
    const fields = [];
    const values = [];

    if(name !== undefined) {
        fields.push('name = ?');
        values.push(name);
    }
    // fields = ['name = ?']
    // values = ['Jane']

    if(email !== undefined) {
        fields.push('email = ?');
        values.push(email);
    }
    // fields = ['email = ?']
    // values = ['jane@gmail.com']

    //ambas condiciones
    // fields = ['name=?', 'email = ?']
    // values = ['Jane', 'jane@gmail.com']

    if(fields.length === 0) return findById(id);

    values.push(id);
    // values = ['Jane','jane@gmail.com', 1]

    await pool.execute(`UPDATE users SET ${fields.join(',')} WHERE id = ?`, values)
    return findById(id);
} 

// delete
export const removeUser = async (id) => {
  const [result] = await pool.execute(
    "DELETE FROM users WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
};