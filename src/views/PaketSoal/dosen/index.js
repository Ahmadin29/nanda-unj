import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import { Icon, IconButton } from "@material-ui/core";
import Swal from 'sweetalert2'
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

export default function PaketSoalDosen() {
  const classes = useStyles();

  const detail = (id)=>{
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={()=>location.href='/dosen/paket-soal/'+id+'/detail'}
      >
        <Icon color="green">book</Icon>
      </IconButton>
    )
  }

  const [bankSoal,setBankSoal] = useState([])

  const generateDatabase = ()=>{
    const db_banksoal = [
        {
            id:1,
            matakuliah:"Jaringan Komputer",
            kodeMatKul:52350113,
            kodeSeksi:12313123,
            jenisUjian:'UTS',
            status:'Sedang Dikerjakan',
            paket:[
                {
                    id:1,
                    name:'Paket A',
                    soal:[
                        {
                            id:1,
                            question:"Sebutkan 5 perangkat keras jaringan!",
                            status:'Valid',
                            kisi:'Hub, Switch, Bridge, Router, Modem',
                        },
                        {
                            id:2,
                            question:"Sebutkan macam-macam topologi jaringan komputer yang anda ketahui!",
                            status:'Valid',
                            kisi:'Topologi Bus, Topologi Ring, Topologi Star. topologi Pohon',
                        },
                        {
                            id:3,
                            question:"Dalam filsafat ilmu mempelajari masalah kemanusiaan dalam hidup ini yang meliputi tiga hubungan penting manusia diantaranya:",
                            status:'Valid',
                            kisi:'Lorem Ipsum dolor sit amet consectetur adipsicing',
                        },
                    ]
                },
                {
                    id:2,
                    name:'Paket B',
                    soal:[
                        {
                            id:1,
                            question:"Sebutkan 5 perangkat keras jaringan!",
                            status:'Valid',
                            kisi:'Hub, Switch, Bridge, Router, Modem',
                        },
                        {
                            id:2,
                            question:"Sebutkan macam-macam topologi jaringan komputer yang anda ketahui!",
                            status:'Valid',
                            kisi:'Topologi Bus, Topologi Ring, Topologi Star. topologi Pohon',
                        },
                        {
                            id:3,
                            question:"Dalam filsafat ilmu mempelajari masalah kemanusiaan dalam hidup ini yang meliputi tiga hubungan penting manusia diantaranya:",
                            status:'Valid',
                            kisi:'Lorem Ipsum dolor sit amet consectetur adipsicing',
                        },
                    ]
                },
                {
                    id:3,
                    name:'Paket C',
                    soal:[
                        {
                            id:1,
                            question:"Sebutkan 5 perangkat keras jaringan!",
                            status:'Valid',
                            kisi:'Hub, Switch, Bridge, Router, Modem',
                        },
                        {
                            id:2,
                            question:"Sebutkan macam-macam topologi jaringan komputer yang anda ketahui!",
                            status:'Valid',
                            kisi:'Topologi Bus, Topologi Ring, Topologi Star. topologi Pohon',
                        },
                        {
                            id:3,
                            question:"Dalam filsafat ilmu mempelajari masalah kemanusiaan dalam hidup ini yang meliputi tiga hubungan penting manusia diantaranya:",
                            status:'Valid',
                            kisi:'Lorem Ipsum dolor sit amet consectetur adipsicing',
                        },
                    ]
                },
                {
                    id:4,
                    name:'Paket D',
                    soal:[
                        {
                            id:1,
                            question:"Sebutkan 5 perangkat keras jaringan!",
                            status:'Valid',
                            kisi:'Hub, Switch, Bridge, Router, Modem',
                        },
                        {
                            id:2,
                            question:"Sebutkan macam-macam topologi jaringan komputer yang anda ketahui!",
                            status:'Valid',
                            kisi:'Topologi Bus, Topologi Ring, Topologi Star. topologi Pohon',
                        },
                        {
                            id:3,
                            question:"Dalam filsafat ilmu mempelajari masalah kemanusiaan dalam hidup ini yang meliputi tiga hubungan penting manusia diantaranya:",
                            status:'Valid',
                            kisi:'Lorem Ipsum dolor sit amet consectetur adipsicing',
                        },
                    ]
                },
                {
                    id:5,
                    name:'Paket E',
                    soal:[
                        {
                            id:1,
                            question:"Sebutkan 5 perangkat keras jaringan!",
                            status:'Valid',
                            kisi:'Hub, Switch, Bridge, Router, Modem',
                        },
                        {
                            id:2,
                            question:"Sebutkan macam-macam topologi jaringan komputer yang anda ketahui!",
                            status:'Valid',
                            kisi:'Topologi Bus, Topologi Ring, Topologi Star. topologi Pohon',
                        },
                        {
                            id:3,
                            question:"Dalam filsafat ilmu mempelajari masalah kemanusiaan dalam hidup ini yang meliputi tiga hubungan penting manusia diantaranya:",
                            status:'Valid',
                            kisi:'Lorem Ipsum dolor sit amet consectetur adipsicing',
                        },
                    ]
                }
            ]
        },
    ];

    const existingBankSoal = localStorage.getItem('paketSoal');
    
    if (existingBankSoal) {

      const data = [];

      JSON.parse(existingBankSoal).map((v)=>{
        data.push([v.matakuliah,v.kodeMatKul,v.kodeSeksi,v.jenisUjian,detail(v.id),v.status]);
      });
  
      setBankSoal(data)
    }else{

      localStorage.setItem('paketSoal',JSON.stringify(db_banksoal));
      const data = [];

      db_banksoal.map((v)=>{
        data.push([v.matakuliah,v.kodeMatKul,v.kodeSeksi,v.jenisUjian,detail(v.id),v.status]);
      });
  
      setBankSoal(data)
    }
  }

  useEffect(()=>{
    generateDatabase();
  },[])

  return (
    <GridContainer>
      {/* <GridItem xs={12} sm={12} md={12}>
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
              }} >Daftar Paket Soal</span>
              <div>
                <Button onClick={()=>location.href='/dosen/paket-soal/add'} color="primary">Tambahkan Paket Soal</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem> */}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Data Paket Soal</h4>
            <p className={classes.cardCategoryWhite}>
              Data Paket Soal
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Mata Kuliah", "Kode Mata Kuliah", "Kode Seksi", "Jenis Ujian","Detail",'Status']}
              tableData={bankSoal}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}