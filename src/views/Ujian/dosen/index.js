import React, { useState,useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Icon, IconButton } from "@material-ui/core";
import Cookies from 'js-cookie'
import Swal from "sweetalert2";
import CardIcon from "components/Card/CardIcon";
import DateRange from "@material-ui/icons/DateRange";
import CardFooter from "components/Card/CardFooter";

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

export default function MataKuliahDosen() {
    const classes = useStyles();

    const [dataUjian,setDataUjian] = useState([]);

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
            setDataUjian(JSON.parse(existingUjian))
        }else{
            Cookies.set('dataUjian',JSON.stringify(db_ujian));

            const data = [];

            db_ujian.map(v=>data.push(v));

            setDataUjian(data)
        }
    }

    useEffect(()=>{
        generateDatabase()
    },[])

    const renderUjian = (v) =>{
        return(
            <Card>
                <CardHeader color="success" stats icon style={{
                    marginBottom:15,
                }}>
                    <CardIcon color="success">
                        <Icon>person</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitle} style={{color:"black",marginBottom:0,}}>{v.matkul.namaMatkul}</h3>
                    <p className={classes.cardCategory} style={{color:"black",marginTop:0,}}>{v.matkul.kodeMatKul}</p>
                    <Button onClick={()=>location.href='/dosen/ujian/detail/'+v.id}>Detail</Button>
                </CardHeader>
            </Card>
        )
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardBody>
                        <div style={{
                            display:"flex",
                            flexDirection:"row",
                            justifyContent:"space-between",
                            alignItems:"center"
                        }} >
                        <span style={{
                            fontSize:20,
                            fontWeight:700,
                        }} >Daftar Ujian Mata Kuliah</span>
                        </div>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>Data Ujian Mata Kuliah</h4>
                        <p className={classes.cardCategoryWhite}>
                            Data List Ujian Mata Kuliah
                        </p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            {
                                dataUjian && dataUjian.map(v=>{
                                    return (
                                        <GridItem xs={12} sm={12} md={4}>
                                            {renderUjian(v)}
                                        </GridItem>
                                    )
                                })
                            }
                        </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}