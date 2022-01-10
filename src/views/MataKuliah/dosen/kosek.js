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

export default function MataKuliahKosekDosen() {
    const classes = useStyles();

    const [matkul,setMatkul] = useState([]);
    const [seksi,setSeksi] = useState([]);

    const getId = () => {
        return location.pathname.split("/")[
            location.pathname.split("/").length - 2
        ];
    };

    useEffect(()=>{
        getMatkul()
    },[])

    const getMatkul = ()=>{
        const setedMataKuliah = Cookies.get('mataKuliah');

        const selected = JSON.parse(setedMataKuliah).filter(v=>{
            return v.id == getId();
        });

        const dataSeksi = [];

        selected[0].seksi.map(v=>{
            dataSeksi.push(v);
        })

        setMatkul(selected[0]);
        setSeksi(dataSeksi);
    }

    const renderMatkul = (v) =>{
        return(
            <Card>
                <CardHeader color="success" stats icon style={{
                    marginBottom:15,
                }}>
                    <CardIcon color="success">
                        <Icon>person</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitle} style={{color:"black",marginBottom:0,}}>Kode Seksi</h3>
                    <p className={classes.cardCategory} style={{color:"black",marginTop:0,}}>{v.kodeSeksi}</p>
                    <Button onClick={()=>location.href='/dosen/matkul/kosek-detail'} >Detail</Button>
                </CardHeader>
            </Card>
        )
    }

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
                        }} >Daftar Kode Seksi Mata Kuliah {matkul && matkul.namaMatKul}</span>
                        <div>
                            <Button onClick={()=>location.href='/dosen/matkul/'+matkul.id+'/add/'} color="primary">Tambahkan Kode Seksi</Button>
                        </div>
                        </div>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>Data Mata Kuliah</h4>
                        <p className={classes.cardCategoryWhite}>
                            Data List Mata Kuliah
                        </p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            {
                                seksi.map(v=>{
                                    return (
                                        <GridItem xs={12} sm={12} md={4}>
                                            {renderMatkul(v)}
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