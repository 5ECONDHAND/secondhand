import { Box, Grid } from "@mui/material";
import React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { EditProfile } from "../../components/molecules/edit";
const Edit = () => {
  return (
    <Box mt="3rem" sx={{ textAlign: "center" }}>
      <Grid container>
        <Grid item lg={2} md={2} sm={2} xs={2}>
          <ArrowBack />
        </Grid>
        <Grid item lg={8} md={8} sm={8} xs={8}>
          <EditProfile />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Edit;
