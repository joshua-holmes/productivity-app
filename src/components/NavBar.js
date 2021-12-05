import { Link, NavLink } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/budget">Budget</NavLink>
            <NavLink to="/retirement">Retirement</NavLink>
            <NavLink to="/pros-cons">Pros & Cons</NavLink>
        </div>

    )
}

export default NavBar;
