import React, { useEffect, useState } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import Event from "@material-ui/icons/Event";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Button from "components/CustomButtons/Button.js";
import Cookies from "js-cookie";

const useStyles = makeStyles(styles);

export default function DashboardAdmin() {

  const now = new Date();

  const [scheduled,setScheduled] = useState([]);

  useEffect(()=>{
    generateDatabase();
  },[])

  const generateDatabase = ()=>{

    const schedule = [
      {
        name:"Pelaksanaan Perkuliahan",
        date:"23 Agustus - 10 Desember 2021",
        id:1
      },
      {
        name:"Ujian Tengah Semester",
        date:"11 - 16 Oktober 2021",
        id:2
      },
      {
        name:"Ujian Akhir Semester",
        date:"22 - 26 Desember 2021",
        id:3
      },
      {
        name:"Pemasukan nilai mata kuliah tatap muka",
        date:"22 Desember - 7 Januari 2022",
        id:4
      },
      {
        name:"Evaluasi dosen oleh mahasiswa (EDOM)",
        date:"23 Desember - 10 Januari 2022",
        id:5
      },
      {
        name:"Pengumuman nilai mata kuliah selain tugas akhir/ skripsi/ tes is kepada mahasiswa",
        date:"10 Januari 2022",
        id:6
      },
      {
        name:"Perbaikan nilai semester berialan",
        date:"10 - 13 Januari 2022",
        id:7
      },
      {
        name:"Batas  akhir  pengisian   nilai   tugas akhir / skripsi / tes is di Siakad Tahap I",
        date:"21 Februari 2022",
        id:8
      },
    ];

    const existSchedule = Cookies.get('schedule');
    
    if (!existSchedule) {
      Cookies.set('schedule',JSON.stringify(schedule));

      const data = [];

      schedule.map((v)=>{
        data.push([v.date,v.name]);
      });
  
      setScheduled(data)

    }else{
      const data = [];

      JSON.parse(existSchedule).map((v)=>{
        data.push([v.date,v.name]);
      });
  
      setScheduled(data)
    }

  };

  const [bankSoal,setBankSoal] = useState([])

  const generateDatabase2 = ()=>{
    const db_banksoal = [
        {
            id:1,
            matakuliah:"Jaringan Komputer",
            kodeMatKul:52350113,
            jumlah:40,
            status:'Valid',
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
            matakuliah:"Filsafat Ilmu",
            kodeMatKul:50054102,
            jumlah:40,
            status:'Draft',
            soal:[
                {
                    id:1,
                    question:"Sebutkan cabang filsafat ilmu!",
                    kisi:'Mtafisika, Epistemologi, Aksiologi',
                    status:'Valid',
                },
                {
                    id:2,
                    question:"Dalam filsafat ilmu mempelajari masalah kemanusiaan dalam hidup ini yang meliputi tiga hubungan penting manusia diantaranya:",
                    kisi:'Hibungan manusia dengan keberadaan Tuhan, Hubungan manusia dengan alam semesta dan Hubungan manusia baik secara individu maupun kelompok',
                    status:'Valid',
                },
            ]
        },
        {
            id:3,
            matakuliah:"Perencanaan Pengajaran",
            kodeMatKul:50050182,
            jumlah:40,
            status:'Valid',
            soal:[
                {
                    id:1,
                    question:"Sebutkan 10 komponen proses yang terdapat dalam menyusun perencanaan pembelajaran!!",
                    kisi:'Pengembangan bahan ajar, Analisis Karakteristik Siswa, Analisis pekerjaan, Perumusan tujuan pembelajaran, pengembangan butir tes, pengorganisasian satuan pembelajaran, pengembangan strategi pembelajaran, penilaian pembelajaran, pengembangan strategi pembelajaran ranah motorik, pengembangan sumber belajar ',
                    status:'Valid',
                },
                {
                    id:2,
                    question:"Sebutkan 6 komponen silabus!",
                    kisi:'Kompetensi Dasar, Materi pokok, Pembelajaran, Penilaian, Alokasi waktu, Sumber belajar',
                    status:'Valid',
                },
            ]
        },
    ];

    const existingBankSoal = Cookies.get('bankSoal');
    
    if (existingBankSoal) {

      const data = [];

      JSON.parse(existingBankSoal).map((v)=>{
        data.push([v.matakuliah,v.kodeMatKul,v.jumlah,v.status]);
      });
  
      setBankSoal(data)
    }else{
      Cookies.set('bankSoal',JSON.stringify(db_banksoal));
    }
  }

  useEffect(()=>{
    generateDatabase2();
    localStorageSpace();
  },[])

  const localStorageSpace = ()=>{
    var allStrings = '';
    for(var key in window.localStorage){
        if(window.localStorage.hasOwnProperty(key)){
            allStrings += window.localStorage[key];
        }
    }
    return console.log(allStrings ? 3 + ((allStrings.length*16)/(8*1024)) + ' KB' : 'Empty (0 KB)');
  };

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>people</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Jumlah Pengguna</p>
              <h3 className={classes.cardTitle}>
                200 <small>Pengguna</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Terakhir di update {now.getHours() < 10 ? "0"+now.getHours() : now.getHours()}:{now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes()}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>person</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Jumlah Dosen</p>
              <h3 className={classes.cardTitle}>50</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Terakhir di update {now.getHours() < 10 ? "0"+now.getHours() : now.getHours()}:{now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes()}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>school</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Jumlah Mahasiswa</p>
              <h3 className={classes.cardTitle}>200</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Terakhir di update {now.getHours() < 10 ? "0"+now.getHours() : now.getHours()}:{now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes()}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>book</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Jumlah Mata Kuliah</p>
              <h3 className={classes.cardTitle}>235</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Terakhir di update {now.getHours() < 10 ? "0"+now.getHours() : now.getHours()}:{now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes()}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <div style={{
                display:"flex",
                flexDirection:"row"
              }}>
                <Event style={{
                  fontSize:50,
                  marginRight:15,
                }}/>
                <div>
                  <h4 className={classes.cardTitleWhite}>Kalender Akademik Semester 115</h4>
                  <p className={classes.cardCategoryWhite}>
                    Kalender Akademik Bulan Agustus-Februari
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              
              <Table
                tableHeaderColor="success"
                tableHead={["Tanggal", "Kegiatan"]}
                tableData={scheduled}
              />
              <Button onClick={()=>location.href='/admin/calendar/edit'} style={{marginTop:20}} color="primary">Ubah Jadwal</Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
