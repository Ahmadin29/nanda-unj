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

export default function DetailUjianDosen() {
    const classes = useStyles();

    const [ujian,setUjian] = useState([]);

    const getId = () => {
        return location.pathname.split("/")[
            location.pathname.split("/").length - 1
        ];
    };

    const getData = ()=>{
        const existingUjian = JSON.parse(localStorage.getItem('dataUjian'));

        const selected = existingUjian.filter(v=>{
            return v.id == getId()
        })

        setUjian(selected[0])
    }

    useEffect(()=>{
        getData()
    },[])

    const renderUjian = (v) =>{

        let link = '/dosen/ujian/detail/';
        const status = v.status;
        
        if (status == 'Selesai') {
            link = link+'finished/'+ujian.id+'/'+v.id;
        }else if (status == 'Soal Siap') {
            link = link+'ready/'+v.banksoal.id;
        }else if (status == 'Sedang Dikerjakan'){
            link = link+'running'
        }else{
            link = link+'hold'
        }

        return(
            <Card>
                <CardHeader color="success" stats icon style={{
                    marginBottom:15,
                }}>
                    <CardIcon color="success">
                        <Icon>person</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitle} style={{color:"black",marginBottom:0,}}>{v.namaUjian}</h3>
                    <p className={classes.cardCategory} style={{color:"black",marginTop:0,marginBottom:0}}>{v.tanggal}</p>
                    <p className={classes.cardCategory} style={{color:"black",marginTop:0,}}>{v.lamaUjian}</p>
                    <Button onClick={()=>location.href=link}>Detail</Button>
                </CardHeader>
            </Card>
        )
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>Daftar Ujian Mata Kuliah {ujian?.matkul?.namaMatkul}</h4>
                        <p className={classes.cardCategoryWhite}>
                            Daftar Ujian Mata Kuliah
                        </p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            {
                                ujian && ujian?.ujian?.map(v=>{
                                    return (
                                        <GridItem xs={12} sm={12} md={4}>
                                            {renderUjian(v)}
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