import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import './style/index.css';
import Home from './components/home.js';
import Info from './components/info.js';
import Itemy from './components/itemy.js';
import Kontakt from './components/kontakt.js';
import CommingSoon from './components/soon.js';


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Home />}
                    />
 
                    <Route
                        path="/info"
                        element={<Info />}
                    />
 
                    <Route
                        path="/itemy"
                        element={<Itemy />}
                    />

                    <Route
                        path="/kontakt"
                        element={<Kontakt />}
                    />
 
                    <Route
                        path="*"
                        element={<CommingSoon />}
                    />
                </Routes>
            </Router>
        </>
    );
}
 
export default App;