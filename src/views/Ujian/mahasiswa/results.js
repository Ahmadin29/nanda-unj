import React, { useEffect, useState } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import AssignmentIcon from "@material-ui/icons/Assignment";
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

export default function ResultsUjianMahasiswa() {

  const now = new Date();

  const [scheduled,setScheduled] = useState([
      ['4 Oktober 2021','QUIZ','Struktur Data','A'],
      ['4 Oktober 2021','QUIZ','Metode Numerik','A'],
      ['5 Oktober 2021','QUIZ','Filsafat Ilmu','A'],
      ['5 Oktober 2021','QUIZ','Bahasa Inggris','A'],
      ['5 Oktober 2021','QUIZ','Jaringan Komputer','A'],
      ['6 Oktober 2021','QUIZ','Interaksi Manusia & Komputer','A'],
      ['7 Oktober 2021','QUIZ','Desain Web','A'],
      ['7 Oktober 2021','QUIZ','Perencanaan Pengajaran','A'],
      ['11 Oktober 2021','UTS','Struktur Data','A'],
      ['11 Oktober 2021','UTS','Metode Numerik','A'],
      ['12 Oktober 2021','UTS','Filsafat Ilmu','A'],
      ['12 Oktober 2021','UTS','Bahasa Inggris','A'],
      ['12 Oktober 2021','UTS','Jaringan Komputer','A'],
      ['13 Oktober 2021','UTS','Interaksi Manusia & Komputer','A'],
      ['14 Oktober 2021','UTS','Desain Web','A'],
      ['14 Oktober 2021','UTS','Perencanaan Pengajaran','A'],
      ['22 Desember 2021','UAS','Struktur Data','A'],
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
                <AssignmentIcon style={{
                  fontSize:50,
                  marginRight:15,
                }}/>
                <div>
                  <h4 className={classes.cardTitleWhite}>Hasil Ujian</h4>
                  <p className={classes.cardCategoryWhite}>
                    Daftar Hasil Ujian
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              
              <Table
                tableHeaderColor="success"
                tableHead={["Tanggal", "Jenis Ujian", "Mata Kuliah", "Hasil"]}
                tableData={scheduled}
              />

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
