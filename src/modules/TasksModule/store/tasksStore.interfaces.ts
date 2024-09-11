export interface ITask {
    id: string,
    name: string,
    currentUserId: string;
    taskName: string;
    description: string;
}
export interface IAllTasks {
    tasks: Array<ITask>,
    isLoading: boolean,
    isLoaded: boolean,
    addTaskAction: any,
    deleteTaskAction: any,
}