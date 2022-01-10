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
import Swal from "sweetalert2";

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

export default function SeksiAdmin() {
  const classes = useStyles();

  const detail = (id)=>{
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={()=>location.href='/admin/seksi/detail/'+id}
      >
        <Icon color="green">book</Icon>
      </IconButton>
    )
  }

  const edit = (id)=>{
    return (
      <IconButton
        color="inherit"
        onClick={()=>location.href='/admin/seksi/edit/'+id}
        aria-label="open drawer"
      >
        <Icon color="green">edit</Icon>
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
            title: 'Yakin kamu ingin menghapus data Kode Seksi kuliah ini?',
            showCancelButton: true,
            confirmButtonText: 'Ya, Lanjutkan',
            icon:'question'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

              const deletedSeksi = JSON.parse(localStorage.getItem('kodeSeksi')).filter((val)=>{
                return val.id != id
              })

              const data = [];

              deletedSeksi.map((v)=>{
                data.push([v.mataKuliah.name,v.kodeSeksi,v.semester,detail(v.id),edit(v.id)]);
              });
              
              localStorage.setItem('kodeSeksi',JSON.stringify(deletedSeksi));
              setKodeSeksi(data)

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

  const [kodeSeksi,setKodeSeksi] = useState([]);

  const generateDatabase = ()=>{
    const db_kodeSeksi = [
      {
        id:1,
        kodeSeksi:1512600068,
        dosen:"Ivan Hanafi",
        sks:2,
        semester : 115,
        jenisMatkul:'Umum',
        mataKuliah:{
          name:'Bahasa Inggris'
        }
      },
      {
        id:2,
        kodeSeksi:1512600059,
        dosen:"Fandy Septia Anggriawan",
        sks:2,
        semester : 115,
        jenisMatkul:'Bidang Keahlian',
        mataKuliah:{
          name:'Filsafat Ilmu'
        }
      },
      {
        id:3,
        kodeSeksi:1000000147,
        dosen:"Rosinar",
        sks:2,
        semester : 115,
        jenisMatkul:'Dasar Kependidikan',
        mataKuliah:{
          name:'Profesi Pendidik & Tanaga Kependidikan'
        }
      },
      {
        id:4,
        kodeSeksi:1512600077,
        dosen:"Muhammad Ficky Duskarnaen",
        sks:3,
        semester : 115,
        jenisMatkul:'Bidang Keahlian',
        mataKuliah:{
          name:'Jaringan Komputer'
        }
      },
      {
        id:5,
        kodeSeksi:1512600079,
        dosen:"Ze. Ferdi Fauzan Putra",
        sks:3,
        semester : 115,
        jenisMatkul:'Bidang Keahlian',
        mataKuliah:{
          name:'Desain Web'
        }
      },
    ];

    const existingKodeSeksi = localStorage.getItem('kodeSeksi');
    
    if (existingKodeSeksi) {

      const data = [];

      JSON.parse(existingKodeSeksi).map((v)=>{
        data.push([v.mataKuliah.name,v.dosen,v.kodeSeksi,v.semester,detail(v.id),edit(v.id)]);
      });
  
      setKodeSeksi(data)
    }else{

      localStorage.setItem('kodeSeksi',JSON.stringify(db_kodeSeksi));
      const data = [];

      db_kodeSeksi.map((v)=>{
        data.push([v.mataKuliah.name,v.dosen,v.kodeSeksi,v.semester,detail(v.id),edit(v.id)]);
      });
  
      setKodeSeksi(data)
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
              }} >Daftar Kode Seksi</span>
              <div>
                <Button onClick={()=>location.href='/admin/seksi/add'} color="primary">Tambahkan Kode Seksi</Button>
                <Button onClick={()=>location.href='/admin/seksi/import'} color="success">Import Data Kode Seksi</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Data Kode Seksi</h4>
            <p className={classes.cardCategoryWhite}>
              Data Kode Seksi
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Nama Matkul","Dosen","Kode Seksi","Semester","Kelas","Edit"]}
              tableData={kodeSeksi}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
