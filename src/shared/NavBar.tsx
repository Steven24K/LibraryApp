import { NavLink } from "react-router"

export const NavBar = () => {
    return <nav className="navbar">
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>

            <li><a href="/">Home a </a></li>
            <li><a href="/about">About a</a></li>
            <li><a href="/contact">Contact a</a></li>
        </ul>
    </nav>
}