// @mui material components
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Card } from "@mui/material";
import { toast } from "react-toastify";
import { addWarehouseApi } from "services/api";

const schema = yup.object().shape({
  name: yup.string().required(),
});

function Warehouse() {
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const res = await addWarehouseApi(data);
    if (res?.success) {
      toast("Warehouse Added Successfully!", { type: "success" });
      navigate("/dashboard");
    } else {
      toast(res?.message, { type: "error" });
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Add Warehouse
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      name="name"
                      label="Warehouse Location"
                      variant="standard"
                      fullWidth
                      error={!!errors?.name}
                      helperText={errors?.name?.message}
                      {...register("name")}
                    />
                  </MDBox>

                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color="info" fullWidth type="submit">
                      Add Warehouse
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Warehouse;
