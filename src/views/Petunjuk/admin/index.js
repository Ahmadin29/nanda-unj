import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function AdminUserGuide() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>ALUR APLIKASI</h4>
              <p className={classes.cardCategoryWhite}>Alur penggunaan aplikasi</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <p>Untuk bisa menjalankan kegiatan ujian online, silahkan ikuti langkah-langkah berikut:</p>
                  <ol>
                  <li>Data Akun Dosen menampilkan tabel daftar dosen-dosen, menambahkan akun dosen, mengimport data dosen dan mengubah data dosen yang sudah ada.</li>
                    <li>Data Akun Mahasiswa menampilakn tabel daftar mahasiswa, menambahkan akun mahasiswa, mengimport data mahasiswa dan mengubah data mahasiswa yang sudah ada.</li>
                    <li>Data Mata Kuliah menampilkan tabel daftar mata kuliah, menambahkan akun dosen, mengimport data dosen dan mengubah data dosen yang sudah ada.</li>
                    <li>Data Kode Seksi menampilkan tabel daftar kode seksi, menambahkan akun dosen, mengimport data dosen dan mengubah data dosen yang sudah ada.</li>
                    <li>Petunjuk menampilkan petunjuk alur aplikasi.</li> 
                    <li>Selesai.</li>
                  </ol>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
