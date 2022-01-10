import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";

import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import CheckboxStyles from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";

import CustomInput from "components/CustomInput/CustomInput";
import Cookies from "js-cookie";
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

export default function EditMataKuliahAdmin(params) {

  const classes = useStyles();
  const [namaMatKul,setNamaMatKul] = useState('');
  const [kodeMatKul,setKodeMatKul] = useState('');
  const [deskripsiMatkul,setDeskripsiMatkul] = useState('');
  const [semesterMatkul,setSemesterMatkul] = useState('');
  const [seksiKuliah,setSeksiKuliah] = useState([]);

  const [matKul,setMatKul] = useState();
  const [seksi,setSeksi] = useState([]);

  const getId = () => {
    return location.pathname.split("/")[
      location.pathname.split("/").length - 1
    ];
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = ()=>{
    const setedMataKuliah = Cookies.get('mataKuliah');

    const selected = JSON.parse(setedMataKuliah).filter(v=>{
      return v.id == getId();
    });

    const dataSeksi = [];

    selected[0].seksi.map(v=>{
      dataSeksi.push(v);
    })

    console.log(selected[0]);

    setNamaMatKul(selected[0].namaMatKul);
    setKodeMatKul(selected[0].kodematkul);
    setDeskripsiMatkul(selected[0].deskripsi);
    setSemesterMatkul(selected[0].semester);
  }

  const saveMatkul = ()=>{
    const setedMatkul = JSON.parse(Cookies.get('mataKuliah'));

    if (namaMatKul == '' && kodeMatKul == '' && deskripsiMatkul == '' && semesterMatkul == ''&& !seksiKuliah) {
        Swal.fire('Terjadi Kesalahan','Gagal untuk menyimpan data, Semua data Wajib di isi','error')
        return;
    }

    setedMatkul.map(val=>{
      if (val.id == getId()) {
        val.kodematkul  = kodeMatKul;
        val.namaMatKul  = namaMatKul;
        val.deskripsi   = deskripsiMatkul;
        val.semester   = semesterMatkul;
        val.seksi       = seksiKuliah.length ?  seksiKuliah :val.seksi ;
      }
    })
    
    Cookies.set('mataKuliah',JSON.stringify(setedMatkul))
    Swal.fire({
      title: 'Berhasil!',
      text: 'Berhasil mengubah data mata kuliah',
      icon: 'success',
      confirmButtonText: 'Tutup'
    })
  }

  const renderSeksi = () =>{
    const setedseksi = JSON.parse(Cookies.get('kodeSeksi'));

    return (
      setedseksi.map(v=>{
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
              <Checkbox
                onClick={() => CheckSeksi(v)}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked
                }}
              />
            </div>
            <div style={{
              minWidth:200,
            }} >
              {v.kodeSeksi}
            </div>
            <div style={{
              minWidth:200,
            }} >
              {v.dosen}
            </div>
            <div style={{
              minWidth:200,
            }} >
              {v.sks}
            </div>
            <div style={{
              minWidth:200,
            }} >
              {v.semester}
            </div>
            <div style={{
              minWidth:200,
            }} >
              {v.jenisMatkul}
            </div>
          </div>
        )
      })
    )
  }

  const CheckSeksi = (v)=>{
    const check = seksiKuliah.filter((val)=>{
      return val.id == v.id
    })

    if (check.length > 0) {
      const newData = seksiKuliah.filter((val)=>{
        return val.id != v.id
      })

      setSeksiKuliah(newData)
    }else{
      const newData = []

      seksiKuliah.map(val=>{
        newData.push(val)
      })

      newData.push(v);

      setSeksiKuliah(newData)
    }
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Ubah Data Mata Kuliah</h4>
          </CardHeader>
          <CardBody>
            <CustomInput
              labelText="Nama Mata Kuliah"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setNamaMatKul(event.target.value)
                },
                value:namaMatKul,
              }}
            />
            <CustomInput
              labelText="Kode Mata Kuliah"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setKodeMatKul(event.target.value)
                },
                value:kodeMatKul,
              }}
            />
            <CustomInput
              labelText="Deskripsi Mata Kuliah"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setDeskripsiMatkul(event.target.value)
                },
                value:deskripsiMatkul,
              }}
            />
            <CustomInput
              labelText="Semester Mata Kuliah"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setSemesterMatkul(event.target.value)
                },
                value:semesterMatkul,
              }}
            />
            <Button block onClick={()=>{saveMatkul()}} color="primary">Simpan Perubahan</Button>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}