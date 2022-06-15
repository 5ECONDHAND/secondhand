import React, { useState } from "react";
import Dropzone from "react-dropzone";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  TextField,
  OutlinedInput,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import gambar from "../../../assets/images/Profile.png";

const EditProfile = () => {
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    nama: "",
    kota: "",
    alamat: "",
    nomor: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <input
                type="image"
                src={gambar}
                alt="Submit"
                width="96"
                height="96"
                style={{ marginBottom: "1rem" }}
              ></input>
            </div>
          </section>
        )}
      </Dropzone>
      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <FormControl
              sx={{ minWidth: { xs: "30ch", md: "40ch", lg: "50ch" } }}
            >
              <FormHelperText sx={{ fontSize: "1rem", color: "black", m: 0 }}>
                Nama*
              </FormHelperText>
              <OutlinedInput
                placeholder="Nama"
                onChange={handleChange("nama")}
                sx={{ borderRadius: "1rem" }}
                required
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{ minWidth: { xs: "30ch", md: "40ch", lg: "50ch" } }}
            >
              <FormHelperText sx={{ fontSize: "1rem", color: "black", m: 0 }}>
                Kota*
              </FormHelperText>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.kota}
                onChange={handleChange("kota")}
                sx={{ borderRadius: "1rem" }}
                required
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={"Coba"}>Coba</MenuItem>
                <MenuItem value={"Cek"}>Cek</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{ minWidth: { xs: "30ch", md: "40ch", lg: "50ch" } }}
            >
              <FormHelperText sx={{ fontSize: "1rem", color: "black", m: 0 }}>
                Alamat*
              </FormHelperText>
              <OutlinedInput
                placeholder="Contoh: Jalan Ikan Hiu 33"
                onChange={handleChange("alamat")}
                sx={{ borderRadius: "1rem" }}
                multiline
                rows={4}
                required
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{ minWidth: { xs: "30ch", md: "40ch", lg: "50ch" } }}
            >
              <FormHelperText sx={{ fontSize: "1rem", color: "black", m: 0 }}>
                No Handphone*
              </FormHelperText>
              <OutlinedInput
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                placeholder="contoh: +628123456789"
                onChange={handleChange("nomor")}
                sx={{ borderRadius: "1rem" }}
                required
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{ minWidth: { xs: "30ch", md: "40ch", lg: "50ch" } }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disableElevation
                sx={{
                  borderRadius: "1rem",
                  textTransform: "none",
                  background: "#7126B5",
                  py: "15px",
                }}
                required
              >
                Terbitkan
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EditProfile;
