import { Outlet } from "react-router-dom";
import Wrapper from "./style";
import { BigSidebar, Navbar, SmallSidebar } from "../../components";

function FixedLayout() {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
}
export default FixedLayout;
