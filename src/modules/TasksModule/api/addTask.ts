const addTask = async (task: any) => {
    try {
        const response: Response = await fetch(`http://localhost:3002/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        });
        if(!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to add task: ${errorMessage}`);
        }
        return await response.json();
    } catch (error){
        console.error(error);
        throw error
    }
}
export default addTask;