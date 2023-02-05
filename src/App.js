import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';

import DefaultLayout from './layouts/DefaultLayout';
import HeaderOnly  from '~/layouts/components/HeaderOnly';

import { isUserLoggedIn } from '~/util/auth';
import { Fragment } from 'react';
import ProtectedRoute from './routes/protectedRoute';
function App() {
    const isLoggedIn = isUserLoggedIn();
    console.log('isUserLoggedIn: ', isLoggedIn);
    return (
        <Router>
            <div className="App">
                {/* Public routes */}
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout == null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {/* Private routes */}
                    {privateRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout == null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        console.log("layout", Layout)
                        console.log("route layout: ", route.layout, route.path)
                        // check if user is logged in
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <ProtectedRoute>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </ProtectedRoute>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
