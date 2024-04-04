import BottomBar from "../components/bottom";
import Navbar from './navbar';
import '../style/error.css';

function error() {
    return (
        <div className="error-background">
            <Navbar />
            <div className="error">
                <div className="error-text">
                    <h1>🚫 ERROR 404 ☢️</h1>
                    <p>???</p>
                </div>
            </div>
        </div>
    );
}

export default error;