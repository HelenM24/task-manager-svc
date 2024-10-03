const taskService = require('../service/taskService');

class TaskController {

    //Crear tarea
    async createNewTask(req, res) {

        const task = req.body;

        // Validar entrada
        if (!task) {
            return res.status(400).json({ error: 'Se requiere ingresar campos para la tarea.' });
        }

        try {
            const newUser = await taskService.createTask(task);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //Listar todas las tareas del usuario
    async getAllTasks(req, res) {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ error: 'userId es requerido' });
        }

        try {
            const users = await taskService.getAllTasksByUser(userId);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //Actualizar tarea
    async updateTask(req, res) {
        const taskId = req.query.taskId;
        const taskDetail = req.body;

        console.log(taskDetail);

        //validamos que los campos no vengan vacios, a excepcion de la descripcion que es opcional
        if (!taskDetail.Title || !taskDetail.Status || !taskDetail.userId) {
            return res.status(400).json({error: 'Los campos no pueden ir vacios'});
        }

        try {

            const updatedTask = await taskService.updateTask(taskDetail, taskId);
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(400).json({error: error.message});
        }

    }

    //Eliminar tarea
    async deleteTask(req, res) {
        const taskId = req.query.taskId;
        const userId = req.query.userId;

        console.log('taskId:', taskId);
        console.log('userId:', userId);

        try {
            await taskService.deleteTask(taskId, userId);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }


}


module.exports = new TaskController();
