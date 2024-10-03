const Task = require('../task/entities/taskEntity');

class TaskRepository {
    // Crear una nueva tarea
    async createTask(data) {
        try {
            return await Task.create(data);
        } catch (error) {
            throw new Error('Error al crear la tarea: ' + error.message);
        }
    }

    // Obtener tareas del usuario
    async getAllTask(userId) {
        try {
            return await Task.findAll({ where: { userId } });
        } catch (error) {
            throw new Error('Error al obtener las tareas: ' + error.message);
        }
    }

    // Encontrar una tarea del usuario por ID
    async findTaskById(taskId, userId) {
        try {
            return await Task.findOne({ where: { TaskID: taskId, UserID: userId } });
        } catch (error) {
            throw new Error('Error al encontrar la tarea: ' + error.message);
        }
    }

    // Actualizar una tarea
    async updateTask(taskId, userId, taskDetails) {
        try {
            return await Task.update(taskDetails, { where: { TaskID: taskId, UserID: userId } });
        } catch (error) {
            throw new Error('Error al actualizar la tarea: ' + error.message);
        }
    }

    // Eliminar una tarea
    async deleteTask(taskId, userId) {
        try {
            return await Task.destroy({ where: { TaskID: taskId, UserID: userId } });
        } catch (error) {
            throw new Error('Error al eliminar la tarea: ' + error.message);
        }
    }
}

module.exports = new TaskRepository();
