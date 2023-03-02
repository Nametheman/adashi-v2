import AOS from "aos";
import { Route, Routes } from "react-router-dom";

// eslint-disable-next-line import/no-unassigned-import
import "aos/dist/aos.css";
// eslint-disable-next-line import/no-unassigned-import
import "antd/dist/antd.css";

import SuspenseWrapper from "./components/bits/SuspenseWrapper";
import AuthIndex from "./pages/authPages/AuthIndex";
import Dashboard from "./pages/authPages/Dashboard";
import Home from "./pages/unAuthPages/Home";
import NotFound from "./pages/unAuthPages/NotFound";
import {
  cooperativeGroupSavings,
  cooperativeGroupSavingsForm,
  cooperativeGroupSavingsLanding,
  editCoopGrp,
  editIndSav,
  editTarGrp,
  individualSavings,
  individualSavingsForm,
  savings,
  settings,
  stash,
  targetGroupSavings,
  targetGroupSavingsForm,
  transactions,
  user,
  verifyCard,
  verifyPay,
  withdrawal,
} from "./utils/routes";

function App() {
  AOS.init();
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="/login"
        element={<SuspenseWrapper path="pages/unAuthPages/Login" />}
      />
      <Route
        path="/signup"
        element={<SuspenseWrapper path="pages/unAuthPages/Signup" />}
      />
      <Route
        path="/forgot-password"
        element={<SuspenseWrapper path="pages/unAuthPages/ForgotPassword" />}
      />
      <Route
        path="/verify"
        element={<SuspenseWrapper path="pages/unAuthPages/VerifyAcct" />}
      />
      <Route
        path="/resend-link"
        element={<SuspenseWrapper path="pages/unAuthPages/ResendLink" />}
      />
      <Route
        path="/reset-password"
        element={<SuspenseWrapper path="pages/unAuthPages/ResetPassword" />}
      />
      <Route path={user} element={<AuthIndex />}>
        <Route index element={<Dashboard />} />
        <Route
          path={transactions}
          element={<SuspenseWrapper path="pages/authPages/Transactions" />}
        />
        <Route
          path={settings}
          element={<SuspenseWrapper path="pages/authPages/Settings" />}
        />
        <Route
          path={withdrawal}
          element={<SuspenseWrapper path="pages/authPages/Withdrawal" />}
        />

        <Route
          path={stash}
          element={<SuspenseWrapper path="components/MyStash" />}
        />
        <Route
          path={savings}
          element={<SuspenseWrapper path="pages/authPages/Savings" />}
        />
        <Route
          path={individualSavingsForm}
          element={<SuspenseWrapper path="components/IndSavingsForm" />}
        />
        <Route
          path={individualSavings}
          element={<SuspenseWrapper path="components/IndSavings" />}
        />
        <Route
          path={`${individualSavings}/:planId`}
          element={<SuspenseWrapper path="components/IndSavingsPlan" />}
        />
        <Route
          path={targetGroupSavingsForm}
          element={<SuspenseWrapper path="components/TarGrpSavingsForm" />}
        />
        <Route
          path={targetGroupSavings}
          element={<SuspenseWrapper path="components/TarGrpSavings" />}
        />
        <Route
          path={`${targetGroupSavings}/:planId`}
          element={<SuspenseWrapper path="components/TarGrpSavingsPlan" />}
        />
        <Route
          path={cooperativeGroupSavings}
          element={<SuspenseWrapper path="components/CoopGrpSavings" />}
        />
        <Route
          path={cooperativeGroupSavingsLanding}
          element={<SuspenseWrapper path="components/CoopGrpSavingsLanding" />}
        />
        <Route
          path={cooperativeGroupSavingsForm}
          element={<SuspenseWrapper path="components/CoopGrpSavingsForm" />}
        />
        <Route
          path={`${cooperativeGroupSavings}/:planId`}
          element={<SuspenseWrapper path="components/CoopGrpSavingsPlan" />}
        />
        <Route
          path={`${cooperativeGroupSavings}/:planId/rollover`}
          element={
            <SuspenseWrapper path="components/CoopGrpSavingsPlanRollover" />
          }
        />

        <Route
          path={`${editIndSav}/:planId`}
          element={<SuspenseWrapper path="components/EditIndSav" />}
        />
        <Route
          path={`${editTarGrp}/:planId`}
          element={<SuspenseWrapper path="components/EditTarGrp" />}
        />
        <Route
          path={`${editCoopGrp}/:planId`}
          element={<SuspenseWrapper path="components/EditCoopGrp" />}
        />
        <Route
          path={`${verifyPay}`}
          element={<SuspenseWrapper path="pages/authPages/VerifyPayment" />}
        />
        <Route
          path={`${verifyCard}`}
          element={<SuspenseWrapper path="pages/authPages/VerifyCard" />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
