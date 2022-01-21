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

              const deletedMatkul = JSON.parse(localStorage.getItem('mataKuliah')).filter((val)=>{
                return val.id != id
              })

              const data = [];

              deletedMatkul.map((v)=>{
                data.push([v.namaMatKul,v.kodematkul,detail(v.id),edit(v.id),remove(v.id)]);
              });
              
              localStorage.setItem('mataKuliah',JSON.stringify(deletedMatkul));
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
        kodematkul:"152350200",
        namaMatKul:"Komunikasi Data",
        deskripsi:"Memiliki kemampuan dalam memanfaatkan teknologi sistem mikroprosesor dan personal komputer untuk pertukaran data dengan peralatan pengerak bidang elektro dan elektronika baik secara teoritis maupun praktis, sehingga dapat digunakan dalam menganalisa, serta memanfaatkannya untuk menyalurkan data pada sistem penggerak utama pada peralatan elektronika dan elektro.",
        sks: "2",
        seksi:[
          {
            id:1,
            kodeSeksi:1000000147,
            dosen:"Muhammad Ficky Duskarnaen, M.Sc.",
            sks:2,
            semester: 115,
            jenisMatkul:'Bidang Keahlian'
          },
          {
            id:2,
            kodeSeksi:1000000148,
            dosen:"Muhammad Ficky Duskarnaen, M.Sc.",
            sks:2,
            semester: 115,
            jenisMatkul:'Bidang Keahlian'
          },
        ]
      },
      {
        id:2,
        kodematkul:"00052002",
        namaMatKul:"Filsafat Ilmu",
        deskripsi:"Mata kuliah ini dimaksudkan untuk memberikan pengetahuan tentang hakekat, proses, dan sarana berpikir ilmiah. Perkuliahan mencakup karakteristik ilmu secara ontologis, epistimologis dan aksiologis, perbedaan ilmu dengan pengetahuan lainnya, kelebihan dan kekurangan ilmu, sejarah perkembangan ilmu, hakikat metode penelitian statistik, hakikat bahasa, hakikat logika, hakikat matematika, etika dan ilmu, dan peranan ilmu dalam perkembangan peradaban manusia.",
        sks: "2",
        seksi:[
          {
            id:4,
            kodeSeksi:1512600059,
            dosen:"Fandy Septia Anggriawan",
            sks:2,
            semester: 115,
            jenisMatkul:'Bidang Keahlian'
          },
          {
            id:5,
            kodeSeksi:1512600060,
            dosen:"Fandy Septia Anggriawan",
            sks:2,
            semester: 115,
            jenisMatkul:'Bidang Keahlian'
          },    
        ]
      },
      {
        id:3,
        kodematkul:"152350212",
        namaMatKul:"Interaksi Manusia & Komputer",
        deskripsi:"Memberikan pengetahuan tentang aspek-aspek perancangan desain antar muka sistem komputer. Memahami kategori pengguna berdasarkan kemampuan berinteraksi dengan komputer, memahami konsep sistem komputer interaktif, memahami jenis-jenis ragam dialog, aspek ergonomik dan perancangan antar muka dari sudut pengguna.",
        sks: "2",
        seksi:[
          {
            id:5,
            kodeSeksi:1000000147,
            dosen:"Murien Nugraheni, S.T., m.Cs.",
            sks:2,
            semester: 115,
            jenisMatkul:'Bidang Keahlian'
          },
          {
            id:6,
            kodeSeksi:1000000148,
            dosen:"Murien Nugraheni, S.T., m.Cs.",
            sks:2,
            semester: 115,
            jenisMatkul:'Bidang Keahlian'
          },
        ]
      },
      {
        id:4,
        kodematkul:"152350213",
        namaMatKul:"Jaringan Komputer",
        deskripsi:"Pendahuluan;Transmisi data; Media Transmisi; Data Enconding; Antar muka Komunikasi Data; DataLinkcontrol; Multiplexing;circuit Switching; Packet Switching; Frame Relay; ATM; Protocol dan Arsitektur; ISDN; Teknologi Local Area Network; Sistem dari LAN; Bridges; Internetworking; client Server, EDI & Networking Security, Perangkat Lunak Jaringan.",
        sks: "2",
        seksi:[
          {
            id:7,
            kodeSeksi:1512600023,
            dosen:"Muhammad Ficky Duskarnaen, M.Sc.",
            sks:3,
            semester: 115,
            jenisMatkul:'Bidang Keahlian'
          },
          {
            id:8,
            kodeSeksi:1512600024,
            dosen:"Muhammad Ficky Duskarnaen, M.Sc.",
            sks:3,
            semester: 115,
            jenisMatkul:'Bidang Keahlian'
          },
        ]
      },
    ];

    
    const existingMatkul = localStorage.getItem('mataKuliah')
    
    if (existingMatkul) {

      const data = [];

      JSON.parse(existingMatkul).map((v)=>{
        data.push([v.kodematkul,v.namaMatKul,detail(v.id),edit(v.id),remove(v.id)]);
      });
  
      setMatkul(data)
    }else{

      localStorage.setItem('mataKuliah',JSON.stringify(db_matkul));
      const data = [];

      db_matkul.map((v)=>{
        data.push([v.kodematkul,v.namaMatKul,,detail(v.id),edit(v.id),remove(v.id)]);
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
                <Button onClick={()=>location.href='/admin/matkul/add'} color="primary">Tambahkan Mata Kuliah</Button>
                <Button onClick={()=>location.href='/admin/matkul/import'} color="success">Import Data Mata Kuliah</Button>
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
              tableHead={["Kode Matkul","Nama Matkul","Detail","Edit","Remove"]}
              tableData={matkul}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
