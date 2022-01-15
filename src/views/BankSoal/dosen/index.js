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

              const deletedBankSoal = JSON.parse(localStorage.getItem('bankSoal')).filter((val)=>{
                return val.id != id
              })

              const data = [];

              deletedBankSoal.map((v)=>{
                data.push([v.matakuliah,v.kodeMatKul,v.jumlah,v.status,detail(v.id),edit(v.id),remove(v.id)]);
              });
              
              localStorage.setItem('bankSoal',JSON.stringify(deletedBankSoal));
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
            matakuliah:"Jaringan Komputer",
            kodeMatKul:52350113,
            jumlah:40,
            status:'Valid',
            soal:[
                {
                    id:1,
                    question:"Sebutkan 5 perangkat keras jaringan!",
                    status:'Valid',
                    kisi:'Hub, Switch, Bridge, Router, Modem',
                },
                {
                    id:2,
                    question:"Sebutkan macam-macam topologi jaringan komputer yang anda ketahui!",
                    status:'Valid',
                    kisi:'Topologi Bus, Topologi Ring, Topologi Star. topologi Pohon',
                },
                {
                    id:3,
                    question:"Dalam filsafat ilmu mempelajari masalah kemanusiaan dalam hidup ini yang meliputi tiga hubungan penting manusia diantaranya:",
                    status:'Valid',
                    kisi:'Lorem Ipsum dolor sit amet consectetur adipsicing',
                },
                {
                    id:4,
                    question:"Sebutkan perbedaan antara Software dan Hardware!",
                    status:'Valid',
                    kisi:'Software merupakan kumpulan beberapa perintah yang dieksekusi oleh mesin komputer dalam menjalankan pekerjaannya. Sedangkan hardware adalah perangkat keras komputer atau komponen fisik pada komputer yang digunakan untuk oleh sistem untuk menjalankan suatu perintah yang telah diprogramkan.',
                },
                {
                    id:5,
                    question:"Jelaskan yang dimaksud dengan firewall!",
                    status:'Valid',
                    kisi:'Firewall adalah perangkat yang digunakan untuk mengontrol akses terhadap siapapun yang memiliki akses terhadap jaringan privat dari pihak luar.',
                },
                {
                    id:6,
                    question:"Apa pengertian topologi jaringan?",
                    status:'Valid',
                    kisi:'Topologi jaringan adalah suatu metode yang memiliki fungsi untuk menghubungkan satu komputer dengan komputer yang lain, yang dilakukannya dapat melalui kabel maupun nirkabel.',
                },
                {
                    id:7,
                    question:"Sebutkan macam-macam distro Linux!",
                    status:'Valid',
                    kisi:'Debian, Ubuntu, MX Linux, Fedora, Zorin, Steam, Mint, Linux Console, Elementary',
                },
                {
                    id:8,
                    question:"Sebutkan alat yang dibutuhkan sebelum merakit PC atau Komputer!",
                    status:'Valid',
                    kisi:'obeng (+), obeng (-), tang lancip, multimeter (untuk mengukur tegangan), pinset (untuk mencabut jumper) dan gelang anti statik',
                },
                {
                    id:9,
                    question:"Apa yang dimaksud hardware komputer yang berfungsi untuk penyimpanan sementara?",
                    status:'Valid',
                    kisi:'RAM',
                },
                {
                    id:10,
                    question:"Sebutkan bahan yang perlu disiapkan saat merakit pc atau komputer",
                    status:'Valid',
                    kisi:'Bahan yang perlu disiapkan saat merakit pc yaitu : Motherboard, processor, hardisk, CD/DVD drive, floppy disk, kabel data, kartu memory (RAM), kartu VGA, kartu USB, modem, Casing dan Power Suplay',
                },
                {
                    id:11,
                    question:"Sebutkan macam macam standar WLAN IEEE!",
                    status:'Valid',
                    kisi:'802.11, 802.11b, 802.11a, 802.11a, 802.11n, 802.11ac, 802.11ax',
                },
                {
                    id:12,
                    question:"Sebutkan Pengertian dari Sistem Operasi pada Komputer!",
                    status:'Valid',
                    kisi:'Perangkat lunak sistem yang mengatur sumber daya dari perangkat keras (Hardware) dan perangkat lunak(Software).',
                },
                {
                    id:13,
                    question:"Apa kepanjangan dari RJ? Sebutkan pengertiannya!",
                    status:'Valid',
                    kisi:'RJ singkatan dari Register Jack adalah standard peralatan pada jaringan yang mengatur tentang pemasangan kepala konektor dan urutan kabel, yang digunakan untuk menghubungkan 2 atau lebih peralatan telekomunikasi (Telephone Jack) ataupun peralatan jaringan (Computer Networking).',
                },
                {
                    id:14,
                    question:"Apa yang perlu disiapkan sebelum merakit komputer?",
                    status:'Valid',
                    kisi:'Central Processing Unit (CPU) dan Motherboard, Random Access Memory (RAM), CPU Cooler, Kartu Grafis (VGA card), Power Supply, Kotak Casing, serta Sistem Operasi dan Obeng',
                },
                {
                    id:15,
                    question:"Apakah yang dimaksud komputer terapan jaringan ",
                    status:'Valid',
                    kisi:'Sekelompok komputer rekayasa(terapan) yang saling berhubungan  antara satu dengan lainnya menggunakan protokol komunikasi melalui media komunikasi sehingga dapat saling berbagi informasi, program-program, penggunaan bersama perangkat keras dengan tujuan membawa informasi secara cepat dan tepat dari sisi pengirim (Transmitter) menuju ke sisi penerima (Receiver)',
                },
                {
                    id:16,
                    question:"Apa pengertian dari Mikrokontroler?",
                    status:'Valid',
                    kisi:'Suatu komponen elektronika yang di dalamnya terdapat rangkaian mikroprosesor, memori (RAM/ROM) dan I/O, rangkaian tersebut terdapat dalam level chip atau biasa disebut single chip microcomputer.',
                },
                {
                    id:17,
                    question:"Sebutkan macam-macam mikrokontroler populer!",
                    status:'Valid',
                    kisi:'Mikrokontroler AVR, Mikrokontroler MCS-51, Mikrokontroler PCI, Mikrokontroler ARM',
                },
                {
                    id:18,
                    question:"Apakah yang dimaksud UART ( Universal Asynchronous Receiver Transmisi ) ?",
                    status:'Valid',
                    kisi:'Bagian perangkat keras komputer yang menerjemahkan antara bit-bit paralel data dan bit-bit serial',
                },
                {
                    id:19,
                    question:"Sebutkan jenis-jenis konsentrator!",
                    status:'Valid',
                    kisi:'Hub atau Repeater, Switch, Bridge, Router',
                },
                {
                    id:20,
                    question:"Apakah fungsi dari Router?",
                    status:'Valid',
                    kisi:'Router Berfungsi sebagai penghubung antara dua jaringan ataupun lebih dan meneruskan paket data dari jaringan satu ke jaringan yang lain',
                },
            ]
        },
        {
            id:2,
            matakuliah:"Filsafat Ilmu",
            kodeMatKul:50054102,
            jumlah:40,
            status:'Draft',
            soal:[
                {
                    id:1,
                    question:"Sebutkan cabang filsafat ilmu!",
                    kisi:'Mtafisika, Epistemologi, Aksiologi',
                    status:'Valid',
                },
                {
                    id:2,
                    question:"Dalam filsafat ilmu mempelajari masalah kemanusiaan dalam hidup ini yang meliputi tiga hubungan penting manusia diantaranya:",
                    kisi:'Hibungan manusia dengan keberadaan Tuhan, Hubungan manusia dengan alam semesta dan Hubungan manusia baik secara individu maupun kelompok',
                    status:'Valid',
                },
            ]
        },
        {
            id:3,
            matakuliah:"Perencanaan Pengajaran",
            kodeMatKul:50050182,
            jumlah:40,
            status:'Valid',
            soal:[
                {
                    id:1,
                    question:"Sebutkan 10 komponen proses yang terdapat dalam menyusun perencanaan pembelajaran!!",
                    kisi:'Pengembangan bahan ajar, Analisis Karakteristik Siswa, Analisis pekerjaan, Perumusan tujuan pembelajaran, pengembangan butir tes, pengorganisasian satuan pembelajaran, pengembangan strategi pembelajaran, penilaian pembelajaran, pengembangan strategi pembelajaran ranah motorik, pengembangan sumber belajar ',
                    status:'Valid',
                },
                {
                    id:2,
                    question:"Sebutkan 6 komponen silabus!",
                    kisi:'Kompetensi Dasar, Materi pokok, Pembelajaran, Penilaian, Alokasi waktu, Sumber belajar',
                    status:'Valid',
                },
            ]
        },
    ];

    const existingBankSoal = localStorage.getItem('bankSoal');
    
    if (existingBankSoal) {

      const data = [];

      JSON.parse(existingBankSoal).map((v)=>{
        data.push([v.matakuliah,v.kodeMatKul,v.jumlah,v.status,detail(v.id),edit(v.id)]);
      });
  
      setBankSoal(data)
    }else{

      localStorage.setItem('bankSoal',JSON.stringify(db_banksoal));
      const data = [];

      db_banksoal.map((v)=>{
        data.push([v.matakuliah,v.kodeMatKul,v.jumlah,v.status,detail(v.id),edit(v.id)]);
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
              tableHead={["Mata Kuliah", "Kode Mata Kuliah", "Jumlah Soal", "Status","Detail",'Edit']}
              tableData={bankSoal}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
