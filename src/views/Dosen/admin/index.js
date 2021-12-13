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

export default function DosenAdmin() {
  const classes = useStyles();

  const edit = (id)=>{
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={()=>location.href='/admin/dosen/edit/'+id}
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
            title: 'Yakin kamu ingin menghapus data dosen ini?',
            showCancelButton: true,
            confirmButtonText: 'Ya, Lanjutkan',
            icon:'question'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

              const deletedDosen = JSON.parse(Cookies.get('dosen')).filter((val)=>{
                console.log(val.id,id);
                return val.id != id
              })

              const data = [];

              deletedDosen.map((v)=>{
                data.push([v.nip,v.nidn,v.nidk,v.namaLengkap,v.email,v.nomorTelepon,edit(v.id),remove(v.id)]);
              });
              
              Cookies.set('dosen',JSON.stringify(deletedDosen));
              setDosen(data)

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

  const [dosen,setDosen] = useState([])

  const generateDatabase = ()=>{
    const db_dosen = [
      {
        id:1,
        nip:"1910012345678901",
        nidn:"1111111111",
        nidk:"1111111111",
        namaLengkap:"Bayley Cooke",
        email:"richard@gmail.com",
        nomorTelepon:"081256789012",
        password:'12345'
      },
      {
        id:2,
        nip:"1910012345678901",
        nidn:"1111111111",
        nidk:"1111111111",
        namaLengkap:"Bayley Cooke",
        email:"richard@gmail.com",
        nomorTelepon:"081256789012",
        password:'12345'
      },
      {
        id:3,
        nip:"1910012345678901",
        nidn:"1111111111",
        nidk:"1111111111",
        namaLengkap:"Bayley Cooke",
        email:"richard@gmail.com",
        nomorTelepon:"081256789012",
        password:'12345'
      },
      {
        id:4,
        nip:"1910012345678901",
        nidn:"1111111111",
        nidk:"1111111111",
        namaLengkap:"Bayley Cooke",
        email:"richard@gmail.com",
        nomorTelepon:"081256789012",
        password:'12345'
      },
      {
        id:5,
        nip:"1910012345678901",
        nidn:"1111111111",
        nidk:"1111111111",
        namaLengkap:"Bayley Cooke",
        email:"richard@gmail.com",
        nomorTelepon:"081256789012",
        password:'12345'
      },
    ];

    const existingDosen = Cookies.get('dosen');
    
    if (existingDosen) {

      const data = [];

      JSON.parse(existingDosen).map((v)=>{
        data.push([v.nip,v.nidn,v.nidk,v.namaLengkap,v.email,v.nomorTelepon,edit(v.id),remove(v.id)]);
      });
  
      setDosen(data)
    }else{

      Cookies.set('dosen',JSON.stringify(db_dosen));
      const data = [];

      db_dosen.map((v)=>{
        data.push([v.nip,v.nidn,v.nidk,v.namaLengkap,v.email,v.nomorTelepon,edit(v.id),remove(v.id)]);
      });
  
      setDosen(data)
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
              }} >Daftar Akun Dosen</span>
              <div>
                <Button onClick={()=>location.href='/admin/dosen/add'} color="primary">Tambahkan Dosen</Button>
                <Button onClick={()=>location.href='/admin/calendar/edit'} color="success">Import Data Dosen</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Data Dosen</h4>
            <p className={classes.cardCategoryWhite}>
              Data Dosen Pemangku Mata Kuliah
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["NIP", "NIDN", "NIDK", "Nama Lengkap","Email",'Nomor Telepon','Ubah',"Hapus","Reset Password"]}
              tableData={dosen}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
