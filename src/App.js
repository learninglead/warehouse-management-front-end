import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";

// Material Dashboard 2 React themes
import themeRTL from "assets/theme/theme-rtl";

//Toaster
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setUser } from "context";
import { getProfileApi } from "services/api";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, direction, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    const data = await getProfileApi();
    if (data?.id) {
      setUser(dispatch, data);
    }
  };

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      const isAuth = localStorage.getItem("token");
      if (route.route && (route.route === "/sign-in" || route.route === "/register")) {
        const { user } = controller;
        if (isAuth && user.role !== "all" && user.role !== route.role) {
          return (
            <Route
              exact
              path={route.route}
              element={<Navigate to="/dashboard" />}
              key={route.key}
            />
          );
        }
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      } else if (route.route) {
        if (!isAuth) {
          return (
            <Route exact path={route.route} element={<Navigate to="/sign-in" />} key={route.key} />
          );
        }
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={themeRTL}>
      <CssBaseline />
      <ToastContainer />

      <Routes>
        {getRoutes(routes)}

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brandName="Warehouse Management"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
    </ThemeProvider>
  );
}
