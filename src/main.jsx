import React, { useState, useEffect } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
    useLocation,
} from "react-router";
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './components/navbar';
import Submenu from './components/submenu';
import Header from './components/header';
import { links } from './routes';
import { getFolders } from "./services/videoManagerService";
import VideoResource from './pages/VideoResource';

const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

function Layout({ children, withNav, withSubmenu, withHeader }) {
    return (
        <div className="flex flex-col h-screen">
            {withNav && <Navbar />}
            <div className="flex flex-col md:flex-row lg:flex-row flex-grow">
                {withSubmenu && <Submenu />}
                <div className="flex flex-col flex-grow overflow-hidden">
                    {withHeader && <Header />}
                    {children}
                </div>
            </div>
        </div>
    );
}

const ProtectedRoute = ({ element, requiredRole }) => {
    const user = localStorage.getItem("user");
    if (!isAuthenticated()) return <Navigate to="/login" replace />;

    if (requiredRole) {
        const parsedUser = user ? JSON.parse(user) : null;
        if (!parsedUser || parsedUser.role !== requiredRole) {
            return <Navigate to="/" replace />; // Redirect unauthorized users to home
        }
    }

    return element;
};


const RedirectIfAuth = ({ element }) => {
    const location = useLocation();
    return isAuthenticated() ? <Navigate to={location.pathname} replace /> : element;
};

const PublicRoute = ({ element }) => {
    return <RedirectIfAuth element={element} />;
};

const RootComponent = () => {
    const [folders, setFolders] = useState([]);
    const [flatRoutes, setFlatRoutes] = useState([]);
    const [router, setRouter] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const fetchedFolders = await getFolders();
                setFolders(fetchedFolders);
            } catch (error) {
                console.error("Error fetching folders:", error);
            }
        };
        fetchFolders();
    }, [role]);

    useEffect(() => {
        const generatedRoutes = Object.values(links).reduce((acc, route) => {
            acc.push({
                path: route.path,
                element: (
                    route.path === "/login" || route.path === "/signup" || route.path === "/forgot-password" ? (
                        <PublicRoute
                            element={
                                <Layout withNav={route.withNav} withSubmenu={route.withSubmenu} withHeader={route.withHeader}>
                                    <route.component />
                                </Layout>
                            }
                        />
                    ) : (
                        <ProtectedRoute
                            element={
                                <Layout withNav={route.withNav} withSubmenu={route.withSubmenu} withHeader={route.withHeader}>
                                    <route.component />
                                </Layout>
                            }
                            requiredRole={route.requiredRole}
                        />
                    )
                ),
            });
        

            if (route.children) {
                Object.values(route.children).forEach((childRoute) => {
                    acc.push({
                        path: childRoute.path,
                        element: (
                            <ProtectedRoute
                                element={
                                    <Layout withNav={childRoute.withNav} withSubmenu={childRoute.withSubmenu} withHeader={childRoute.withHeader}>
                                        <childRoute.component />
                                    </Layout>
                                }
                            />
                        ),
                    });
                });
            }
            return acc;
        }, []);

        folders.forEach(folder => {
            generatedRoutes.push({
                path: `/video-resources/${folder.id}`,
                element: (
                    <ProtectedRoute
                        element={
                            <Layout withNav={true} withSubmenu={true} withHeader={true}>
                                <VideoResource folderId={folder.id} />
                            </Layout>
                        }
                    />
                ),
            });
        });

        generatedRoutes.push({
            path: "*",
            element: <RedirectIfAuth />,
        });

        setFlatRoutes(generatedRoutes);
    }, [folders]);

    useEffect(() => {
        if (flatRoutes.length > 0) {
            setRouter(createBrowserRouter(flatRoutes));
        }
    }, [flatRoutes]);

    if (!router) {
        return <div>Loading...</div>;
    }

    return <RouterProvider router={router} />;
};

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<RootComponent />);