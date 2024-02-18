// databaseService.js

const API_BASE_URL = 'http://localhost:8000/posts/posts/';

// Función para obtener todas las tareas
const fetchTasks = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener tareas: ', error);
        throw error;
    }
};

// Función para obtener detalles de una tarea por su ID
const fetchTaskDetails = async (taskId) => {
    try {
        const response = await fetch(`${API_BASE_URL}${taskId}`);
        console.log('Task details response:', response);

        if (response.ok) {
            const data = await response.json();
            console.log('Task details data:', data);
            return data;
        } else {
            console.error(`Error al obtener detalles de la tarea con ID ${taskId}: `, response.statusText);
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error(`Error al obtener detalles de la tarea con ID ${taskId}: `, error);
        throw error;
    }
};

// Función para agregar una nueva tarea
const addTask = async (taskData) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al agregar tarea: ', error);
        throw error;
    }
};

// Función para actualizar una tarea por su ID
const updateTask = async (taskId, taskData) => {
    try {
        const response = await fetch(`${API_BASE_URL}${taskId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al actualizar tarea con ID ${taskId}: `, error);
        throw error;
    }
};

// Función para eliminar una tarea por su ID
const deleteTask = async (taskId) => {
    try {
        const response = await fetch(`${API_BASE_URL}${taskId}/`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            return { success: true };
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error(`Error al eliminar tarea con ID ${taskId}: `, error);
        throw error;
    }
};

// Exporta las funciones para su uso en otros archivos
export { fetchTasks, fetchTaskDetails, addTask, updateTask, deleteTask };