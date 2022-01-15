import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "components/CustomInput/CustomInput";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import Radio from "@material-ui/core/Radio";
// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
//core components
import radioStyles from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";

const styles = {
    ...radioStyles,
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

export default function AddPaketSoalDosen(params) {

    const classes = useStyles();

    const [paket,setPaket] = useState('');

    const getId = () => {
        return location.pathname.split("/")[
            location.pathname.split("/").length - 2
        ];
    };

    const saveData = ()=>{
        const setedBankSoal = JSON.parse(localStorage.getItem('paketSoal'));

        const selected = setedBankSoal.filter(v=>{
            return v.id == getId();
        });
        
        setedBankSoal.map(val=>{
            if (val.id == getId()) {
                val.paket.push({
                    id:selected[0].paket.length + 1,
                    name:paket,
                    soal:[],
                })
            }
        })
        
        localStorage.setItem('paketSoal',JSON.stringify(setedBankSoal));
        Swal.fire('Berhasil!', 'Data soal berhasil ditambahkan', 'success')
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="success">
                        <h4 className={classes.cardTitleWhite}>Buat Data Bank Soal</h4>
                    </CardHeader>
                    <CardBody>
                        <CustomInput
                            labelText="Nama Paket Soal"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            style={{
                                marginBottom:"0px",
                            }}
                            inputProps={{
                                onChange:(event)=>{
                                    setPaket(event.target.value)
                                },
                            }}
                        />
                        <Button block onClick={()=>{saveData()}} color="primary">Simpan Perubahan</Button>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}