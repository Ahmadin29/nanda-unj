import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";

import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import CheckboxStyles from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";

import CustomInput from "components/CustomInput/CustomInput";
import Cookies from "js-cookie";
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

export default function AddSeksiDosen(params) {

  const classes = useStyles();
  const [kodeSeksi,setKodeSeksi] = useState('');
  const [dosen,setDosen] = useState('');
  const [sks,setSks] = useState('');
  const [jenisMatkul,setjenisMatkul] = useState('');
  const [matkul,setMatkul] = useState();

  const getId = () => {
    return location.pathname.split("/")[
        location.pathname.split("/").length - 3
    ];
  };

  const saveMatkul = ()=>{

    const setedMatkul = JSON.parse(Cookies.get('mataKuliah'));

    const selected = setedMatkul.filter(v=>{
        return v.id == getId();
    });

    const setedKodeSeksi = JSON.parse(Cookies.get('kodeSeksi'));

    if (kodeSeksi == '' && dosen == '' && sks == ''&& jenisMatkul == '') {
        Swal.fire('Terjadi Kesalahan','Gagal untuk menyimpan data, Semua data Wajib di isi','error')
        return;
    }

    const id = setedKodeSeksi[setedKodeSeksi.length - 1].id + 1;

    setedKodeSeksi.push(
      {
          id:id,
          kodeSeksi:kodeSeksi,
          dosen:dosen,
          sks:sks,
          jenisMatkul:jenisMatkul,
          mataKuliah:{
            name:selected[0].namaMatKul
          }
        },
    )
    
    Cookies.set('kodeSeksi',JSON.stringify(setedKodeSeksi));

    setedMatkul.map(val=>{
      if (val.id == getId()) {

        const addSeksi = {
          id:id,
          kodeSeksi:kodeSeksi,
          dosen:dosen,
          sks:sks,
          jenisMatkul:jenisMatkul
        };

        val.seksi.push(addSeksi);
      }
    })
    
    Cookies.set('mataKuliah',JSON.stringify(setedMatkul))
    
    Swal.fire({
      title: 'Berhasil!',
      text: 'Berhasil mengubah data mata kuliah',
      icon: 'success',
      confirmButtonText: 'Tutup'
    })

    Swal.fire({
      title: 'Berhasil!',
      text: 'Berhasil menambahkan Kode Seksi',
      icon: 'success',
      confirmButtonText: 'Tutup'
    })
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Tambahkan Kode Seksi Mata Kuliah</h4>
          </CardHeader>
          <CardBody>
            <CustomInput
              labelText="Kode Seksi Mata Kuliah"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setKodeSeksi(event.target.value)
                },
              }}
            />
            <CustomInput
              labelText="Dosen Pengampu"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setDosen(event.target.value)
                },
              }}
            />
            <CustomInput
              labelText="Jumlah SKS"
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
                    setjenisMatkul(event.target.value)
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