import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { IUser, IUsersStore } from '../../store/usersStore.interfaces';
import styles from './UsersList.module.css';
import UsersStore from '../../store/usersStore';
import ItemCard from '../../../../UI/Card/ItemCard';
import EditUserModal from '../EditUserModal/EditUserModal';

const UsersList = () => {
    const { users, isLoading, isLoaded, getAllUsersAction, removeUserAction, updateUserAction }: IUsersStore = UsersStore;
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);

    useEffect(() => {
        if (!isLoaded) {
            getAllUsersAction();
        }
    }, [getAllUsersAction, isLoaded]);

    const deleteCurrentUser = (userId: string) => {
        removeUserAction(userId);
    };

    const handleEditUser = (user: IUser) => {
        setCurrentUser(user);
        setIsEditOpen(true);
    };

    const handleSaveUser = (updatedUser: IUser) => {
        updateUserAction(updatedUser);
        setIsEditOpen(false);
        setCurrentUser(null);
    };

    return (
        <div className={styles.container}>
            {isLoading && <div className={styles.loading}>...loading</div>}
            {users.map((user: IUser) => (
                <ItemCard
                    key={user.id}
                    title={`Name: ${user.name}`}
                    description={`Profession: ${user.profession}`}
                    additionalInfo={`Email: ${user.email}`}
                    onDelete={() => deleteCurrentUser(user.id)}
                    onEdit={() => handleEditUser(user)}
                    editModal={
                        currentUser && currentUser.id === user.id && (
                            <EditUserModal
                                user={currentUser}
                                open={isEditOpen}
                                onClose={() => setIsEditOpen(false)}
                                onSave={handleSaveUser}
                            />
                        )
                    }
                />
            ))}
        </div>
    );
};

export default observer(UsersList);

