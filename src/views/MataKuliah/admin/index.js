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

export default function MataKuliahAdmin() {
  const classes = useStyles();

  const detail = (id)=>{
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={()=>location.href='/admin/matkul/detail/'+id}
      >
        <Icon color="green">book</Icon>
      </IconButton>
    )
  }

  const edit = (id)=>{
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={()=>location.href='/admin/matkul/edit/'+id}
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
            title: 'Yakin kamu ingin menghapus data mata kuliah ini?',
            showCancelButton: true,
            confirmButtonText: 'Ya, Lanjutkan',
            icon:'question'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

              const deletedMatkul = JSON.parse(Cookies.get('mataKuliah')).filter((val)=>{
                return val.id != id
              })

              const data = [];

              deletedMatkul.map((v)=>{
                data.push([v.namaMatKul,v.kodematkul,detail(v.id),edit(v.id),remove(v.id)]);
              });
              
              Cookies.set('mataKuliah',JSON.stringify(deletedMatkul));
              setMatkul(data)

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

  const [matkul,setMatkul] = useState([]);

  const generateDatabase = ()=>{
    const db_matkul = [
      {
        id:1,
        kodematkul:"1910012345678901",
        namaMatKul:"Bayley Cooke",
        deskripsi:"richard@gmail.com",
        seksi:[
          {
            id:1,
            kodeSeksi:123123,
            dosen:"Ted1s",
            sks:2,
            jenisMatkul:'wajib'
          },
          {
            id:2,
            kodeSeksi:123123,
            dosen:"Teds",
            sks:2,
            jenisMatkul:'wajib'
          },
          {
            id:3,
            kodeSeksi:123123,
            dosen:"Te1ds",
            sks:2,
            jenisMatkul:'wajib'
          },
        ]
      },
      {
        id:2,
        kodematkul:"1910012345678901",
        namaMatKul:"Bayley Cooke",
        deskripsi:"richard@gmail.com",
        seksi:[
          {
            id:4,
            kodeSeksi:123123,
            dosen:"Ted1s",
            sks:2,
            jenisMatkul:'wajib'
          },
          {
            id:5,
            kodeSeksi:123123,
            dosen:"Teds",
            sks:2,
            jenisMatkul:'wajib'
          },
          {
            id:6,
            kodeSeksi:123123,
            dosen:"Te1d1s",
            sks:2,
            jenisMatkul:'wajib'
          },
        ]
      },
    ];

    const existingMatkul = Cookies.get('mataKuliah');
    
    if (existingMatkul) {

      const data = [];

      JSON.parse(existingMatkul).map((v)=>{
        data.push([v.namaMatKul,v.kodematkul,detail(v.id),edit(v.id),remove(v.id)]);
      });
  
      setMatkul(data)
    }else{

      Cookies.set('mataKuliah',JSON.stringify(db_matkul));
      const data = [];

      db_matkul.map((v)=>{
        data.push([v.namaMatKul,v.kodematkul,detail(v.id),edit(v.id),remove(v.id)]);
      });
  
      setMatkul(data)
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
              }} >Daftar Mata Kuliah</span>
              <div>
                <Button onClick={()=>location.href='/admin/matkul/add'} color="primary">Tambahkan Mataa Kuliah</Button>
                <Button onClick={()=>location.href='/admin/calendar/edit'} color="success">Import Data Mata Kuliah</Button>
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
            <Table
              tableHeaderColor="primary"
              tableHead={["Nama Matkul","Kode Matkul","Detail","Edit","Remove"]}
              tableData={matkul}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
