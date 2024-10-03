const taskRepository = require('../taskRepository');

class TaskService{

    constructor(taskRepository){
        this.taskRepository = taskRepository;
    }

    //Creacion de tarea asociada a usuario
    async createTask(task){

        //Validamos campos
        if(!task.Title){
            throw new Error('El campo "title" es requerido. ');
        }

        if (!task.TaskDescription) {
            throw new Error('El campo "description" es requerido.');
        }

        if (!task.UserID || typeof task.UserID !== 'number') {
            throw new Error('El campo "userId" es requerido y debe ser un número.');
        }

        if (!task.Status|| typeof task.Status !== 'string') {
            throw new Error('El campo "status" es requerido y debe ser un string (completado o no completado).');
        }

        //convertimos el status a int para guardarlo en la db
        const statusInt = await this.chooseStatus(task.Status);

        return await this.taskRepository.createTask({
            Title: task.Title,
            TaskDescription: task.TaskDescription,
            UserID: task.UserID,
            StatusID: statusInt
        });

    }

    //Obtener todos las tareas del usuario
    async getAllTasksByUser(userId) {
        return await this.taskRepository.getAllTask(userId);
    }

    async getTaskByID(taskID){
        //validamos ID
        if (!taskID) {
            throw new Error('ID de tarea es requerido.');
        }

        //Llamamos al repositorio de busqueda de tarea por id
         const task = await this.taskRepository.findTaskById(taskID);
            if(!task){
            throw new Error('Tarea no encontrada.');

        }

            return task;
    }

    //Actualizar tarea
    async updateTask(taskDetail,taskID){

        //Verificamos si la tarea existe para ese usuario
        const existTask = await this.taskRepository.findTaskById(taskID, taskDetail.userId);
        if (!existTask) {
            throw new Error('Tarea no fue encontrada en base de datos.');
        }


        //Si la tarea fue encontrada, procedemos a actualizar.
        const updateTask = {
            Title: taskDetail.Title,
            TaskDescription: taskDetail.TaskDescription,
            StatusID: await this.chooseStatus(taskDetail.Status),
            UserID: taskDetail.userId
        };

        //Llamamos al metodo de actualizacion
        await taskRepository.updateTask(taskID, updateTask.UserID,updateTask);
        console.log("Datos que se van a actualizar:", updateTask);
        //retornamos objeto actualizado
        return await this.taskRepository.findTaskById(taskID, taskDetail.userId);
    }

    //Eliminar una tarea en especifico
    async deleteTask(taskID, userID){
        //Verificamos que exista la tarea
        const existTask = await this.taskRepository.findTaskById(taskID, userID);
        if(!existTask){
            throw new Error('Tarea no encontrada.');
        }

        //Llamamos al metodo de eliminar
        await this.taskRepository.deleteTask(taskID, userID);
        console.log("Tarea eliminada exitosamente");
        return null;
    }

    //funcion para seleccionar el estado
    async chooseStatus(status) {
        switch (status.toLowerCase()) {
            case 'completada':
                return 1;
            case 'no completada':
                return 2;
            default:
                throw new Error('Estado inválido. Usa "completada" o "no completada".');
        }
    }

}

module.exports = new TaskService(taskRepository);

