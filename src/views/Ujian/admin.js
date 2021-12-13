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

export default function UjianAdmin() {
  const classes = useStyles();

  const edit = (id)=>{
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
      >
        <Icon color="green">edit</Icon>
      </IconButton>
    )
  }

  const remove = (id)=>{
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
      >
        <Icon color="green">delete</Icon>
      </IconButton>
    )
  }

  const [dosen,setDosen] = useState(
    [
      ["1910012345678901","Bayley Cooke","richard@gmail.com","081256789012",edit(),remove()],
      ["1910012345678902","Orson Alvarez","twoflower@mac.com","081256789014",edit(),remove()],
      ["1910012345678903","Neriah Merrill","burniske@aol.com","081256789016",edit(),remove()],
      ["1910012345678904","Ebony Wooten","garland@yahoo.ca","081256789018",edit(),remove()],
      ["1910012345678905","Michalina Fraser","wkrebs@att.net","081256789020",edit(),remove()],
      ["1910012345678906","Aila Parrish","tromey@att.net","081256789022",edit(),remove()],
      ["1910012345678907","Elana Charles","citadel@aol.com","081256789024",edit(),remove()],
      ["1910012345678908","Alannah Herbert","policies@verizon.net","081256789026",edit(),remove()],
      ["1910012345678909","Fardeen Pate","muzzy@verizon.net","081256789028",edit(),remove()],
      ["1910012345678910","Loretta Porter","mschwartz@sbcglobal.net","081256789030",edit(),remove()],
      ["1910012345678911","Reyansh Barclay","luebke@optonline.net","081256789032",edit(),remove()],
      ["1910012345678912","Jack Serrano","zavadsky@me.com","081256789034",edit(),remove()],
      ["1910012345678913","Naomi Lara","pappp@optonline.net","081256789036",edit(),remove()],
      ["1910012345678914","Beatriz Portillo","drjlaw@yahoo.com","081256789038",edit(),remove()],
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
              tableHead={["Kode Matkul","Kelompok Matkul","Peminatan","Nama Matkul","Semester","SKS","Deskripsi"]}
              tableData={dosen}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
