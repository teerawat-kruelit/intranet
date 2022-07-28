import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import HomePage from './page/home.page'
import RepairSystem from './page/repair-system'
import LoginPage from './page/login.page'
import FormIt from './page/form-it'
import FormItAdmin from './page/form-it-admin'
import FromBuilding from './page/form-building'
import FromBuildingAdmin from './page/form-building-admin'
import ReportProcess from './page/report-process'
import StockSystem from './page/stock'
import RepairSystemPO from './page/repair-system-po'
import FormPO from './page/form-po'
import RepairSystemFin from './page/repair-system-fin'
import FormFin from './page/form-fin'
import RepairSystemAcc from './page/repair-system-acc'
import FormAcc from './page/form-acc'

const App = () => {
  let routes = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/repair', element: <RepairSystem /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/form-it', element: <FormIt /> },
    { path: '/form-it/:id', element: <FormItAdmin /> },
    { path: '/form-building', element: <FromBuilding /> },
    { path: '/form-building/:id', element: <FromBuildingAdmin /> },
    { path: '/report-process/:type', element: <ReportProcess /> },

    { path: '/stock', element: <StockSystem /> },

    { path: '/repair-po', element: <RepairSystemPO /> },
    { path: '/form-po/:id', element: <FormPO /> },

    { path: '/repair-fin', element: <RepairSystemFin /> },
    { path: '/form-fin/:id', element: <FormFin /> },

    { path: '/repair-acc', element: <RepairSystemAcc /> },
    { path: '/form-acc/:id', element: <FormAcc /> }
  ])
  return routes
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper
