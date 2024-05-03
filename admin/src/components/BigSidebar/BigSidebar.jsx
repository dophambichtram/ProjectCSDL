import Logo from "../Logo/Logo";
import NavLinks from "../NavLink/NavLinks";
import Wrapper from "./style";
import { useSelector } from "react-redux";

function BigSidebar() {
  const toggleSidebar = useSelector((state) => state.sidebar);

  return (
    <Wrapper>
      <div
        className={
          toggleSidebar
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
}

export default BigSidebar;
