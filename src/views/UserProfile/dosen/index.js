import React, { useEffect, useState } from "react";
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
import Cookies from "js-cookie";
import Swal from "sweetalert2";

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

export default function DosenProfile() {
  const classes = useStyles();

  const [username,setUsername] = useState('');
  const [nip,setNip] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [address,setAddress] = useState('');
  const [ttl,setTtl] = useState('');
  const [phone,setPhone] = useState('');

  const [oldPassword,setOldPassword] = useState('');
  const [password,setPassword] = useState('');
  const [confrimPassword,setConfirmPassword] = useState('');

  const getData = ()=>{
    const admin = JSON.parse(Cookies.get('userDosen'));

    setUsername(admin.username);
    setName(admin.name);
    setNip(admin.nip);
    setEmail(admin.email);
    setPhone(admin.phone);
    setAddress(admin.alamat);
    setTtl(admin.ttl);
  }

  useEffect(()=>{
    getData();
  },[])

  const updateProfile = ()=>{

    const admin = JSON.parse(Cookies.get('userDosen'));

    const data ={
      username:username,
      name:name,
      email:email,
      phone:email,
      alamat:email,
      ttl:ttl,
      nip:nip,
    }

    if (oldPassword != '') {
      if (oldPassword == admin.password ) {
        if (password == confrimPassword) {
          data.password = password
        }else{
          Swal.fire({
            title: 'Terjadi kesalahan!',
            text: 'Password baru dan konfirmasi password baru tidak sama',
            icon: 'error',
            confirmButtonText: 'Tutup'
          })
        }
      }else{
        Swal.fire({
          title: 'Terjadi kesalahan!',
          text: 'Password lama yang dimasukan salah',
          icon: 'error',
          confirmButtonText: 'Tutup'
        })
      } 
    }else{
      data.password = admin.password
    }

    Cookies.set('userDosen',JSON.stringify(data))

    Swal.fire({
      title: 'Berhasil!',
      text: 'Berhasil menyimpan data',
      icon: 'success',
      confirmButtonText: 'Tutup'
    });
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    style={{
                      marginBottom:"0px",
                    }}
                    inputProps={{
                      onChange:(event)=>{
                        setUsername(event.target.value)
                      },
                      value:username
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
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
                        setNip(event.target.value)
                      },
                      value:nip
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Nama Lengkap"
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
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Email Lengkap"
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
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="TTL"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    style={{
                      marginBottom:"0px",
                    }}
                    inputProps={{
                      onChange:(event)=>{
                        setTtl(event.target.value)
                      },
                      value:ttl
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Alamat"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    style={{
                      marginBottom:"0px",
                    }}
                    inputProps={{
                      onChange:(event)=>{
                        setAddress(event.target.value)
                      },
                      value:address
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Nomor Telepon"
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
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Password Lama"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    style={{
                      marginBottom:"0px",
                    }}
                    inputProps={{
                      onChange:(event)=>{
                        setOldPassword(event.target.value)
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Password Baru"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    style={{
                      marginBottom:"0px",
                    }}
                    inputProps={{
                      onChange:(event)=>{
                        setPassword(event.target.value)
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Konfirmasi Password Baru"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    style={{
                      marginBottom:"0px",
                    }}
                    inputProps={{
                      onChange:(event)=>{
                        setConfirmPassword(event.target.value)
                      },
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <div style={{
                flexDirection:"row",
                alignItems:"center"
              }} >
                <Button color="primary" onClick={()=>updateProfile()}>Update Profile</Button>
                <Button color="danger">Reset Password</Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
