import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "components/CustomInput/CustomInput";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function AddMahasiswaAdmin(params) {

  const classes = useStyles();
  const [nim,setNim] = useState('');
  const [name,setName] = useState('');
  const [angkatan,setAngkatan] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');

  const saveDosen = ()=>{
    const setedMahasiswa = JSON.parse(Cookies.get('mahasiswa'));

    if (nim == '' && angkatan == '' && name == ''&& email == ''&& phone == ''&& password == '') {
        Swal.fire('Terjadi Kesalahan','Gagal untuk menyimpan data, Semua data Wajib di isi','error')
        return;
    }

    setedMahasiswa.push({
        id:setedMahasiswa[setedMahasiswa.length - 1].id + 1,nim,angkatan,namaLengkap:name,email,nomorTelepon:phone
    })
    
    Cookies.set('mahasiswa',JSON.stringify(setedMahasiswa))
    Swal.fire({
      title: 'Berhasil!',
      text: 'Berhasil menambahkan data Mahasiswa',
      icon: 'success',
      confirmButtonText: 'Tutup'
    })
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Tambahkan Data Mahasiswa</h4>
          </CardHeader>
          <CardBody>
            <CustomInput
              labelText="NIM"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setNim(event.target.value)
                },
                value:nim
              }}
            />
            <CustomInput
              labelText="Tahun Angkatan"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setAngkatan(event.target.value)
                },
                value:angkatan
              }}
            />
            <CustomInput
              labelText="Name"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setName(event.target.value)
                },
                value:name
              }}
            />
            <CustomInput
              labelText="E-mail"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setEmail(event.target.value)
                },
                value:email
              }}
            />
            <CustomInput
              labelText="Nomor Handphone"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setPhone(event.target.value)
                },
                value:phone
              }}
            />
            <Button block onClick={()=>{saveDosen()}} color="primary">Simpan</Button>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}