import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivetOutlet from "../auth/PrivetOutlet";
import PublicOutlet from "../auth/PublicOutlet";
import AuthProvider from "../contexts/AuthContext";
import "../styles/global.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/*" element={<PublicOutlet />}>
                            <Route path="signup" element={<Signup />} />
                            <Route path="login" element={<Login />} />
                        </Route>
                        <Route path="/*" element={<PrivetOutlet />}>
                            <Route path="quiz/:id" element={<Quiz />} />
                            <Route path="result/:id" element={<Result />} />
                        </Route>
                    </Routes>
                </Layout>
            </AuthProvider>
        </Router>
    );
}

export default App;
