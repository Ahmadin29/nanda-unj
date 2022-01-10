import React, { useState } from "react";
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

export default function DetailUjianFinishedDosen() {
  const classes = useStyles();

  const detail = (id)=>{
    return (
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>location.href='/dosen/ujian/'+getIdPaket()+'/detail/'+getId()+'/result/'+id}
        >
            <Icon color="green">book</Icon>
        </IconButton>
    )
  }

  const getIdPaket = () => {
    return location.pathname.split("/")[
        location.pathname.split("/").length - 2
    ];
};

const getId = () => {
    return location.pathname.split("/")[
        location.pathname.split("/").length - 1
    ];
};

  const [dosen,setDosen] = useState(
    [
      ["Taufik Ihsan","1512620003","Hadir","85",detail(1)],
      ["Fatih Abhipraya","1512620011","Hadir","90",detail(2)],
      ["Amelia Arifah","1512620015","Tidak Hadir","0",detail(3)],
      ["Rizka Rahmawati Dewi","1512620042","Hadir","95",detail(4)],
      ["Janabella Ayu Tafarannisa","1512620046","Terlambat","75",detail(5)],
      ["Neng Ayu Herawati","1512620003","Hadir","90",detail(6)],
    ]
  )

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Data Peserta Ujian</h4>
            <p className={classes.cardCategoryWhite}>
              Data Peserta Ujian
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Nama Mahasiswa","NIM","Status","Hasil Ujian","Aksi"]}
              tableData={dosen}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}