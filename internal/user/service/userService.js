const userRepository = require('../userRepository');
const bcrypt = require("bcryptjs");

class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    //Creacion de usuario
    async registerUser(username, password) {

        if (password.length < 5 || password.length > 15) {
            throw new Error('La contraseña debe tener entre 5 y 15 caracteres.');
        }

        if (username.length < 3 || username.length > 10) {
            throw new Error('El usuario debe tener entre 3 y 10 caracteres.');
        }

        // Hashear la contraseña en el servicio
        const hashedPassword = await bcrypt.hash(password, 10);

        // Verificamos si el usuario ya existe
        const userExists = await this.userRepository.findByUsername(username);
        if (userExists) {
            throw new Error('El usuario ya existe.');
        }

        // Creamos un nuevo usuario
        const newUser = await this.userRepository.createUser(username, hashedPassword);
        console.log('Usuario registrado con éxito:', newUser);

        //Retornamos solamente el usuarioID y username
        return {
            UserID: newUser.UserID,
            Username: newUser.Username
        };

    }

    //Validamos credenciales de usuario, esto solamente se utilizaria en caso de que haya un login
    async validateUserCredentials(username, password) {
        //Buscamos el nombre del usuario
        const user = await this.userRepository.findByUsername(username);
        if (!user) {
            return null;
        }

        //Comparamos la contraseña con la almacenada.
        const isPasswordValid = await bcrypt.compare(password, user.UserPassword);
        if (!isPasswordValid) {
            throw new Error('La contraseña no coincide.');
        }

        return user;
    }

    // Actualizar usuario
    async updateUser(userID, username, password) {

        //Declaramos variable
        const update = {}

        //obtenemos el user id
        const user = await this.userRepository.findUserById(userID);

        // Validar si el usuario existe
        if (!user) {
            throw new Error('Usuario no encontrado.');
        }

        // verificamos si el nuevo username ya está en uso
        const userExists = await this.userRepository.findByUsername(username);
        if (userExists && userExists.UserID !== user.UserID) {
            throw new Error('Username no se encuentra disponible, elija otro.');
        }

        //Asignamos valores
        update.Username = username;
        update.UserPassword = await bcrypt.hash(password, 10);

        // Procedemos a la actualización
        await this.userRepository.updateUser(userID, update);

        //usuario actualizado
        return await this.userRepository.findUserById(userID);

        }



    //eliminar usuario
    async deleteUser(userID) {

        //verificamos si el usuario existe
        const user = await this.userRepository.findUserById(userID);
        if (!user) {
            throw new Error('Usuario no encontrado.');
        }

        // Eliminamos el usuario
        await this.userRepository.deleteUser(userID);

        console.log('Usuario eliminado con éxito:', user.Username);
        return null;

    }

    async getAllUsers() {
        return await this.userRepository.findAllUsers();
    }

    async getUserbyID(userID) {
        //validar ID
        if (!userID) {
            throw new Error('ID de usuario es requerido.');
        }

        // Llamar al repositorio para buscar el usuario
        const user = await this.userRepository.findUserById(userID);

        //Si el usuario no se encuentra, mostrar error
        if (!user) {
            throw new Error('Usuario no encontrado.');
        }

        return user;

    }

}

module.exports = new UserService(userRepository);