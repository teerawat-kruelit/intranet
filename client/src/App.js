import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import HomePage from "./page/home.page";
import RepairSystem from "./page/repair-system";
import LoginPage from "./page/login.page";
import FormIt from "./page/form-it";
import FromBuilding from "./page/form-building";
import FormItAdmin from "./page/form-it-admin";
import ReportProcess from "./page/report-process";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/repair", element: <RepairSystem /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/form-it", element: <FormIt /> },
    { path: "/form-it/:id", element: <FormItAdmin /> },
    { path: "/form-building", element: <FromBuilding /> },

    { path: "/report-process/:type", element: <ReportProcess /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
