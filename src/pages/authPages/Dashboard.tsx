// import { useOutletContext } from "react-router-dom";
import styled from 'styled-components';

import DashboardLanding from '../../components/DashboardLanding';
// import { useShow, useShowNav } from "./AuthIndex";

function Dashboard() {
  // const [show, setShow]: boolean[] = useOutletContext();
  // const { show, setShow } = useShow();
  // const { setShowNav } = useShowNav();
  // don't have to pass the context as props, its global and will be available on every outlet component even the nested ones.

  return (
    <Dashboard.Wrapper>
      <DashboardLanding />
      {/* <DashboardLanding open={show} setOpen={setShow} setShowNav={setShowNav} /> */}
    </Dashboard.Wrapper>
  );
}

Dashboard.Wrapper = styled.div`
  // background: red;
  // width: 100vw;
  height: 100vh;
  padding-bottom: 40px;
`;

export default Dashboard;
