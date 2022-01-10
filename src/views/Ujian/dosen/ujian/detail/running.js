import React, { useState,useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Icon, IconButton } from "@material-ui/core";
import Cookies from 'js-cookie'
import Swal from "sweetalert2";
import CardIcon from "components/Card/CardIcon";
import DateRange from "@material-ui/icons/DateRange";
import CardFooter from "components/Card/CardFooter";

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

export default function DetailUjianRunningDosen() {
    const classes = useStyles();

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardBody>
                        <GridContainer>
                            <div style={{
                                display:"flex",
                                flexDirection:"column",
                                justifyContent:"center",
                                alignItems:"center",
                                width:'100%',
                                padding:'100px 0px',
                            }} >
                                <Icon style={{
                                    fontSize:100,
                                    fontWeight:700,
                                    marginBottom:20,
                                }} color="green">book</Icon>
                                <span style={{
                                    fontSize:20,
                                }} >Sedang Berjalan</span>
                            </div>
                            </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}