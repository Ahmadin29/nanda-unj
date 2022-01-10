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

export default function EditMahasiswaAdmin(params) {

  const classes = useStyles();
  const [nim,setNim] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');

  const getId = () => {
    return location.pathname.split("/")[
      location.pathname.split("/").length - 1
    ];
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = ()=>{
    const setedMahasiswa = Cookies.get('mahasiswa');

    const selected = JSON.parse(setedMahasiswa).filter(v=>{
      return v.id == getId();
    })

    setNim(selected[0].nim)
    setName(selected[0].namaLengkap)
    setEmail(selected[0].email)
    setPhone(selected[0].nomorTelepon)
  }

  const saveDosen = ()=>{
    const setedMahasiswa = JSON.parse(Cookies.get('mahasiswa'));

    setedMahasiswa.map(val=>{
      if (val.id == getId()) {
        val.nim = nim;
        val.namaLengkap = name;
        val.email = email
        val.nomorTelepon = phone;
      }
    })
    
    Cookies.set('mahasiswa',JSON.stringify(setedMahasiswa))
    Swal.fire({
      title: 'Berhasil!',
      text: 'Berhasil mengubah data Mahasiswa',
      icon: 'success',
      confirmButtonText: 'Tutup'
    })
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Ubah Data Mahasiswa</h4>
          </CardHeader>
          <CardBody>
            <CustomInput
              labelText="NIP"
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
            <Button block onClick={()=>{saveDosen()}} color="primary">Simpan Perubahan</Button>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
