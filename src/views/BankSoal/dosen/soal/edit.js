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

export default function EditSoalDosen(params) {

    const classes = useStyles();

    const [kisiSoal,setKisiSoal] = useState('');
    const [status,setStatus] = useState('');
    const [question,setQuestion] = useState();
    const [answer,setAnswer] = useState([]);
    const [selectedAnswer,setSelectedAnswer] = useState([]);

    const getId = () => {
        return location.pathname.split("/")[
            location.pathname.split("/").length - 3
        ];
    };

    const getIdSoal = () => {
        return location.pathname.split("/")[
            location.pathname.split("/").length - 1
        ];
    };

    const getData = ()=>{
        const setedBankSoal = JSON.parse(Cookies.get('bankSoal'));

        const selected = setedBankSoal.filter(v=>{
            return v.id == getId();
        });

        const soal = selected[0].soal[getIdSoal()-1];

        setKisiSoal(soal.kisi)
        setStatus(soal.status)
        setQuestion(soal.question)
    }

    useEffect(()=>{
        getData();
    },[])

    const saveData = ()=>{
        const setedBankSoal = JSON.parse(Cookies.get('bankSoal'));

        const selected = setedBankSoal.filter(v=>{
            return v.id == getId();
        });
        
        setedBankSoal.map(val=>{
            if (val.id == getId()) {
                val.soal[getIdSoal() - 1].kisi = kisiSoal;
                val.soal[getIdSoal() - 1].question = question;
                val.soal[getIdSoal() - 1].status = status;
            }
        })
        
        Cookies.set('bankSoal',JSON.stringify(setedBankSoal));
        Swal.fire('Berhasil!', 'Data soal berhasil diubah', 'success')
    }

    const addAnswer = ()=>{
        const data = {
            id: answer.length + 1,
            text:'',
            value:false,
        };

        const add = [];

        add.push(data);
        
        const newData = [...answer,...add];

        setAnswer(newData);
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
                            labelText="Pertanyaan"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            style={{
                                marginBottom:"0px",
                            }}
                            inputProps={{
                                onChange:(event)=>{
                                    setQuestion(event.target.value)
                                },
                                value:question,
                            }}
                        />
                        <CustomInput
                            labelText="Kisi Soal"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            style={{
                                marginBottom:"0px",
                            }}
                            inputProps={{
                                onChange:(event)=>{
                                    setKisiSoal(event.target.value)
                                },
                                value:kisiSoal,
                            }}
                        />
                        <div style={{
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center"
                        }} >
                            <p>Status Soal : </p>
                            <div style={{
                                display:"flex",
                                flexDirection:"row",
                                alignItems:"center"
                            }} >
                                <Radio
                                    checked={status === "Valid"}
                                    onChange={() => setStatus("Valid")}
                                    value="Valid"
                                    name="Valid"
                                    aria-label="Valid"
                                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                                    classes={{
                                        checked: classes.radio
                                    }}
                                />
                                <span>Valid</span>
                            </div>
                            <div style={{
                                display:"flex",
                                flexDirection:"row",
                                alignItems:"center"
                            }} >
                                <Radio
                                    checked={status === "Draft"}
                                    onChange={() => setStatus("Draft")}
                                    value="Draft"
                                    name="Draft"
                                    aria-label="Draft"
                                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                                    classes={{
                                        checked: classes.radio
                                    }}
                                />
                                <span>Draft</span>
                            </div>
                        </div>
                        <Button block onClick={()=>{saveData()}} color="primary">Simpan Perubahan</Button>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}