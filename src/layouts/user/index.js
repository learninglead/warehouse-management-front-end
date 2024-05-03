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
import { Card, InputLabel, MenuItem, TextField } from "@mui/material";
import { addUserApi } from "services/api";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  role: yup.string().required(),
});

function User() {
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
    const res = await addUserApi(data);
    if (res?.success) {
      toast("User Added Successfully!", { type: "success" });
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
                  Add User
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      name="name"
                      label="Name"
                      variant="standard"
                      fullWidth
                      error={!!errors?.name}
                      helperText={errors?.name?.message}
                      {...register("name")}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="email"
                      label="Email"
                      variant="standard"
                      fullWidth
                      error={!!errors?.email}
                      name="email"
                      helperText={errors?.email?.message}
                      {...register("email")}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="password"
                      label="Password"
                      variant="standard"
                      fullWidth
                      name="password"
                      error={!!errors?.password}
                      helperText={errors?.password?.message}
                      {...register("password")}
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          select
                          variant="standard"
                          error={!!errors.role}
                          required
                          helperText={errors.role ? errors?.role?.message : ""}
                          {...register("role")}
                        >
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="sales">Sales</MenuItem>
                          <MenuItem value="purchase">Purchase</MenuItem>
                          <MenuItem value="support">Support</MenuItem>
                          <MenuItem value="manager">Manager</MenuItem>
                        </TextField>
                      )}
                    />
                    {/* <Select
                        labelId={`role-select-${Math.random()}`}
                        id="role-select"
                        value={age}
                        onChange={handleChange}
                        label="Role"
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="sales">Sales</MenuItem>
                        <MenuItem value="purchase">Purchase</MenuItem>
                        <MenuItem value="support">Support</MenuItem>
                        <MenuItem value="manager">Manager</MenuItem>
                      </Select> */}
                    {/* </FormControl> */}
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color="info" fullWidth type="submit">
                      Add User
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

export default User;
