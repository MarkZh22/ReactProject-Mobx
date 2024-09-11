const deleteTask = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3002/tasks/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        if (!response.ok) {
            throw new Error('Failed to delete tasks');
        } else {
            const data = await response.json();
            return data
        }
    } catch (error) {
        console.error('deleteTaskAction', error);
    }
}
export default deleteTask;