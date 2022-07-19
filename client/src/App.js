import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import HomePage from "./page/home.page";
import RepairSystem from "./page/repair-system";
import LoginPage from "./page/login.page";
import FormIt from "./page/form-it";
import FormItAdmin from "./page/form-it-admin";
import FromBuilding from "./page/form-building";
import FromBuildingAdmin from "./page/form-building-admin";
import ReportProcess from "./page/report-process";
import StockSystem from "./page/stock";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/repair", element: <RepairSystem /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/form-it", element: <FormIt /> },
    { path: "/form-it/:id", element: <FormItAdmin /> },
    { path: "/form-building", element: <FromBuilding /> },
    { path: "/form-building/:id", element: <FromBuildingAdmin /> },
    { path: "/report-process/:type", element: <ReportProcess /> },

    { path: "/stock", element: <StockSystem /> },
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
