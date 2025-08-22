// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import LoginForm from "./components/LoginForm";
import PrivateRoute from "./components/PrivateRoute";

import Layout from "./components/Layout";

import Home from "./pages/Home/Home";
import Company from "./pages/Company/Company";
import Users from "./pages/Users/Users";
import PointsBank from "./pages/BankPoints/BankPoints";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route
                        path="/*"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/company" element={<Company />} />
                                        <Route path="/users" element={<Users />} />
                                        <Route path="/points-bank" element={<PointsBank />} />
                                    </Routes>
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
