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

export default function DetailUjianAdmin() {
  const classes = useStyles();

  const [dosen,setDosen] = useState(
    [
      ["Nanda Lutfiana Nadine","1512617029","Hadir","85"],
      ["Imelsara Wijatmoko","1512617028","Hadir","90"],
      ["Nisrina Firyal Amani","1512617030","Tidak Hadir","0"],
      ["M Azhar Hermawan","1512617058","Hadir","95"],
      ["M Hadiyatullah","1512617014","Terlambat","75"],
      ["Neng Ayu Herawati","1512617003","Hadir","90"],
    ]
  )

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
            <Table
              tableHeaderColor="primary"
              tableHead={["Nama Mahasiswa","NIM","Status","Hasil Ujian"]}
              tableData={dosen}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
