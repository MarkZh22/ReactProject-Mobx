const addUser = async (newUser: {}) => {
    try {
        const response: Response = await fetch(`http://localhost:3002/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        });
        if(!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to add user: ${errorMessage}`);
        }
        return await response.json()
    } catch (error){
        console.error(error);
        throw error
    }
}
export default addUser;