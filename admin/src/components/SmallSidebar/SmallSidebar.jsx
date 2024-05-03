import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "./style";
import { toggleSidebar } from "../../app/sidebar/sidebarSlice";
import NavLinks from "../NavLink/NavLinks";
import Logo from "../Logo/Logo";

function SmallSidebar() {
  const toggleSidebar1 = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div
        className={
          toggleSidebar1
            ? `sidebar-container show-sidebar`
            : "sidebar-container"
        }
      >
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
}

export default SmallSidebar;
