import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import React from "react";
// material-ui
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Language from "@material-ui/icons/People";
// core components
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Swal from 'sweetalert2'

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

var styles = {
  ...dashboardStyle,
  cardTitle: {
    marginTop: "0",
    minHeight: "auto",
    fontWeight: "500",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  container:{
    width:"100%",
    minHeight:"720px",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  }
};

const useStyles = makeStyles(styles);

export default function Login(params) {

  const classes = useStyles();

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [captcha,setCaptcha] = useState('');

  const checkSession = () => {
    const session = Cookies.get("session");

    if (session) {
      const role = JSON.parse(session).role;

      window.location.href = "/" + role;
    }
  };

  useEffect(() => {
    checkSession();
    generateDatabase();
  }, []);

  const generateDatabase  = () =>{
    const admin = {
      username:'admin',
      name:'Admin',
      email:'admin',
      password:'admin'
    };

    const dosen = {
      username:'dosen',
      name:'Nanda Lutfiana',
      email:'dosen@dosen.com',
      password:'dosen',
      ttl:'Jakarta, 12 agustus 2013',
      nip:'123456',
      alamat:'jalan jalan',
      phone:'123123',
      education:[
        'S1 Pendidikan Teknik Informatika & Komputer UNJ',
        'S2 Pendidikan Teknik Informatika & Komputer UNJ'
      ]
    };

    const mahasiswa = {
      username:'mahasiswa1',
      name:'Mahasiswa 1',
      email:'mahasiswa@mahasiswa.com',
      password:'mahasiswa1',
      noreg:'Jakarta, 12 agustus 2013',
      angkatan:'123456',
      alamat:'jalan jalan',
      phone:'123123',
    };

    const userAdmin = Cookies.get('userAdmin');
    
    if (!userAdmin) {
      Cookies.set('userAdmin',JSON.stringify(admin));
    }

    const userDosen = Cookies.get('userDosen');

    if (!userDosen) {
      Cookies.set('userDosen',JSON.stringify(dosen));
    }

    const userMahasiswa = Cookies.get('userMahasiswa');

    if (!userMahasiswa) {
      Cookies.set('userMahasiswa',JSON.stringify(mahasiswa));
    }
  }

  const processLogin = ()=>{

    let checked = 0;
    
    if (username.includes('admin')) {
      const userAdmin = JSON.parse(Cookies.get('userAdmin'));

      console.log(username, userAdmin.username);

      if (username == userAdmin.username && password == userAdmin.password) {

        const data = {
          ...userAdmin,
          role:'admin',
        }
        
        setSession(data)
      }else{
        Swal.fire({
          title: 'Terjadi kesalahan!',
          text: 'Akun tidak ditemukan, pastikan username atau password benar',
          icon: 'error',
          confirmButtonText: 'Tutup'
        })
      }
    }

    if (username.includes('dosen')){
      const userDosen = JSON.parse(Cookies.get('userDosen'));

      if (username == userDosen.username && password == userDosen.password) {

        const data = {
          ...userDosen,
          role:'dosen',
        }
        
        setSession(data)
      }else{
        Swal.fire({
          title: 'Terjadi kesalahan!',
          text: 'Akun tidak ditemukan, pastikan username atau password benar',
          icon: 'error',
          confirmButtonText: 'Tutup'
        })
      }
    }
  }

  const setSession = (v)=>{
    Cookies.set("session",JSON.stringify(v));
    
    window.location.href = '/'+v.role;
  }

  return (
    <div className={classes.container} >
      <Card style={{width:"400px"}}>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <Language />
          </CardIcon>
        </CardHeader>
        <CardBody>
          <h4 className={classes.cardTitle}>Masuk Dashboard</h4>
          <p style={{margin:0}} >Kamu harus masuk terlebih dahulu untuk melanjutkan</p>
          <CustomInput
            labelText="Username / email"
            formControlProps={{
              fullWidth: true
            }}
            value={username}
            inputProps={{
              onChange:(event)=>{
                setUsername(event.target.value)
              }
            }}
          />
          <CustomInput
            labelText="Password"
            formControlProps={{
              fullWidth: true
            }}
            style={{
              marginBottom:"0px"
            }}
            inputProps={{
              onChange:(event)=>{
                setPassword(event.target.value)
              }
            }}
          />

          <div style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
          }} >
            <CustomInput
              labelText="1 + 1 = ??"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                color:'secondary',
                onChange:(event)=>{
                  setCaptcha(event.target.value)
                }
              }}
            />
          </div>

          <Button block type="button" color="primary" onClick={()=>processLogin()}>Masuk ke Dashborad</Button>
        </CardBody>
      </Card>
    </div>
  );
}
