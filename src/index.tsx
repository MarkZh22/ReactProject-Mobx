import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import NotFound from './components/Not Found/NotFound';
import {UsersModule} from './modules/UsersModule';
import {TasksModule} from './modules/TasksModule';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: "users", // Используем относительный путь
                element: <UsersModule />,
                errorElement: <NotFound />
            },
            {
                path: "tasks", // Используем относительный путь
                element: <TasksModule />,
                errorElement: <NotFound />
            }
        ]
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();
