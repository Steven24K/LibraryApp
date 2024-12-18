import { NavBar } from "../shared/NavBar"

export const Contact = () => {
    return <div>
        <NavBar />
        <h1>Contact</h1>
        <ul>
            <li>Tel: <b><a href="tel:06-56536233232">06-56536233232</a></b></li>
            <li>Mail: <b><a href="mailto:info@sample.com">info@sample.com</a></b></li>
        </ul>
    </div>
}