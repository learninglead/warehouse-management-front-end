// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import User from "layouts/user";
import Warehouse from "layouts/warehouse";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    role: "all",
  },
  {
    type: "collapse",
    name: "Warehouse",
    key: "warehouse",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/warehouse",
    component: <Warehouse />,
    role: "support",
  },
  {
    noDisplay: true,
    type: "collapse",
    name: "Log Out",
    key: "log-out",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/sign-in",
    component: <SignIn />,
    role: "all",
  },
  {
    noDisplay: true,
    type: "collapse",
    name: "Log Out",
    key: "log-in",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/register",
    component: <SignUp />,
    role: "all",
  },
  {
    noDisplay: true,
    type: "collapse",
    name: "Add User",
    key: "add-user",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/user",
    component: <User />,
    role: "admin",
  },
];

export default routes;
