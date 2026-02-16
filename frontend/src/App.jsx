import { Routes, Route } from "react-router-dom";
import LoginRegister from "./components/LoginRegister/LoginRegister";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginRegister />} />
            <Route path="/dashboard" element={<h1>Welcome to Tution Creek Dashboard!</h1>} />
        </Routes>
    );
}

export default App;