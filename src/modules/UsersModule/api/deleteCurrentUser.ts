const deleteCurrentUser = async (id: string) => {
    try {
        const response: Response = await fetch(`http://localhost:3002/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to update user: ${errorMessage}`);
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export default deleteCurrentUser