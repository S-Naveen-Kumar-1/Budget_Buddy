import { Link, NavLink } from "react-router-dom"

const links = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Contact", path: "/contact" },
  ]

  function Navbar() {
    return (
        <div>
             {links.map(({ text, path }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) => {
          }}>
          {text}
        </NavLink>
      ))}
        </div>
    )
  }
  export default Navbar