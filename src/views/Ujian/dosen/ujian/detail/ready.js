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

export default function DetailUjianReadyDosen() {
  const classes = useStyles();

  const [bankSoal,setBankSoal] = useState();
  const [soal,setSoal] = useState([]);

  const getId = () => {
    return location.pathname.split("/")[
      location.pathname.split("/").length - 1
    ];
  };
  
  const getData = ()=>{
    const setedBankSoal = Cookies.get('bankSoal');

    const selected = JSON.parse(setedBankSoal).filter(v=>{
      return v.id == getId();
    });

    const dataSoal = [];

    selected[0].soal.map(v=>{
      const data = [v.question,v.status,v.kisi];

      dataSoal.push(data);
    })

    setBankSoal(selected[0]);
    setSoal(dataSoal);
  }

  useEffect(()=>{
    getData();
  },[])

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
              }} >Daftar Bank Soal</span>
              <div>
                <Button onClick={()=>location.href='/dosen/bank-soal/'+getId()+'/add'} color="primary">Tambahkan Soal</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Data Soal {bankSoal?.matakuliah}</h4>
            <p className={classes.cardCategoryWhite}>
              Data Soal {bankSoal?.matakuliah}
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Soal", "Status", "Kisi-Kisi Jawaban"]}
              tableData={soal}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}