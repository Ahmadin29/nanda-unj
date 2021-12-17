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
                    <li>Data Akun Dosen, bisa dengan input manual, import file,</li>
                    <li>Data Akun Mahasiswa, bisa dengan input manual, import file,</li>
                    <li>Data Mata Kuliah, input mata kuliah sesuai dengan kode mata kuliah,</li>
                    <li>Daftar Kode Seksi, input kode seksi sesuai mata kuliah yang sudah diinput di mata kuliah,</li>
                    <li>Tambah Bank Soal, bank soal ini berupa nama paket soal ujian (hanya bisa diinput oleh dosen),</li>
                    <li>Setelah dosen membuat bank soal / paket soal, lalu buat daftar pertanyaan, bisa diinput manual bisa juga diimport dari excel untuk soal text nya,</li>
                    <li>Setelah membuat kode seksi, dosen dapat membuat kelas ujian, bisa dijadwalkan sehingga lebih mudah,</li>
                    <li>Siswa otomatis masuk kedalam kelas ujian sesuai mata kuliah yang diambil,</li>
                    <li>Siswa login ke sistem lalu mengikuti kegiatan ujian</li>
                    <li>Siswa mengikuti kegiatan ujian dengan hasilnya bisa dipantau langsung oleh admin dan juga Guru,</li>
                    <li>Cetak atau eksport laporan nilai dari kegiatan ujian,</li>
                    <li>Selesai.</li>
                  </ol>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
