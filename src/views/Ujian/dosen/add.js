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

export default function AddUjianDosen(params) {

  const classes = useStyles();
  const [namaUjian,setNamaUjian] = useState();
  const [tanggal,setTanggal] = useState();
  const [waktu,setWaktu] = useState();
  const [lamaUjian,setLamaUjian] = useState();
  const [bankSoal,setBankSoal] = useState();

  const saveDosen = ()=>{
    const setedDosen = JSON.parse(Cookies.get('dosen'));

    if (nip == '' && nidn == ''&& nidk == ''&& name == ''&& email == ''&& phone == ''&& password == '') {
        Swal.fire('Terjadi Kesalahan','Gagal untuk menyimpan data, Semua data Wajib di isi','error')
        return;
    }

    setedDosen.push({
        id:setedDosen[setedDosen.length - 1].id + 1,nip,nidn,nidk,namaLengkap:name,email,nomorTelepon:phone
    })
    
    Cookies.set('dosen',JSON.stringify(setedDosen))
    Swal.fire({
      title: 'Berhasil!',
      text: 'Berhasil menambahkan data dosen',
      icon: 'success',
      confirmButtonText: 'Tutup'
    })
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Ubah Data Dosen</h4>
          </CardHeader>
          <CardBody>
            <CustomInput
                labelText="Nama Ujian"
                formControlProps={{
                    fullWidth: true,
                }}
                style={{
                    marginBottom:"0px",
                }}
                inputProps={{
                    onChange:(event)=>{
                        setNamaUjian(event.target.value)
                    },
                    value:namaUjian
                }}
            />
            <CustomInput
                labelText="Tanggal Ujian"
                formControlProps={{
                    fullWidth: true,
                }}
                style={{
                    marginBottom:"0px",
                }}
                inputProps={{
                    onChange:(event)=>{
                        setTanggal(event.target.value)
                    },
                    value:tanggal,
                    type:'date'
                }}
            />
            <CustomInput
                labelText="Waktu Ujian"
                formControlProps={{
                    fullWidth: true,
                }}
                style={{
                    marginBottom:"0px",
                }}
                inputProps={{
                    onChange:(event)=>{
                        setWaktu(event.target.value)
                    },
                    value:waktu,
                }}
            />
            <CustomInput
                labelText="Lama Ujian (Menit)"
                formControlProps={{
                    fullWidth: true,
                }}
                style={{
                    marginBottom:"0px",
                }}
                inputProps={{
                    onChange:(event)=>{
                        setLamaUjian(event.target.value)
                    },
                    value:lamaUjian,
                }}
            />
            <Table
              tableHeaderColor="primary"
              tableHead={["Mata Kuliah", "Kode Mata Kuliah", "Jumlah Soal", "Status","Detail",'Edit','Hapus']}
              tableData={bankSoal}
            />
            <Button block onClick={()=>{saveDosen()}} color="primary">Simpan Perubahan</Button>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}