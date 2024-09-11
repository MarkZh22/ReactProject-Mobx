import {makeAutoObservable, runInAction} from 'mobx';
import {IUser, IUsersStore} from './usersStore.interfaces';
import getUsers from '../api/fetchDataForUsersList';
import deleteCurrentUser from '../api/deleteCurrentUser';
import addUser from '../api/addUser';
import updateUser from '../api/updateUser';

class UsersStore implements IUsersStore {
    private _users: IUser[] = [];

    isLoading: boolean = false;
    isLoaded: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get users() {
        return this._users;
    }

    get total() {
        return this._users.length
    }

    getAllUsersAction = async () => {
        try {
            this.isLoading = true
            const data = await getUsers()
            runInAction(() => {
                this._users = data;
                this.isLoading = false
                this.isLoaded = true
            })
        } catch (error) {
            console.error('getAllUsers', error);
            runInAction(() => this.isLoading = false)
        }
    }

    addUserAction = async (newUser: IUser) => {
        try {
            this.isLoading = true
            await addUser(newUser);
            runInAction(() => {
                this._users.push(newUser)
                this.isLoading = false
            })
        } catch (error) {
            console.error('addUserAction', error);
            runInAction(() => this.isLoading = false)
        }
    }

    removeUserAction = async (userId: string) => {
        try {
            this.isLoading = true
            await deleteCurrentUser(userId)
            runInAction(() => {
                this._users = this._users.filter(user => user.id !== userId);
                this.isLoading = false
            });

        } catch (error) {
            console.error('deleteCurrentUser', error)
            runInAction(() => this.isLoading = false)
        }

    }

    updateUserAction = async (updatedUser: IUser) => {
        try {
            this.isLoading = true
            const updatedUserData = await updateUser(updatedUser);
            runInAction(() => {
                const index = this._users.findIndex((user) => user.id === updatedUser.id);
                if (index !== -1) {
                    this._users[index] = updatedUserData;
                    this.isLoading = false
                }
            });
        } catch (error) {
            console.log('updateUserAction', error);
            runInAction(() => this.isLoading = false)
        }
    }

}

export default new UsersStore();