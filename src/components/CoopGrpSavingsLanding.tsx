import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../assets/icons/back.svg";
import cooperativeGroupImg from "../assets/img/CooperativeGroupSavings.svg";
import cooperativeGroupVirtualImg from "../assets/img/coop-grp-virtual.svg";
import { SavingsWrapper } from "../pages/authPages/Savings";
import { updateVMState } from "../redux/slices/virtualMembers-slice";
import { useAppDispatch } from "../redux/store";
import { cooperativeGroupSavings, savings } from "../utils/routes";

const CoopGrpSavingsLanding = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateVMState(false));
  }, [dispatch]);

  return (
    <SavingsWrapper>
      <div className="container">
        <h2 style={{ fontWeight: "600", color: "#33277b" }}>
          Cooperative Group Plans
        </h2>
        <hr className="line" />
        <Link
          to={`../${savings}`}
          style={{ textDecoration: "none" }}
          className="back"
        >
          <BackIcon />
          <p>Back</p>
        </Link>

        <div className="row">
          <div className="col-lg-6 p-4">
            <div
              className="card1"
              onClick={() => navigate(`../${cooperativeGroupSavings}`)}
            >
              <img
                src={cooperativeGroupImg}
                className="mb-2"
                alt="Cooperative Group Savings Real"
              />
              <p className="title">
                <b>Contribute as a group</b>
              </p>
              <p>
                Create group contributions with peers and make rotatory
                collections on your preferred payout date.
              </p>
            </div>
          </div>
          <div className="col-lg-6 p-4">
            <div
              className="card1"
              onClick={() => {
                dispatch(updateVMState(true));
                navigate(`../${cooperativeGroupSavings}`);
              }}
            >
              <img
                src={cooperativeGroupVirtualImg}
                className="mb-2"
                alt="Cooperative Group Savings Virtual"
              />
              <p className="title">
                <b>Contribute with virtual members</b>
              </p>
              <p>
                Contribute money in groups with AdashiEsusuAkawo virtual
                community members and get paid in rotatory cycles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SavingsWrapper>
  );
};

export default CoopGrpSavingsLanding;
