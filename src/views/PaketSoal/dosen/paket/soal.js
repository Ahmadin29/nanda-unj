import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import CheckboxStyles from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";
import Swal from "sweetalert2";

const styles = {
    ...CheckboxStyles,
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

export default function EditPaketSoalDosen() {
  const classes = useStyles();

    const [bankSoal,setBankSoal] = useState();
    const [soal,setSoal] = useState([]);
    const [selectedIdSoal,setSelectedIdSoal] = useState([]);
    const [selectedSoal,setSelectedSoal] = useState([]);

    const getId = () => {
        return location.pathname.split("/")[
            location.pathname.split("/").length - 4
        ];
    };

    const getIdPaket = ()=>{
        return location.pathname.split("/")[
            location.pathname.split("/").length - 2
        ];
    }

    const getDataPaket = ()=>{

        const data = JSON.parse(localStorage.getItem('paketSoal'));
        
        const selected = data.filter(v=>{
            return v.id == getId();
        })[0]

        const selectedPaket = selected.paket.filter(v=>{
            return v.id == getIdPaket();
        })[0];

        const dataIdSoal = [];
        const dataSoal = [];

        selectedPaket.soal.map(v=>{
            dataIdSoal.push(v.id)
            dataSoal.push(v)
        })

        setSelectedIdSoal(dataIdSoal);
        setSelectedSoal(dataSoal);
    }
  
    const getData = ()=>{
        const setedBankSoal = localStorage.getItem('bankSoal');

        const selected = JSON.parse(setedBankSoal).filter(v=>{
            return v.id == getId();
        });

        const dataSoal = [];

        selected[0].soal.map(v=>{
            dataSoal.push(v);
        })

        setBankSoal(selected[0]);
        setSoal(dataSoal);
    }

    useEffect(()=>{
        getData();
        getDataPaket();
    },[]);

    const renderSoal = (v)=>{
        return(
            <div style={{
                paddingTop:10,
                paddingBottom:10,
                borderBottom:"1px solid #eee",
                display:"flex",
                flexDirection:"row",
                alignItems:"center"
            }} >
                <div style={{
                    minWidth:100/3+"%",
                    maxWidth:100/3+"%"
                }} >
                    {v.question}
                </div>
                <div style={{
                    minWidth:100/2+"%",
                    maxWidth:100/3+"%"
                }} >
                    {v.status}
                </div>
                <div style={{
                    minWidth:100/3+"%",
                    maxWidth:100/3+"%"
                }} >
                    <Checkbox
                        checked={selectedIdSoal.includes(v.id) ? true : false}
                        onClick={() => {
                            if (selectedIdSoal.includes(v.id)) {
                                const dataId = selectedIdSoal.filter(val=>{
                                    return val != v.id
                                })

                                const data = selectedSoal.filter(val=>{
                                    return val.id != v.id
                                })

                                setSelectedIdSoal(dataId);
                                setSelectedSoal(data);
                            }else{
                                const dataId = [];
                                const data = [];

                                selectedIdSoal.map(val=>{
                                    dataId.push(val);
                                })
                                dataId.push(v.id);

                                
                                selectedSoal.map(val=>{
                                    data.push(val);
                                })
                                data.push(v);
                                
                                setSelectedIdSoal(dataId);
                                setSelectedSoal(data);
                            }
                        }}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                            checked: classes.checked
                        }}
                    />
                </div>
            </div>
        )
    }

    const saveData = ()=>{
        const data = JSON.parse(localStorage.getItem('paketSoal'));

        const dataSoal = [];

        selectedSoal.map(v=>{
            dataSoal.push(v)
        })
        
        data.map(v=>{
            if (getId() == v.id) {
                v.paket.map(val=>{
                    if (val.id == getIdPaket()) {
                        val.soal = dataSoal;
                    }
                })
            }
        })

        localStorage.setItem('paketSoal',JSON.stringify(data));

        Swal.fire({
            title: 'Berhasil!',
            text: 'Berhasil menambahkan data Mahasiswa',
            icon: 'success',
            confirmButtonText: 'Tutup'
        })
    }

  return (
    <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="success">
                    <h4 className={classes.cardTitleWhite}>Data Soal {bankSoal?.matakuliah}</h4>
                    <p className={classes.cardCategoryWhite}>
                        Data Soal {bankSoal?.matakuliah}
                    </p>
                </CardHeader>
                <CardBody>

                    <div style={{
                        paddingTop:10,
                        paddingBottom:10,
                        borderBottom:"1px solid #eee",
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center"
                    }} >
                        <div style={{
                            minWidth:100/3+"%",
                            maxWidth:100/3+"%"
                        }} >
                            Nama Mata Kuliah
                        </div>
                        <div style={{
                            minWidth:100/2+"%",
                            maxWidth:100/3+"%"
                        }} >
                            Kode Matkul
                        </div>
                        <div style={{
                            minWidth:100/3+"%",
                            maxWidth:100/3+"%"
                        }} >
                            Kode Seksi
                        </div>
                    </div>
                    {
                        soal?.map(v=>{
                            return renderSoal(v)
                        })
                    }
                    <Button onClick={()=>saveData()} style={{marginTop:20}} color="primary">Ubah Soal</Button>
                </CardBody>
            </Card>
        </GridItem>
    </GridContainer>
  );
}