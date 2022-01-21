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
import Cookies from "js-cookie";
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

export default function MahasiswaAdmin() {
  const classes = useStyles();

  const edit = (id)=>{
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={()=>location.href='/admin/mahasiswa/edit/'+id}
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
            title: 'Yakin kamu ingin menghapus data mahasiwa ini?',
            showCancelButton: true,
            confirmButtonText: 'Ya, Lanjutkan',
            icon:'question'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

              const deletedMahasiswa = JSON.parse(localStorage.getItem('mahasiswa')).filter((val)=>{
                return val.id != id
              })

              const data = [];

              deletedMahasiswa.map((v)=>{
                data.push([v.nim,v.namaLengkap,v.email,v.nomorTelepon,edit(v.id)]);
              });
              
              localStorage.setItem('mahasiswa',JSON.stringify(deletedMahasiswa));
              setMahasiswa(data)

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

  const [mahasiswa,setMahasiswa] = useState([]);

  const generateDatabase = ()=>{
    const db_mahasiswa = [
      {
        id:1,
        nim:"1512620003",
        namaLengkap:"Taufik Ihsan",
        email:"Taufik@gmail.com",
        nomorTelepon:"081532198478",
        password:'12345',
        angkatan:'2020'
      },
      {
        id:2,
        nim:"1512620011",
        namaLengkap:"Fatih Abhipraya",
        email:"Fatihabhi@gmail.com",
        nomorTelepon:"082117247250",
        password:'12345',
        angkatan:'1'
      },
      {
        id:3,
        nim:"1512620015",
        namaLengkap:"Amelia Arifah",
        email:"Ameliar@gmail.com",
        nomorTelepon:"085254244522",
        password:'12345',
        angkatan:'1'
      },
      {
        id:4,
        nim:"1512620042",
        namaLengkap:"Rizka Rahmawati Dewi",
        email:"rizkarah@gmail.com",
        nomorTelepon:"08219671465",
        password:'12345',
        angkatan:'1'
      },
      {
        id:5,
        nim:"1512620046",
        namaLengkap:"Janabella Ayu Tafarannisa",
        email:"Janabella@gmail.com",
        nomorTelepon:"081298589827",
        password:'12345',
        angkatan:'1'
      },
    ];

    const existingMahasiswa = localStorage.getItem('mahasiswa');
    
    if (existingMahasiswa) {

      const data = [];

      JSON.parse(existingMahasiswa).map((v)=>{
        data.push([v.nim,v.namaLengkap,v.email,v.nomorTelepon,edit(v.id)]);
      });
  
      setMahasiswa(data)
    }else{

      localStorage.setItem('mahasiswa',JSON.stringify(db_mahasiswa));
      const data = [];

      db_mahasiswa.map((v)=>{
        data.push([v.nim,v.namaLengkap,v.email,v.nomorTelepon,edit(v.id)]);
      });
  
      setMahasiswa(data)
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
              }} >Daftar Akun Mahasiswa</span>
              <div>
                <Button onClick={()=>location.href='/admin/mahasiswa/add'} color="primary">Tambahkan Mahasiswa</Button>
                <Button onClick={()=>location.href='/admin/mahasiswa/import'} color="success">Import Data Mahasiswa</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="danger">
            <h4 className={classes.cardTitleWhite}>Data Mahasiswa</h4>
            <p className={classes.cardCategoryWhite}>
              Data List Mahasiswa
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["NIM","Nama Lengkap","Email",'Nomor Telepon','Edit']}
              tableData={mahasiswa}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
