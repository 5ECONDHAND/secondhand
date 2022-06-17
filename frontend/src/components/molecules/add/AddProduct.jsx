import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
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
import gambar from "../../../assets/images/add.png";
import { validateProduct } from "../../../utils/validators";

const styles = {
  "&.MuiButton-root": {
    borderColor: "#7126B5",
    borderRadius: "1rem",
    textTransform: "none",
    py: "15px",
    color: "black",
  },
};
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const AddProduct = (props) => {
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    nama: "",
    harga: "",
    kategori: "",
    deskripsi: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    validateProduct(values, setError);
    console.log(values);
    console.log(error);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [files, setFiles] = useState([]);
  const { fileRejections, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 4,
      accept: {
        "image/*": [],
      },
      minSize: 0,
      maxSize: 1048576,
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        console.log(acceptedFiles);
      },
    });

  const fileRejectionItems = fileRejections.map(({ errors }) => {
    return (
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    );
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt=""
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

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
                error={error.nama ? true : false}
                placeholder="Nama Produk"
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
                Harga Produk
              </FormHelperText>
              <OutlinedInput
                error={error.harga ? true : false}
                placeholder="Rp 0,00"
                value={values.harga}
                onChange={handleChange("harga")}
                sx={{ borderRadius: "1rem" }}
              />
              <FormHelperText sx={{ m: 0, mb: "1rem" }}>
                {error.harga}
              </FormHelperText>
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
                error={error.kategori ? true : false}
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
              <FormHelperText sx={{ m: 0, mb: "1rem" }}>
                {error.kategori}
              </FormHelperText>
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
                error={error.deskripsi ? true : false}
                placeholder="Contoh: Jalan Ikan Hiu 33"
                onChange={handleChange("deskripsi")}
                sx={{ borderRadius: "1rem" }}
                multiline
                rows={4}
              />
              <FormHelperText sx={{ m: 0, mb: "1rem" }}>
                {error.deskripsi}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{ minWidth: { xs: "30ch", md: "40ch", lg: "50ch" } }}
            >
              <FormHelperText sx={{ fontSize: "1rem", color: "black", m: 0 }}>
                Foto Produk
                <section className="container">
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    style={{ display: "flex", marginBottom: "1rem" }}
                  >
                    <div>
                      <input {...getInputProps()} />
                      <img src={gambar} alt="" style={thumbsContainer} />
                    </div>
                    <div>
                      <aside style={thumbsContainer}>
                        {thumbs}
                        {fileRejectionItems}
                      </aside>
                    </div>
                  </div>
                </section>
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
