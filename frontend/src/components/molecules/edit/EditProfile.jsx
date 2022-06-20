import React, { useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  OutlinedInput,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import gambar from "../../../assets/images/Profile.png";
import { validateProfile } from "../../../utils/validators";

const EditProfile = () => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    nama: "",
    kota: "",
    alamat: "",
    nomor: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    validateProfile(values, setError);
    console.log(values);
    console.log(error);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleImage = (e) => {
    const selected = e.target.files[0];
    const types = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && types.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    }
  };
  return (
    <div>
      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3} direction="column" alignItems="center">
          <div>
            <div>
              {!preview && (
                <Button
                  variant="contained"
                  component="label"
                  onChange={handleImage}
                  disableElevation
                  sx={{
                    background: "transparent",
                    border: "none",
                    ":hover": { background: "transparent" },
                  }}
                >
                  <img src={gambar} alt="" />
                  <input type="file" hidden />
                </Button>
              )}
            </div>
          </div>
          {preview ? (
            <>
              <Button
                variant="contained"
                component="label"
                onChange={handleImage}
                disableElevation
                sx={{
                  background: "transparent",
                  border: "none",
                  ":hover": { background: "transparent" },
                }}
              >
                <img
                  src={preview}
                  alt=""
                  style={{
                    width: "96px",
                    height: "96px",
                    marginBottom: "1rem",
                  }}
                />
                <input type="file" hidden />
              </Button>
            </>
          ) : (
            ""
          )}
          <Grid item>
            <FormControl
              sx={{ minWidth: { xs: "30ch", md: "40ch", lg: "50ch" } }}
            >
              <FormHelperText sx={{ fontSize: "1rem", color: "black", m: 0 }}>
                Nama*
              </FormHelperText>
              <OutlinedInput
                error={error.nama ? true : false}
                placeholder="Nama"
                value={values.nama}
                onChange={handleChange("nama")}
                sx={{ borderRadius: "1rem" }}
              />
              <FormHelperText sx={{ m: 0, mb: "1rem" }}>
                {error.nama}
              </FormHelperText>
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
                error={error.kota ? true : false}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.kota}
                onChange={handleChange("kota")}
                sx={{ borderRadius: "1rem" }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={"Coba"}>Coba</MenuItem>
                <MenuItem value={"Cek"}>Cek</MenuItem>
              </Select>
              <FormHelperText sx={{ m: 0, mb: "1rem" }}>
                {error.kota}
              </FormHelperText>
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
                error={error.alamat ? true : false}
                placeholder="Contoh: Jalan Ikan Hiu 33"
                onChange={handleChange("alamat")}
                sx={{ borderRadius: "1rem" }}
                multiline
                rows={4}
              />
              <FormHelperText sx={{ m: 0, mb: "1rem" }}>
                {error.alamat}
              </FormHelperText>
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
                error={error.nomor ? true : false}
                placeholder="contoh: +628123456789"
                value={values.nomor}
                onChange={handleChange("nomor")}
                sx={{ borderRadius: "1rem" }}
              />
              <FormHelperText sx={{ m: 0, mb: "1rem" }}>
                {error.nomor}
              </FormHelperText>
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
              >
                Simpan
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EditProfile;