import { NavLink } from "react-router-dom";
import { SidebarLinks } from "../../utils/SidebarLinks";

const NavLinks = () => {
  return (
    <div className="container-sidebar">
      <div className="nav-links">
        {SidebarLinks.map((link, index) => {
          const { text, path, icon } = link;
          return (
            <div key={index}>
              <NavLink
                to={path}
                className={({ isActive }) => {
                  return isActive ? "nav-link active" : "nav-link";
                }}
              >
                <span className="icon">{icon}</span>
                {text}
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavLinks;
