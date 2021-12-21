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
  const [tokenData,setTokenData] = useState([Math.floor(100000000 + Math.random() * 900000000),Math.floor(100000000 + Math.random() * 900000000),Math.floor(100000000 + Math.random() * 900000000),Math.floor(100000000 + Math.random() * 900000000)])

  const detail = (id)=>{
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={()=>location.href='/admin/ujian-detail/'+id}
      >
        <Icon color="green">book</Icon>
      </IconButton>
    )
  }
  
  const token = (id,tokendata)=>{
    return(
      <div>
        {tokendata}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={()=>generateRandom(id)}
        >
          <Icon color="green">refresh</Icon>
        </IconButton>
      </div>
    )
  }

  const [dosen,setDosen] = useState(
    [
      ["Struktur Data","123456","Soal Final",token(1,tokenData[0]),detail(123456)],
      ["Basis Data","234567","Sedang Dikerjakan",token(2,tokenData[1]),detail(234567)],
      ["Aljabar Linier","345678","Sedang Dikerjakan",token(3,tokenData[2]),detail(345678)],
      ["Statistika","456789","Sedang Dikerjakan",token(4,tokenData[3]),detail(456789)],
    ]
  )
  
  const generateRandom = (id)=>{
    const newToken = Math.floor(100000000 + Math.random() * 900000000);
    tokenData[id- 1] = newToken;

    console.log(tokenData);
    setTokenData(tokenData);
    setDosen([
      ["Struktur Data","123456","Soal Final",token(1,tokenData[0]),detail()],
      ["Basis Data","234567","Sedang Dikerjakan",token(2,tokenData[1]),detail()],
      ["Aljabar Linier","345678","Sedang Dikerjakan",token(3,tokenData[2]),detail()],
      ["Statistika","456789","Sedang Dikerjakan",token(4,tokenData[3]),detail()],
    ])
  }

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
              tableHead={["Mata Kuliah","Kode Seksi","Status","Token","Detail"]}
              tableData={dosen}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
