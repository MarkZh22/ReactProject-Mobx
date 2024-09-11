import {IUser} from '../store/usersStore.interfaces';

const updateUser = async (updatedUser: IUser) => {
    try {
        const response: Response = await fetch(`http://localhost:3002/users/${updatedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to update user: ${errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error
    }
}
export default updateUser;