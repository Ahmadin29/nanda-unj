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

export default function EditSeksiAdmin(params) {

  const classes = useStyles();
  const [kodeSeksi,setKodeSeksi] = useState('');
  const [dosen,setDosen] = useState('');
  const [sks,setSks] = useState('');
  const [jenisMatkul,setjenisMatkul] = useState('');
  const [matkul,setMatkul] = useState();

  const saveMatkul = ()=>{
    const setedKodeSeksi = JSON.parse(Cookies.get('kodeSeksi'));

    if (kodeSeksi == '' && dosen == '' && sks == ''&& jenisMatkul == '') {
        Swal.fire('Terjadi Kesalahan','Gagal untuk menyimpan data, Semua data Wajib di isi','error')
        return;
    }

    setedKodeSeksi.map(val=>{
        if (val.id == getId()) {
          val.kodeSeksi         = kodeSeksi;
          val.dosen             = dosen;
          val.sks               = sks;
          val.jenisMatkul       = jenisMatkul
        }
    })
    
    Cookies.set('kodeSeksi',JSON.stringify(setedKodeSeksi));

    Swal.fire({
      title: 'Berhasil!',
      text: 'Berhasil menambahkan data Mahasiswa',
      icon: 'success',
      confirmButtonText: 'Tutup'
    })
  }

  const getId = () => {
    return location.pathname.split("/")[
      location.pathname.split("/").length - 1
    ];
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = ()=>{
    const setedKodeSeksi = Cookies.get('kodeSeksi');

    const selected = JSON.parse(setedKodeSeksi).filter(v=>{
      return v.id == getId();
    });

    setKodeSeksi(selected[0].kodeSeksi);
    setDosen(selected[0].dosen);
    setSks(selected[0].sks);
    setjenisMatkul(selected[0].jenisMatkul);
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Tambahkan Data Seksi Kuliah</h4>
          </CardHeader>
          <CardBody>
            <CustomInput
              labelText="Kode Seksi Kuliah"
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
                value:kodeSeksi
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
                value:dosen
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
                value:sks
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
                value:jenisMatkul
              }}
            />
            <Button block onClick={()=>{saveMatkul()}} color="primary">Simpan Perubahan</Button>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}