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

export default function EditBankSoalDosen(params) {

  const classes = useStyles();

  const [selectedMatkul,setSelectedMatkul] = useState(null);
  const [jumlah,setJumlah] = useState('');
  const [status,setStatus] = useState('');

    const getId = () => {
        return location.pathname.split("/")[
        location.pathname.split("/").length - 1
        ];
    };

    const getData = ()=>{
        const setedBankSoal = JSON.parse(localStorage.getItem('bankSoal'));

        const selected = setedBankSoal.filter((val)=>{
            return val.id == getId();
        })

        setJumlah(selected[0].jumlah);
        setStatus(selected[0].status);
    }

    useEffect(()=>{
        getData();
    },[])

    const saveDosen = ()=>{
        const setedBankSoal = JSON.parse(localStorage.getItem('bankSoal'));

        if (jumlah == ''&& status == '') {
            Swal.fire('Terjadi Kesalahan','Gagal untuk menyimpan data, Semua data Wajib di isi','error')
            return;
        }

        setedBankSoal.map(v=>{
            if (v.id == getId()) {
                v.jumlah = jumlah;
                v.status = status;
            }
        })

        console.log(setedBankSoal);
        
        localStorage.setItem('bankSoal',JSON.stringify(setedBankSoal));

        Swal.fire({
            title: 'Berhasil!',
            text: 'Berhasil mengubah data bank soal',
            icon: 'success',
            confirmButtonText: 'Tutup'
        })

        setTimeout(() => {
            location.reload();
        }, 500);
    }

    const renderMataKuliah = ()=>{
        const mataKuliah = JSON.parse(localStorage.getItem('mataKuliah'));

        if (mataKuliah) {
            return (
                mataKuliah.map(v=>{
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
                    minWidth:200,
                    }} >
                    <Radio
                        checked={selectedMatkul?.id === v.id}
                        onChange={() => selectedMatkul?.id == v.id ? setSelectedMatkul(null) : setSelectedMatkul(v)}
                        value={v.id}
                        icon={<FiberManualRecord className={classes.radioUnchecked} />}
                        checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                        classes={{
                        checked: classes.radio
                        }}
                    />
                    </div>
                    <div style={{
                        minWidth:200,
                    }} >
                        {v.namaMatKul}
                    </div>
                    <div style={{
                    minWidth:200,
                    }} >
                    {v.kodematkul}
                    </div>
                </div>
                )
            })
            )
        }
    }

  return (
    <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="success">
                    <h4 className={classes.cardTitleWhite}>Ubah Data Bank Soal</h4>
                </CardHeader>
                <CardBody>
                    {/* <h4>Pilih Mata Kuliah</h4>
                    <div style={{
                        paddingTop:10,
                        paddingBottom:10,
                        borderBottom:"1px solid #eee",
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center"
                    }} >
                        <div style={{
                            minWidth:200,
                        }} >
                            Pilih
                        </div>
                        <div style={{
                        minWidth:200,
                        }} >
                            Nama Mata Kuliah
                        </div>
                        <div style={{
                            minWidth:200,
                        }} >
                            Kode Matkul
                        </div>
                    </div>
                    {renderMataKuliah()} */}
                    <CustomInput
                        labelText="Jumlah Soal"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        style={{
                            marginBottom:"0px",
                        }}
                        inputProps={{
                            onChange:(event)=>{
                                setJumlah(event.target.value)
                            },
                            value:jumlah
                        }}
                    />
                    <div style={{
                        display:"flex",
                        flexDirection:"column"
                    }} >
                        <p>Status Bank Soal</p>
                        <div style={{
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center"
                        }} >
                            <Radio
                                checked={status == "Valid"}
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
                                checked={status == "Draft"}
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
                    <Button block onClick={()=>{saveDosen()}} color="primary">Simpan Perubahan</Button>
                </CardBody>
            </Card>
        </GridItem>
    </GridContainer>
  );
}