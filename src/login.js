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

  const [user,setUser] = useState([
    {
      name:"Admin",
      username:"admin",
      password:"admin",
      role:'admin'
    },
    {
      name:"Dosen",
      username:"dosen",
      password:"dosen",
      role:'dosen'
    },
  ]);

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
  }, []);

  const processLogin = ()=>{

    

    let checked = 0;

    user.map(v=>{
      if (v.username == username && v.password == password) {

        if (captcha != 2) {
          Swal.fire({
            title: 'Terjadi kesalahan!',
            text: 'Jawaban pertanyaan anda salah, harap periksa kembali jawaban untuk pertanyaan anda',
            icon: 'error',
            confirmButtonText: 'Tutup'
          })
          return
        }

        setSession(v)
      }else{
        checked++;
      }
    })

    if (checked == user.length) {
      Swal.fire({
        title: 'Terjadi kesalahan!',
        text: 'Akun tidak ditemukan, pastikan username atau password benar',
        icon: 'error',
        confirmButtonText: 'Tutup'
      })
      return
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
