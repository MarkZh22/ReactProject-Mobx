import UsersList from '../../modules/UsersModule/components/UserList/UsersList';
import UserForm from './components/UserForm/UserForm';
import styles from './UsersModule.module.css'

function UsersModule() {
    return (
        <div className={styles.container}>
            <UsersList/>
            <UserForm />
        </div>
    )
}

export default UsersModule;