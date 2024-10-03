const User = require('./entity/userEntity');

class UserRepository {

    // Creamos el usuario y la contraseña hasheada
    async createUser(username, password) {
        try {
            return await User.create({
                Username: username,
                UserPassword: password,
            });
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            throw error;
        }
    }

    // Encontrar por username
    async findByUsername(username) {
        try {
            return await User.findOne({ where: { Username: username } });
        } catch (error) {
            console.error('Error al encontrar el usuario por nombre de usuario:', error);
            throw error;
        }
    }

    async findUserById(userID) {
        try {
            return await User.findByPk(userID, {
                attributes: ['UserID', 'Username']
            });
        } catch (error) {
            console.error('Error al encontrar el usuario por ID:', error);
            throw error;
        }
    }

    async findAllUsers() {
        try {
            // Solo nos interesa devolver el userID y el usuario, omitimos la contraseña.
            return await User.findAll({
                attributes: ['UserID', 'Username']
            });
        } catch (error) {
            console.error('Error al encontrar todos los usuarios:', error);
            throw error;
        }
    }

    async updateUser(userID, update) {
        try {
            return await User.update(update, { where: { UserID: userID } });
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            throw error;
        }
    }

    async deleteUser(userID) {
        try {
            return await User.destroy({ where: { UserID: userID } });
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            throw error;
        }
    }

}

module.exports = new UserRepository();
