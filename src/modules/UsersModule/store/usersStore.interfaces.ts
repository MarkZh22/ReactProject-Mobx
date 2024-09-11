export interface IUsersStore {
    readonly users: Array<IUser>,
    isLoading: boolean,
    isLoaded: boolean,
    addUserAction: (user: IUser) => void,
    removeUserAction: (userId: string) => void,
    getAllUsersAction: () => Promise<void>,
    updateUserAction: (user: IUser) => void,

}
export interface IUser {
    id: string,
    name: string,
    profession: string,
    email: string,
}
