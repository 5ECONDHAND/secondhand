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
import gambar from "../../../assets/images/add.png";

const styles = {
  "&.MuiButton-root": {
    borderColor: "#7126B5",
    borderRadius: "1rem",
    textTransform: "none",
    py: "15px",
    color: "black",
  },
};

const AddProduct = () => {
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    nama: "",
    harga: "",
    kategori: "",
    deskripsi: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className="Form">
      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <FormControl
              sx={{ minWidth: { xs: "30ch", md: "40ch", lg: "50ch" } }}
            >
              <FormHelperText sx={{ fontSize: "1rem", color: "black", m: 0 }}>
                Nama Produk
              </FormHelperText>
              <OutlinedInput
                placeholder="Nama Produk"
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
                Harga Produk
              </FormHelperText>
              <OutlinedInput
                placeholder="Rp 0,00"
                onChange={handleChange("harga")}
                sx={{ borderRadius: "1rem" }}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{ minWidth: { xs: "30ch", md: "40ch", lg: "50ch" } }}
            >
              <FormHelperText sx={{ fontSize: "1rem", color: "black", m: 0 }}>
                Pilih Kategori
              </FormHelperText>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.kategori}
                onChange={handleChange("kategori")}
                sx={{ borderRadius: "1rem" }}
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
                Deskripsi
              </FormHelperText>
              <OutlinedInput
                placeholder="Contoh: Jalan Ikan Hiu 33"
                onChange={handleChange("deskripsi")}
                sx={{ borderRadius: "1rem" }}
                multiline
                rows={4}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{ minWidth: { xs: "30ch", md: "40ch", lg: "50ch" } }}
            >
              <FormHelperText sx={{ fontSize: "1rem", color: "black", m: 0 }}>
                Foto Produk
                <Dropzone
                  onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                >
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
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item>
            <FormControl
              sx={{ minWidth: { xs: "15ch", md: "20ch", lg: "25ch" } }}
            >
              <Button
                fullWidth
                variant="outlined"
                size="large"
                disableElevation
                sx={styles}
              >
                Preview
              </Button>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{ minWidth: { xs: "15ch", md: "20ch", lg: "25ch" } }}
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
                Terbitkan
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AddProduct;
