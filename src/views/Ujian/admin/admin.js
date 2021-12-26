import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Icon, IconButton } from "@material-ui/core";
import Cookies from "js-cookie";

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

export default function UjianAdmin() {
  const classes = useStyles();
  const [tokenData,setTokenData] = useState()

  const detail = (id)=>{
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={()=>location.href='/admin/ujian-detail/'+id}
      >
        <Icon color="green">book</Icon>
      </IconButton>
    )
  }
  
  const token = (id,tokendata)=>{
    return(
      <div>
        {Math.floor(100000000 + Math.random() * 900000000)}
        <IconButton
          color="inherit"
          aria-label="open drawer"
        >
          <Icon color="green">refresh</Icon>
        </IconButton>
      </div>
    )
  }

  const [ujian,setUjian] = useState([]);

  const generateDatabase = ()=>{
    const db_ujian = [
        {
            id:1,
            matkul:{
                id:1,
                namaMatkul:'Aljabar Linear',
                kodeMatKul:'1231231',
            },
            ujian:[
                {
                    id:1,
                    namaUjian:"UTS",
                    tanggal:"24 Oktober 2021",
                    waktu:"10.00 - 11.00",
                    lamaUjian:"60 Menit",
                    banksoal:{
                        id:1,
                    }
                },
                {
                    id:2,
                    namaUjian:"UAS",
                    tanggal:"24 Oktober 2021",
                    waktu:"10.00 - 11.00",
                    lamaUjian:"60 Menit",
                    banksoal:{
                        id:1,
                    }
                }
            ],
            mahasiswa:[
                {
                    id:1,
                    nim:"1910012345678901",
                    namaLengkap:"Bayley Cooke",
                    email:"richard@gmail.com",
                    nomorTelepon:"081256789012",
                    password:'12345',
                    angkatan:'1'
                },
                {
                    id:2,
                    nim:"1910012345678901",
                    namaLengkap:"Bayley Cooke",
                    email:"richard@gmail.com",
                    nomorTelepon:"081256789012",
                    password:'12345',
                    angkatan:'1'
                },
                {
                    id:3,
                    nim:"1910012345678901",
                    namaLengkap:"Bayley Cooke",
                    email:"richard@gmail.com",
                    nomorTelepon:"081256789012",
                    password:'12345',
                    angkatan:'1'
                },
                {
                    id:4,
                    nim:"1910012345678901",
                    namaLengkap:"Bayley Cooke",
                    email:"richard@gmail.com",
                    nomorTelepon:"081256789012",
                    password:'12345',
                    angkatan:'1'
                },
                {
                    id:5,
                    nim:"1910012345678901",
                    namaLengkap:"Bayley Cooke",
                    email:"richard@gmail.com",
                    nomorTelepon:"081256789012",
                    password:'12345',
                    angkatan:'1'
                },
            ]
        },
        {
            id:2,
            matkul:{
                id:1,
                namaMatkul:'Aljabar Linear',
                kodeMatKul:'1231231',
            },
            ujian:[
                {
                    id:1,
                    namaUjian:"UTS",
                    tanggal:"24 Oktober 2021",
                    waktu:"10.00 - 11.00",
                    lamaUjian:"60 Menit",
                    banksoal:{
                        id:1,
                    }
                },
                {
                    id:2,
                    namaUjian:"UAS",
                    tanggal:"24 Oktober 2021",
                    waktu:"10.00 - 11.00",
                    lamaUjian:"60 Menit",
                    banksoal:{
                        id:1,
                    }
                }
            ],
            mahasiswa:[
                {
                    id:1,
                    nim:"1910012345678901",
                    namaLengkap:"Bayley Cooke",
                    email:"richard@gmail.com",
                    nomorTelepon:"081256789012",
                    password:'12345',
                    angkatan:'1'
                },
                {
                    id:2,
                    nim:"1910012345678901",
                    namaLengkap:"Bayley Cooke",
                    email:"richard@gmail.com",
                    nomorTelepon:"081256789012",
                    password:'12345',
                    angkatan:'1'
                },
                {
                    id:3,
                    nim:"1910012345678901",
                    namaLengkap:"Bayley Cooke",
                    email:"richard@gmail.com",
                    nomorTelepon:"081256789012",
                    password:'12345',
                    angkatan:'1'
                },
                {
                    id:4,
                    nim:"1910012345678901",
                    namaLengkap:"Bayley Cooke",
                    email:"richard@gmail.com",
                    nomorTelepon:"081256789012",
                    password:'12345',
                    angkatan:'1'
                },
                {
                    id:5,
                    nim:"1910012345678901",
                    namaLengkap:"Bayley Cooke",
                    email:"richard@gmail.com",
                    nomorTelepon:"081256789012",
                    password:'12345',
                    angkatan:'1'
                },
            ]
        },
    ];

    const existingUjian = Cookies.get('dataUjian');
    
    if (existingUjian) {
      setUjian(JSON.parse(existingUjian))
    }else{
      Cookies.set('dataUjian',JSON.stringify(db_ujian));

      const data = [];

      db_ujian.map(v=>data.push(v));

      setUjian(data)
    }
  }

  useEffect(()=>{
      generateDatabase()
  },[])

  const renderUjian = (v)=>{
    return(
      <div style={{
        paddingTop:10,
        paddingBottom:10,
        borderBottom:"1px solid #eee",
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
      }} >
        <div style={{
          minWidth:200,
        }} >
          {v.matkul.namaMatkul}
        </div>
        <div style={{
          minWidth:200,
        }} >
          {v.matkul.kodeMatKul}
        </div>
        <div style={{
          minWidth:200,
        }} >
          {v.id == 2 ? 'Sedang Dikerjakan' : 'Belum Dimulai'}
        </div> 
        <div style={{
          minWidth:200,
        }} >
          {token()}
        </div>
        <div style={{
          minWidth:200,
        }} >
          {detail(v.id)}
        </div>
      </div>
    )
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Data Mata Kuliah</h4>
            <p className={classes.cardCategoryWhite}>
              Data List Mata Kuliah
            </p>
          </CardHeader>
          <CardBody>
            <div style={{
              paddingTop:10,
              paddingBottom:10,
              borderBottom:"1px solid #eee",
              display:"flex",
              flexDirection:"row",
              alignItems:"center"
            }} >
                <div style={{
                minWidth:200,
                }} >
                  Nama Mata Kuliah
                </div>
                <div style={{
                  minWidth:200,
                }} >
                  Kode Matkul
                </div>
                <div style={{
                  minWidth:200,
                }} >
                  Status
                </div>
                <div style={{
                  minWidth:200,
                }} >
                  Token
                </div>
                <div style={{
                  minWidth:200,
                }} >
                  Detail
                </div>
            </div>
            {
              ujian.map(v=>renderUjian(v))
            }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
