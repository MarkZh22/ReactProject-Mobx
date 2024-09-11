const getAllTasks= async () => {
    const response: Response = await fetch('http://localhost:3002/tasks');
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return await response.json();

}

export default getAllTasks;