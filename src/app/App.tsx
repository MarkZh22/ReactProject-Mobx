import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './App.module.css'; // Импорт стилей из CSS модуля

function App() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link className={styles.link} to="/users">
                    Users
                </Link>
                <Link className={styles.link} to="/tasks">
                    Tasks
                </Link>
            </header>
            <Outlet />
        </div>
    );
}

export default App;
