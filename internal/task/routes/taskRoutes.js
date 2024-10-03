const express = require('express');
const taskController = require('../controller/taskController');

const router = express.Router();

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *                 example: "Tareas por hacer"
 *               TaskDescription:
 *                 type: string
 *                 example: "Lista de cosas..."
 *               Status:
 *                 type: string
 *                 example: "No completada"
 *               UserID:
 *                 type: integer
 *                 example: 24
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 TaskID:
 *                   type: integer
 *                   example: 9
 *                 Title:
 *                   type: string
 *                   example: "Tareas por hacer"
 *                 TaskDescription:
 *                   type: string
 *                   example: "Lista de cosas..."
 *                 UserID:
 *                   type: integer
 *                   example: 24
 *                 StatusID:
 *                   type: integer
 *                   example: 2
 *       400:
 *         description: Campos requeridos no proporcionados
 */
router.post('/create', taskController.createNewTask);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tareas]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID del usuario para filtrar las tareas
 *         schema:
 *           type: integer
 *           example: 24
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   TaskID:
 *                     type: integer
 *                     example: 3
 *                   Title:
 *                     type: string
 *                     example: "Mi primer tarea"
 *                   TaskDescription:
 *                     type: string
 *                     example: "Tarea"
 *                   StatusID:
 *                     type: integer
 *                     example: 1
 *                   UserID:
 *                     type: integer
 *                     example: 14
 */
router.get('/', taskController.getAllTasks);

/**
 * @swagger
 * /update:
 *   put:
 *     summary: Actualiza una tarea existente
 *     tags: [Tareas]
 *     parameters:
 *       - in: query
 *         name: taskId
 *         required: true
 *         description: ID de la tarea a actualizar
 *         schema:
 *           type: integer
 *           example: 7
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *                 example: "Today"
 *               TaskDescription:
 *                 type: string
 *                 example: "Lista de tareas"
 *               Status:
 *                 type: string
 *                 example: "no Completada"
 *               userId:
 *                 type: integer
 *                 example: 14
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 TaskID:
 *                   type: integer
 *                   example: 7
 *                 Title:
 *                   type: string
 *                   example: "Today"
 *                 TaskDescription:
 *                   type: string
 *                   example: "Lista de tareas"
 *                 StatusID:
 *                   type: integer
 *                   example: 2
 *                 UserID:
 *                   type: integer
 *                   example: 14
 *       400:
 *         description: Campos requeridos no proporcionados
 *       404:
 *         description: Tarea no encontrada
 */
router.put('/update', taskController.updateTask);

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Elimina una tarea existente
 *     tags: [Tareas]
 *     parameters:
 *       - in: query
 *         name: taskId
 *         required: true
 *         description: ID de la tarea a eliminar
 *         schema:
 *           type: integer
 *           example: 7
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID del usuario que posee la tarea
 *         schema:
 *           type: integer
 *           example: 14
 *     responses:
 *       204:
 *         description: Tarea eliminada exitosamente
 *       400:
 *         description: Parámetros requeridos no proporcionados
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/delete', taskController.deleteTask);

module.exports = router;
