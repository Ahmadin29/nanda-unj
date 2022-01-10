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

export default function AddMataKuliahAdmin(params) {

  const classes = useStyles();
  const [namaMatKul,setNamaMatKul] = useState('');
  const [kodeMatKul,setKodeMatKul] = useState('');
  const [deskripsiMatkul,setDeskripsiMatkul] = useState('');
  const [sks,setSks] = useState('');
  const [seksiKuliah,setSeksiKuliah] = useState([]);

  const saveMatkul = ()=>{
    const setedMatkul = JSON.parse(Cookies.get('mataKuliah'));

    if (namaMatKul == '' && kodeMatKul == '' && deskripsiMatkul ==  '' && semesterMatkul == ''&& !seksiKuliah) {
        Swal.fire('Terjadi Kesalahan','Gagal untuk menyimpan data, Semua data Wajib di isi','error')
        return;
    }

    setedMatkul.push(
      {
          id:setedMatkul[setedMatkul.length - 1].id + 1,
          kodematkul:kodeMatKul,
          namaMatKul:namaMatKul,
          deskripsi:deskripsiMatkul,
          sks:sks, 
          seksi:seksiKuliah
        },
    )
    
    Cookies.set('mataKuliah',JSON.stringify(setedMatkul));

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
            <h4 className={classes.cardTitleWhite}>Tambahkan Data Mata Kuliah</h4>
          </CardHeader>
          <CardBody>
            <CustomInput
              labelText="Nama Mata Kuliah"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setNamaMatKul(event.target.value)
                },
              }}
            />
            <CustomInput
              labelText="Kode Mata Kuliah"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setKodeMatKul(event.target.value)
                },
              }}
            />
            <CustomInput
              labelText="Deskripsi Mata Kuliah"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setDeskripsiMatkul(event.target.value)
                },
              }}
            />
            <CustomInput
              labelText="SKS"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setSks(event.target.value)
                },
              }}
            />
            <Button block onClick={()=>{saveMatkul()}} color="primary">Simpan Perubahan</Button>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}