import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import Table from "components/Table/Table.js";
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

export default function AddUjianDosen(params) {

  const classes = useStyles();
  const [namaUjian,setNamaUjian] = useState();
  const [tanggal,setTanggal] = useState();
  const [waktu,setWaktu] = useState();
  const [lamaUjian,setLamaUjian] = useState();
  const [bankSoal,setBankSoal] = useState([]);
  const [selectedBankSoal,setSelectedBankSoal] = useState();

  const getId = () => {
    return location.pathname.split("/")[
        location.pathname.split("/").length - 2
    ];
};

  useEffect(()=>{
    getData()
  },[])

  const saveDosen = ()=>{
    const setedUjian = JSON.parse(Cookies.get('dataUjian'));

    if (namaUjian == '' && tanggal == ''&& waktu == ''&& lamaUjian == ''&& !selectedBankSoal) {
        Swal.fire('Terjadi Kesalahan','Gagal untuk menyimpan data, Semua data Wajib di isi','error')
        return;
    }

    setedUjian.map(v=>{
      if (v.id == getId()) {
        v.ujian.push({
          id:v.ujian[v.ujian.length - 1].id + 1,
          lamaUjian: lamaUjian,
          namaUjian: namaUjian,
          tanggal: tanggal,
          waktu: waktu,
          banksoal:selectedBankSoal,
        })
      }
    })
    
    Cookies.set('dataUjian',JSON.stringify(setedUjian))
    Swal.fire({
      title: 'Berhasil!',
      text: 'Berhasil Ujian',
      icon: 'success',
      confirmButtonText: 'Tutup'
    })

    setTimeout(() => {
      location.reload();
    }, 500);
  }

  const getData = ()=>{
    const setedBankSoal = JSON.parse(Cookies.get('bankSoal'));
    setBankSoal(setedBankSoal)
  }

  const renderBankSoal = ()=>{
    return(
      bankSoal?.map(v=>{
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
                checked={selectedBankSoal?.id === v.id}
                onChange={() => setSelectedBankSoal(v)}
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
              {v.matakuliah}
            </div>
            <div style={{
              minWidth:200,
            }} >
              {v.kodeMatKul}
            </div>
            <div style={{
              minWidth:200,
            }} >
              {v.jumlah}
            </div>
            <div style={{
              minWidth:200,
            }} >
              {v.status}
            </div>
          </div>
        )
      })
    )
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Tambahkan Ujian</h4>
          </CardHeader>
          <CardBody>
            <CustomInput
                labelText="Nama Ujian"
                formControlProps={{
                    fullWidth: true,
                }}
                style={{
                    marginBottom:"0px",
                }}
                inputProps={{
                    onChange:(event)=>{
                        setNamaUjian(event.target.value)
                    },
                    value:namaUjian
                }}
            />
            <CustomInput
                labelText="Tanggal Ujian"
                formControlProps={{
                    fullWidth: true,
                }}
                style={{
                    marginBottom:"0px",
                }}
                inputProps={{
                    onChange:(event)=>{
                        setTanggal(event.target.value)
                    },
                    value:tanggal,
                    type:'date'
                }}
            />
            <CustomInput
                labelText="Waktu Ujian"
                formControlProps={{
                    fullWidth: true,
                }}
                style={{
                    marginBottom:"0px",
                }}
                inputProps={{
                    onChange:(event)=>{
                        setWaktu(event.target.value)
                    },
                    value:waktu,
                }}
            />
            <CustomInput
                labelText="Lama Ujian (Menit)"
                formControlProps={{
                    fullWidth: true,
                }}
                style={{
                    marginBottom:"0px",
                }}
                inputProps={{
                    onChange:(event)=>{
                        setLamaUjian(event.target.value)
                    },
                    value:lamaUjian,
                }}
            />
            <h4>Pilih Bank Soal</h4>
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
                <div style={{
                minWidth:200,
                }} >
                  Jumlah Soal
                </div>
                <div style={{
                minWidth:200,
                }} >
                  Status
                </div>
            </div>
            {renderBankSoal()}
            <Button block onClick={()=>{saveDosen()}} color="primary">Simpan Perubahan</Button>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}