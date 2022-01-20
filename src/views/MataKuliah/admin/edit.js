import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";

import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import CheckboxStyles from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";

import CustomInput from "components/CustomInput/CustomInput";
import Swal from "sweetalert2";

const styles = {
  ...CheckboxStyles,
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

export default function EditMataKuliahAdmin(params) {

  const classes = useStyles();
  const [kodeMatKul,setKodeMatKul] = useState('');
  const [jenisMatKul,setJenisMatKul] = useState('');
  const [namaMatKul,setNamaMatKul] = useState('');
  const [sks,setSks] = useState('');
  const [deskripsiMatkul,setDeskripsiMatkul] = useState('');
  const [seksiKuliah,setSeksiKuliah] = useState([]);

  const getId = () => {
    return location.pathname.split("/")[
      location.pathname.split("/").length - 1
    ];
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = ()=>{
    const setedMataKuliah = localStorage.getItem('mataKuliah');

    const selected = JSON.parse(setedMataKuliah).filter(v=>{
      return v.id == getId();
    });

    const dataSeksi = [];

    selected[0].seksi.map(v=>{
      dataSeksi.push(v);
    })

    console.log(selected[0]);

    setKodeMatKul(selected[0].kodematkul);
    setJenisMatKul(selected[0].jenisMatKul);
    setNamaMatKul(selected[0].namaMatKul);
    setSks(selected[0].sks);
    setDeskripsiMatkul(selected[0].deskripsi);
  }

  const saveMatkul = ()=>{
    const setedMatkul = JSON.parse(localStorage.getItem('mataKuliah'));

    if (kodeMatKul == '' && jenisMatKul == '' && namaMatKul == '' && sks == ''&& deskripsiMatkul == '' && !seksiKuliah) {
        Swal.fire('Terjadi Kesalahan','Gagal untuk menyimpan data, Semua data Wajib di isi','error')
        return;
    }

    setedMatkul.map(val=>{
      if (val.id == getId()) {
        val.kodematkul  = kodeMatKul;
        val.jenisMatkul  = jenisMatKul;
        val.namaMatKul  = namaMatKul;
        val.deskripsi   = deskripsiMatkul;
        val.semester   = sks;
        val.seksi       = seksiKuliah.length ?  seksiKuliah :val.seksi ;
      }
    })
    
    localStorage.setItem('mataKuliah',JSON.stringify(setedMatkul))
    Swal.fire({
      title: 'Berhasil!',
      text: 'Berhasil mengubah data mata kuliah',
      icon: 'success',
      confirmButtonText: 'Tutup'
    })
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Ubah Data Mata Kuliah</h4>
          </CardHeader>
          <CardBody>
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
                value:kodeMatKul,
              }}
            />
            <CustomInput
              labelText="Jenis Mata Kuliah"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setJenisMatKul(event.target.value)
                },
                value:jenisMatKul,
              }}
            />
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
                value:namaMatKul,
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
                value:sks,
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
                value:deskripsiMatkul,
              }}
            />
            <Button block onClick={()=>{saveMatkul()}} color="primary">Simpan Perubahan</Button>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}