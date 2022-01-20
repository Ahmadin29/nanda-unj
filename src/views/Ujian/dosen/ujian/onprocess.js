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

export default function UjianOnProcessDosen() {
    const classes = useStyles();

    const [paketUjian,setPaketUjian] = useState([]);
    const [ujian,setUjian] = useState([]);
    const [mahasiswa,setMahasiswa] = useState([]);

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
            location.pathname.split("/").length - 3
        ];
    };

    const getId = () => {
        return location.pathname.split("/")[
            location.pathname.split("/").length - 3
        ];
    };

    const getData = ()=>{
        const existingUjian = JSON.parse(localStorage.getItem('dataUjian'));

        const selected = existingUjian.filter(v=>{
            return v.id == getIdPaket()
        })

        const selectedUjian = selected[0].ujian.filter(v=>{
            return v.id == getId()
        })
        
        // console.log(getId());
        setPaketUjian(selected[0]);
        setUjian(selectedUjian[0]);
    }

    useEffect(()=>{
        getData()
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
                            }} >{ujian?.namaUjian} - {paketUjian?.matkul?.namaMatkul}</span>
                        </div>
                        <p>Kode Mata Kuliah : {paketUjian?.matkul?.kodeMatKul}</p>
                        <p>Tanggal : {ujian?.tanggal}</p>
                        <p>Waktu : {ujian?.waktu}</p>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>Data Ujian Mata Kuliah</h4>
                        <p className={classes.cardCategoryWhite}>
                            Data List Ujian Mata Kuliah
                        </p>
                    </CardHeader>
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
                                    fontWeight:700,
                                }} >{ujian?.namaUjian} - {paketUjian?.matkul?.namaMatkul}</span>
                                <span style={{
                                    fontSize:20,
                                }} >Sedang Dikerjakan</span>
                            </div>
                            </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}