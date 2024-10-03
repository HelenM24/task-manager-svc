
const userService = require('../service/userService');

class UserController {
    // Crear un usuario
    async createUser(req, res) {

     const { username, password } = req.body;

        console.log('Incoming request body:', req.body);

     // Validar entrada
        if (!username || !password) {
            return res.status(400).json({ error: 'Se requiere un nombre de usuario y una contraseña.' });
        }


        try {
            const newUser = await userService.registerUser(username, password);
            res.status(201).json(newUser);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        }

    // Verificar credenciales de usuario
    async validateCredentials(req, res) {
        const { username, password } = req.body;

        //validaciones de entrada
        if (!username || !password) {
            return res.status(400).json({ error: 'Los campos no pueden ir vacios' });
        }

        try {
            const user = await userService.validateUserCredentials(username, password);
            res.status(200).json(user);
        } catch (error) {
            //retornamos unauthorized
            res.status(401).json({ error: error.message });
        }
    }

    // Obtener detalle de un usuario
    async getUser(req, res) {
        const { id } = req.params;

        try {
            const user = await userService.getUserbyID(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    // Actualizar un usuario
    async updateUser(req, res) {
        const { id } = req.params;
        const { username, password } = req.body;

        //validaciones de entrada
        if (!username || !password) {
            return res.status(400).json({ error: 'Los campos no pueden ir vacios' });
        }

        try {
            const updatedUser = await userService.updateUser(id, username, password);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Eliminar un usuario
    async deleteUser(req, res) {
        const { id } = req.params;

        try {
            await userService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    // Obtener todos los usuarios
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new UserController();
