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

export default function SoalPaketSoalAdmin() {
  const classes = useStyles();

    const [soal,setSoal] = useState([]);
    const [paketSoal,setPaketSoal] = useState([]);

    const getId = () => {
        return location.pathname.split("/")[
            location.pathname.split("/").length - 3
        ];
    };

    const getIdPaket = ()=>{
        return location.pathname.split("/")[
            location.pathname.split("/").length - 1
        ];
    }

    const getData = ()=>{

        const data = JSON.parse(localStorage.getItem('paketSoal'));
        
        const selected = data.filter(v=>{
            return v.id == getId();
        })[0]

        const selectedPaket = selected.paket.filter(v=>{
            return v.id == getIdPaket();
        })[0];

        const dataSoal = [];

        selectedPaket.soal.map(v=>{
            dataSoal.push([v.question,v.kisi])
        })

        setSoal(dataSoal);
        setPaketSoal(selectedPaket);
    }

    useEffect(()=>{
        getData();
    },[])

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="success">
                        <h4 className={classes.cardTitleWhite}>Data Paket Soal ( {paketSoal.name} )</h4>
                        <p className={classes.cardCategoryWhite}>
                            Data Paket Soal ( {paketSoal.name} )
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["Soal", "Kisi"]}
                            tableData={soal}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
  );
}