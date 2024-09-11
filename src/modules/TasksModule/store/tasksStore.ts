import {makeAutoObservable, runInAction} from 'mobx';
import {IAllTasks, ITask} from './tasksStore.interfaces';
import addTask from '../api/addTask';
import getAllTasks from '../api/getAllTasks';
import deleteTask from '../api/deleteTask';


class TasksStore implements IAllTasks {
    private _tasks: ITask[] = []
    isLoading: boolean = false;
    isLoaded: boolean = false;
    constructor() {
        makeAutoObservable(this)
    }

    get tasks (){
        return this._tasks;
    }
    getAllTasksAction = async () => {
        try {
            this.isLoading = true
            const data = await getAllTasks(); // Теперь `getAllTasks` возвращает сразу данные
            runInAction(() => {
                this._tasks = data;
                this.isLoading = false;
                this.isLoaded = true;
            })
        } catch (error: any) {
            console.error('getAllTasksAction', error);
        }
    }
    addTaskAction = async (task: any) => {
        try {
            this.isLoading = true
            const data = await addTask(task);
            runInAction(() => {
                this._tasks.push(data);
                this.isLoading = false;
            })
        } catch (error: any) {
            console.error('addTaskAction', error);
            runInAction(() =>   this.isLoading = false)
        }
    }

    deleteTaskAction = async (id: string) => {
        try {
            this.isLoading = true
            await deleteTask(id);
            runInAction(() => {
                this._tasks = this.tasks.filter((task) => task.id !== id);
                this.isLoading = false;
            })

        } catch (error) {
            console.error('deleteTaskAction', error);
            runInAction(() =>   this.isLoading = false)
        }
    }
}

export default new TasksStore()