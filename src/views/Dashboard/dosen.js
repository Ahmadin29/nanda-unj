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

export default function DashboardDosen() {

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
        date:"23 Agustus - 10 Desember 2021",
        id:2
      },
      {
        name:"Ujian Akhir Semester",
        date:"23 Agustus - 10 Desember 2021",
        id:3
      },
      {
        name:"Pemasukan nilai mata kuliah tatap muka",
        date:"23 Agustus - 10 Desember 2021",
        id:4
      },
      {
        name:"Evaluasi dosen oleh mahasiswa (EDOM)",
        date:"23 Agustus - 10 Desember 2021",
        id:5
      },
      {
        name:"Pengumuman nilai mata kuliah selain tugas akhir/ skripsi/ tes is kepada mahasiswa",
        date:"23 Agustus - 10 Desember 2021",
        id:6
      },
      {
        name:"Perbaikan nilai semester berialan",
        date:"23 Agustus - 10 Desember 2021",
        id:7
      },
      {
        name:"Batas  akhir  pengisian   nilai   tugas akhir / skripsi / tes is di Siakad Tahap I",
        date:"23 Agustus - 10 Desember 2021",
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

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>people</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Jumlah Mata Kuliah</p>
              <h3 className={classes.cardTitle}>
                4 <small>Mata Kuliah</small>
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
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>person</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Jumlah Mahasiswa</p>
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
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={126}>
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
                  <h4 className={classes.cardTitleWhite}>Kalender Akademik</h4>
                  <p className={classes.cardCategoryWhite}>
                    Kalender Akademik Bulan {new Date().getMonth()}
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

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
