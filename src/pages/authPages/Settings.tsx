import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// import { useShowNav } from "./AuthIndex";
import { ReactComponent as BackIcon } from '../../assets/icons/back.svg';
import GrpInviteForm from '../../components/GrpInviteForm';
import Notifications from '../../components/Notifications';
import Profile from '../../components/Profile';
import Security from '../../components/Security';
import TarGrpInviteForm from '../../components/TarGrpInviteForm';
import { Tab, TabItem } from '../../components/bits/Tab';
// import { settings } from "../../utils/routes";

export interface GroupMiscTypes {
  ownerName: string;
  payoutOrder: number[];
  savingsType: string;
}

const Settings = () => {
  const [tab, setTab] = useState<number>(1);
  const [groupItem, setGroupItem] = useState({});
  const [groupMisc, setGroupMisc] = useState<GroupMiscTypes>({
    ownerName: '',
    payoutOrder: [],
    savingsType: '',
  });
  // const { setShowNav } = useShowNav();
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URL(window.location.href);
    const myParam = urlParams.searchParams.get('tab');
    myParam && setTab(parseInt(myParam));
    // setShowNav(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    window.sessionStorage.clear();
  }, []);

  return (
    <Settings.Wrapper>
      <div className='container'>
        <h2 style={{ fontWeight: '600', color: '#33277b' }}>My Account</h2>
        <hr className='line' />
        <div
          className='back'
          onClick={() => {
            // console.log(window.history);
            navigate(-1);
            // window.history.back();
          }}
        >
          <BackIcon />
          <p>Back</p>
        </div>
        {/* <Link to={"-1"} style={{ textDecoration: "none" }} className="back">
          <BackIcon />
          <p>Back</p>
        </Link> */}
        <div className='header'>
          <div className='col-md-10 mx-auto'>
            <Tab className='mx-0'>
              <TabItem
                onClick={() => setTab(1)}
                active={tab === 1 ? true : false}
              >
                Profile
              </TabItem>
              {/* <TabItem
              onClick={() => setTab(2)}
              active={tab === 2 ? true : false}
            >
              Bank and Cards
            </TabItem> */}
              <TabItem
                onClick={() => setTab(3)}
                active={tab === 3 ? true : false}
              >
                Security
              </TabItem>
              <TabItem
                onClick={() => setTab(4)}
                active={tab === 4 || tab === 5 ? true : false}
              >
                Notifications
              </TabItem>
            </Tab>
          </div>
        </div>
        {tab === 1 && <Profile />}
        {tab === 3 && <Security />}
        {tab === 4 && (
          <Notifications
            setTab={setTab}
            setGroupItem={setGroupItem}
            setGroupMisc={setGroupMisc}
          />
        )}
        {tab === 5 && (
          <GrpInviteForm groupItem={groupItem} groupMisc={groupMisc} />
        )}
        {tab === 6 && (
          <TarGrpInviteForm groupItem={groupItem} groupMisc={groupMisc} />
        )}
      </div>
    </Settings.Wrapper>
  );
};

Settings.Wrapper = styled.div`
  .container {
    padding: 2rem;
    color: #33277b;
    // font-size: 16px;

    .line {
      border: 1px solid rgba(0, 0, 0, 0.4);
    }

    .back {
      display: flex;
      color: #33277b;
      // font-size: 16px;
      align-items: center;
      p {
        margin: 0 0 0 1rem;
      }
      margin: 1rem 0;
      cursor: pointer;
    }

    // .header {
    //   display: flex;
    //   flex-direction: row;
    //   justify-content: space-between;
    // }

    @media screen and (max-width: 500px) {
      padding: 1rem;
    }
  }
`;

export default Settings;
