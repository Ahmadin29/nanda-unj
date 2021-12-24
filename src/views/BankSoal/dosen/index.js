import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import { Icon, IconButton } from "@material-ui/core";
import Swal from 'sweetalert2'
import Cookies from "js-cookie";

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

export default function BankSoalDosen() {
  const classes = useStyles();

  const edit = (id)=>{
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={()=>location.href='/dosen/bank-soal/edit/'+id}
      >
        <Icon color="green">edit</Icon>
      </IconButton>
    )
  }

  const detail = (id)=>{
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={()=>location.href='/dosen/bank-soal/'+id+'/detail'}
      >
        <Icon color="green">book</Icon>
      </IconButton>
    )
  }

  const remove = (id)=>{
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={()=>{
          Swal.fire({
            title: 'Yakin kamu ingin menghapus data bank soal ini? Semua data tidak akan bisa dikembalikan',
            showCancelButton: true,
            confirmButtonText: 'Ya, Lanjutkan',
            icon:'question'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

              const deletedBankSoal = JSON.parse(Cookies.get('bankSoal')).filter((val)=>{
                return val.id != id
              })

              const data = [];

              deletedBankSoal.map((v)=>{
                data.push([v.matakuliah,v.kodeMatKul,v.jumlah,v.status,detail(v.id),edit(v.id),remove(v.id)]);
              });
              
              Cookies.set('bankSoal',JSON.stringify(deletedBankSoal));
              setBankSoal(data)

              Swal.fire('Dihapus!', 'Berhasil dihapus', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
        }}
      >
        <Icon color="green">delete</Icon>
      </IconButton>
    )
  }

  const [bankSoal,setBankSoal] = useState([])

  const generateDatabase = ()=>{
    const db_banksoal = [
        {
            id:1,
            matakuliah:"Aljabar Linear",
            kodeMatKul:1231231231,
            jumlah:40,
            status:'Valid',
            soal:[
                {
                    id:1,
                    question:"Sebutkan cabang filsafat ilmu!",
                    status:'Valid',
                    kisi:'Lorem Ipsum dolor sit amet consectetur adipsicing',
                },
                {
                    id:2,
                    question:"Dalam filsafat ilmu mempelajari masalah kemanusiaan dalam hidup ini yang meliputi tiga hubungan penting manusia diantaranya:",
                    status:'Valid',
                    kisi:'Lorem Ipsum dolor sit amet consectetur adipsicing',
                },
            ]
        },
        {
            id:2,
            matakuliah:"Filsafat Ilmu",
            kodeMatKul:123123111,
            jumlah:40,
            status:'Draft',
            soal:[
                {
                    id:1,
                    question:"Sebutkan cabang filsafat ilmu!",
                    kisi:'Lorem Ipsum dolor sit amet consectetur adipsicing',
                    status:'Valid',
                },
                {
                    id:2,
                    question:"Dalam filsafat ilmu mempelajari masalah kemanusiaan dalam hidup ini yang meliputi tiga hubungan penting manusia diantaranya:",
                    kisi:'Lorem Ipsum dolor sit amet consectetur adipsicing',
                    status:'Valid',
                },
            ]
        },
        {
            id:3,
            matakuliah:"Struktur Data",
            kodeMatKul:1231231231,
            jumlah:40,
            status:'Valid',
            soal:[
                {
                    id:1,
                    question:"Sebutkan cabang filsafat ilmu!",
                    kisi:'Lorem Ipsum dolor sit amet consectetur adipsicing',
                    status:'Valid',
                },
                {
                    id:2,
                    question:"Dalam filsafat ilmu mempelajari masalah kemanusiaan dalam hidup ini yang meliputi tiga hubungan penting manusia diantaranya:",
                    kisi:'Lorem Ipsum dolor sit amet consectetur adipsicing',
                    status:'Valid',
                },
            ]
        },
    ];

    const existingBankSoal = Cookies.get('bankSoal');
    
    if (existingBankSoal) {

      const data = [];

      JSON.parse(existingBankSoal).map((v)=>{
        data.push([v.matakuliah,v.kodeMatKul,v.jumlah,v.status,detail(v.id),edit(v.id),remove(v.id)]);
      });
  
      setBankSoal(data)
    }else{

      Cookies.set('bankSoal',JSON.stringify(db_banksoal));
      const data = [];

      db_banksoal.map((v)=>{
        data.push([v.matakuliah,v.kodeMatKul,v.jumlah,v.status,detail(v.id),edit(v.id),remove(v.id)]);
      });
  
      setBankSoal(data)
    }
  }

  useEffect(()=>{
    generateDatabase();
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
              }} >Daftar Bank Soal</span>
              <div>
                <Button onClick={()=>location.href='/dosen/bank-soal/add'} color="primary">Tambahkan Bank Soal</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Data Bank Soal</h4>
            <p className={classes.cardCategoryWhite}>
              Data Bank Soal
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Mata Kuliah", "Kode Mata Kuliah", "Jumlah Soal", "Status","Detail",'Edit','Hapus']}
              tableData={bankSoal}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
