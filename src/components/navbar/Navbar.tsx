import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    
 <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className='container'>
        <a className="navbar-brand" href="#">AstraZeneca</a>
        <div className="navbar-nav">
            <Link className="nav-item nav-link active" to="/">Juegos</Link>
            <a className="nav-item nav-link disabled" href="#">Salir</a>
        </div>
 
    </div>
 </nav>
  )
}

export default Navbar
