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

export default function DosenProfileUpdate() {
  const classes = useStyles();

  const [username,setUsername] = useState('');
  const [nip,setNip] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [address,setAddress] = useState('');
  const [ttl,setTtl] = useState('');
  const [phone,setPhone] = useState('');
  const [photo,setPhoto] = useState('')

  const [oldPassword,setOldPassword] = useState('');
  const [password,setPassword] = useState('');
  const [confrimPassword,setConfirmPassword] = useState('');

  const getData = ()=>{
    const admin = JSON.parse(localStorage.getItem('userDosen'));

    setUsername(admin.username);
    setName(admin.name);
    setNip(admin.nip);
    setEmail(admin.email);
    setPhone(admin.phone);
    setAddress(admin.alamat);
    setTtl(admin.ttl);
    setPhoto(admin.photo);
  }

  useEffect(()=>{
    getData();
  },[])

  const updateProfile = ()=>{

    const admin = JSON.parse(localStorage.getItem('userDosen'));

    const data ={
      username:username,
      name:name,
      email:email,
      phone:email,
      alamat:email,
      ttl:ttl,
      nip:nip,
      photo:photo
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

    localStorage.setItem('userDosen',JSON.stringify(data))

    Swal.fire({
      title: 'Berhasil!',
      text: 'Berhasil menyimpan data',
      icon: 'success',
      confirmButtonText: 'Tutup'
    });
  }

  const handleImage = (e)=>{

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = function () {
        const base64String = reader.result;
        setPhoto(base64String);
    }

    reader.readAsDataURL(file);

  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <div style={{display:"flex",flexDirection:"column"}}>
                <p>Pilih gambar</p>
                <input type="file" id="fileImage" onChange={handleImage} />
                <img src={photo} style={{width:300,marginTop:20,marginBottom:20,}} />
                <Button color="primary" onClick={()=>updateProfile()}>Update Foto</Button>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
