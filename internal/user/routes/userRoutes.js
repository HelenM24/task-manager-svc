const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "Helen"
 *               password:
 *                 type: string
 *                 example: "contraseña123"
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 UserID:
 *                   type: integer
 *                   example: 24
 *                 Username:
 *                   type: string
 *                   example: "Helen"
 *       400:
 *         description: Se requiere un nombre de usuario y una contraseña
 */
router.post('/create', userController.createUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Verifica las credenciales del usuario en caso de implementar un login
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "Helen"
 *               password:
 *                 type: string
 *                 example: "contraseña123"  # Ejemplo de valor
 *     responses:
 *       200:
 *         description: Credenciales válidas
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', userController.validateCredentials);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Obtiene los detalles de un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 UserID:
 *                   type: integer
 *                   example: 24
 *                 Username:
 *                   type: string
 *                   example: "Helen"
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', userController.getUser);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   UserID:
 *                     type: integer
 *                     example: 13
 *                   Username:
 *                     type: string
 *                     example: "Helen"
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "nuevoUsuario"  # Ejemplo de valor
 *               password:
 *                 type: string
 *                 example: "nuevaContraseña123"  # Ejemplo de valor
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 UserID:
 *                   type: integer
 *                   example: 16  # Ejemplo de valor
 *                 Username:
 *                   type: string
 *                   example: "HelenM"  # Ejemplo de valor
 *       400:
 *         description: Los campos no pueden ir vacíos
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;
