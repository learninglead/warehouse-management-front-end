// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { getAllUserApi, getAllWarehouseApi } from "services/api";
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { toast } from "react-toastify";

const columns = [
  { Header: "ID", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Email", accessor: "email" },
  { Header: "Role", accessor: "role" },
];

const warehouseColumns = [
  { Header: "ID", accessor: "id" },
  { Header: "Name", accessor: "name" },
];

function Dashboard() {
  const [controller] = useMaterialUIController();
  const navigate = useNavigate();
  const { user } = controller;
  const [rows, setRows] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    if (user.role === "admin") {
      getUsers();
    } else if (user.role === "purchase") {
      getWarehouses();
    }
  }, [user]);

  const getUsers = async () => {
    const data = await getAllUserApi();
    if (data?.success) {
      setRows(data?.users);
    } else {
      toast("Couldn't get users", { type: "error" });
    }
  };
  const getWarehouses = async () => {
    const data = await getAllWarehouseApi();

    if (data?.success) {
      setWarehouses(data?.warehouses);
      console.log("data?.warehouses", data?.warehouses);
    } else {
      toast("Couldn't get warehouses", { type: "error" });
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox> */}
      {user?.role === "admin" && (
        <MDBox pt={6} pb={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <MDTypography variant="h6" color="white">
                  Users
                </MDTypography>
                <MDButton onClick={() => navigate("/user")}>Add User</MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </MDBox>
      )}
      {user?.role === "purchase" && (
        <MDBox pt={6} pb={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <MDTypography variant="h6" color="white">
                  Warehouses
                </MDTypography>
                <MDButton onClick={() => navigate("/warehouse")}>Add Warehouse</MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: warehouseColumns, rows: warehouses }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </MDBox>
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
