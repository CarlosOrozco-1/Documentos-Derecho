import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Docs Jurídicos</Link>
            </div>
            <ul className="navbar-menu">
                <li><Link to="/plantillas">Plantillas</Link></li>
                <li><Link to="/documentos">Documentos</Link></li>
                <li><Link to="/generar">Generar</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
