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

  const detail = (is_scored,is_held,matkul)=>{

    let route = '/mahasiswa/ujian';

    if (is_held == 'finished') {
        route = is_scored ? route+'/finished/scored/'+matkul : route+'/finished/review/'+matkul;
    }

    if (is_held == 'running') {
        route = route+'/running/'+matkul;
    }

    if (is_held == 'hold') {
        route = route+'/scheduled/'+matkul;
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
      ['22 Desember 2021','10:40 - 12:40','Struktur Data','Selesai',detail(true,'finished','Struktur-Data')],
      ['22 Desember 2021','13:00 - 15:50','Metode Numerik','Selesai',detail(false,'finished','Metode-Numerik')],
      ['23 Desember 2021','08:00 - 09:50','Filsafat Ilmu','Sedang Berjalan',detail(false,'running','Filsafat-Ilmu')],
      ['23 Desember 2021','10:00 - 11:50','Bahasa Inggris','Belum Dimulai',detail(false,'hold','Bahasa-Inggris')],
      ['23 Desember 2021','13:00 - 15:50','Jaringan Komputer','Belum Dimulai',detail(false,'hold','Jaringan-Komputer')],
      ['24 Desember 2021','08:00 - 09:50','Profesi Pendidik & Tenaga Kependidikan','Belum Dimulai',detail(false,'hold','Profesi-Pendidik-&-Tenaga-Kependidikan')],
      ['25 Desember 2021','09:00 - 11:50','Desain Web','Belum Dimulai',detail(false,'hold','Desain-Web')],
      ['25 Desember 2021','13:00 - 14:50','Perencanaan Pengajaran','Belum Dimulai',detail(false,'hold','Perencanaan-Pengajaran')],
  ]);

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
