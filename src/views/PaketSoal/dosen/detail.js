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
import CardIcon from "components/Card/CardIcon";

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

export default function DetailPaketSoalDosen() {

    const classes = useStyles();
    const [paketSoal,setPaketSoal] = useState();

    const getId = () => {
        return location.pathname.split("/")[
            location.pathname.split("/").length - 2
        ];
    };

    const getData = ()=>{
        const data = JSON.parse(localStorage.getItem('paketSoal'));
        
        const selected = data.filter(v=>{
            return v.id == getId();
        })

        setPaketSoal(selected[0])
    }

    useEffect(()=>{
        getData();
    },[]);

    const renderPaket = (v) =>{
        return(
            <Card>
                <CardHeader color="success" stats icon style={{
                    marginBottom:15,
                }}>
                    <CardIcon color="success">
                        <Icon>book</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitle} style={{color:"black",marginBottom:0,}}>{v.name}</h3>
                    <p className={classes.cardCategory} style={{color:"black",marginTop:0,}}>{v.soal.length} Soal</p>
                    <Button onClick={()=>location.href='/dosen/paket-soal/'+paketSoal.id+'/detail/'+v.id}>Detail</Button>
                </CardHeader>
            </Card>
        )
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="success">
                        <h4 className={classes.cardTitleWhite}>Data Paket Soal</h4>
                        <p className={classes.cardCategoryWhite}>
                            Data Paket Soal
                        </p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            {
                                paketSoal?.paket.map(v=>{
                                    return(
                                        <GridItem xs={12} sm={12} md={4}>
                                            {renderPaket(v)}
                                        </GridItem>
                                    )
                                })
                            }
                        </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}