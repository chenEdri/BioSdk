import { ROUTES } from "../config/constants";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AccountOverview from "../pages/AccountOverview";
import Payment from "../pages/Payment";

/**
 * Application route definitions.
 * Each route maps a URL path to a page component.
 */
export const routes = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.LOGIN, element: <Login /> },
  { path: ROUTES.ACCOUNT, element: <AccountOverview /> },
  { path: ROUTES.PAYMENT, element: <Payment /> },
];