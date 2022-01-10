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
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function DashboardMahasiswa() {

  const now = new Date();

  const detail = (is_scored,is_held)=>{

    let route = '/mahasiswa/ujian';

    if (is_held == 'finished') {
        route = is_scored ? route+'/finished/scored' : route+'/finished/review';
    }

    if (is_held == 'running') {
        route = route+'/running';
    }

    if (is_held == 'hold') {
        route = route+'/scheduled';
    }

    return (
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>location.href=route}
        >
            <Icon color="green">book</Icon>
        </IconButton>
    )
  }

  const [scheduledTable,setScheduledTable] = useState([
      ['22 Desember 2021','10:40 - 12:40','Struktur Data','Selesai',detail(true,'finished')],
      ['22 Desember 2021','13:00 - 15:50','Metode Numerik','Selesai',detail(false,'finished')],
      ['23 Desember 2021','08:00 - 09:50','Filsafat Ilmu','Sedang Berjalan',detail(false,'running')],
      ['23 Desember 2021','10:00 - 11:50','Bahasa Inggris','Belum Dimulai',detail(false,'hold')],
      ['23 Desember 2021','13:00 - 15:50','Jaringan Komputer','Belum Dimulai',detail(false,'hold')],
      ['24 Desember 2021','08:00 - 09:50','Profesi Pendidik & Tenaga Kependidikan','Belum Dimulai',detail(false,'hold')],
      ['25 Desember 2021','09:00 - 11:50','Desain Web','Belum Dimulai',detail(false,'hold')],
      ['25 Desember 2021','13:00 - 14:50','Perencanaan Pengajaran','Belum Dimulai',detail(false,'hold')],
  ]);

  const setData = ()=>{

    const data = [
        {
            date:'22 Desember 2021',
            time:'10:40 - 12:40',
            name:'Struktur Data',
            status:'Selesai',
            is_scored:true,
        },
        {
            date:'22 Desember 2021',
            time:'13:00 - 15:50',
            name:'Metode Numerik',
            status:'Selesai',
            is_scored:false,
        },
        {
            date:'23 Desember 2021',
            time:'08:00 - 09:50',
            name:'Filsafat Ilmu',
            status:'Sedang Berjalan',
            is_scored:false,
        },
        {
            date:'23 Desember 2021',
            time:'10:00 - 11:50',
            name:'Bahasa Inggris',
            status:'Belum Dimulai',
            is_scored:false,
        },
        {
            date:'23 Desember 2021',
            time:'13:00 - 15:50',
            name:'Jaringan Komputer',
            status:'Belum Dimulai',
            is_scored:false,
        },
        {
            date:'24 Desember 2021',
            time:'08:00 - 09:50',
            name:'Profesi Pendidik & Tanaga Kependidikan',
            status:'Belum Dimulai',
            is_scored:false,
        },
        {
            date:'25 Desember 2021',
            time:'09:00 - 11:50',
            name:'Desain Web',
            status:'Belum Dimulai',
            is_scored:false,
        },
        {
            date:'25 Desember 2021',
            time:'13:00 - 14:50',
            name:'PPerencanaan Pengajaran',
            status:'Belum Dimulai',
            is_scored:false,
        },
    ]

    data.map(v=>{

    })

  }

  const classes = useStyles();
  return (
    <div>
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
                  <h4 className={classes.cardTitleWhite}>Jadwal Ujian</h4>
                  <p className={classes.cardCategoryWhite}>
                    Jadwal Ujian
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              
              <Table
                tableHeaderColor="success"
                tableHead={["Tanggal", "Jam", "Mata Kuliah", "Status"]}
                tableData={scheduledTable}
              />

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
