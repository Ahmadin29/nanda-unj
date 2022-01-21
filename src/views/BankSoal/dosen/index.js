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
                    has_image:true,
                    photo:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAGKDAGaAAAFgUlEQVRYw7WXa2wUVRTH/20p7fZBW0p5iAplaUELCqEFlUCMYKwJKMYgaEwIUpQYNCIWRYgvQtTS6AeiKEqIQDBIAEFAEEm1DUVUoIqPVqhCC/IoammhC9vt/vywM7szu7NLLfHMl7n3nP/533vuPefMSHap8wNIoG57pxIYSErZDyCgB8qogTYUeKT+v2C+SlLanqA3v4EBwSdAasAI4CUUcA7wRsiBMbDIjQDQd4M0ogimtkrbMWSgAVzibUIouTIwfc4kJaVIkpT+PTxLiGplkHCo6Wq+uSOydlrYl3jD1xOSAQ5zdzcA1CJJK/ygOEk91kIhAMsQmeMDq9MRg7ojGExIINkrOAm8D4DHSg9QwiQApiDmeQzFWaDE2LUQ4DXjedimsAQaShgbqXj4NM4ISZpmVeTbdt6vGISrWtElfs76Fuig9+9hij7qFjbTs6GecEnxSdKa4DjbK0nFrzWFTI4yE/jVsvDsMaauP0JxX0ARviBgOg0A3GnZaVpO4N3llZRYYZrez8dhC/KRxrBVYSt37TPVgSh6GQN8FFxSQPLOqbsBSP3Wy2gLwJIRQcC91mPIOGyaTaTKARBxbllH7EtqZkJsgCRlvrTbF21JQiS3KN7pkFNH/BMOiJ+nq8vQTTNI8ChZnZabXJs7bxzf9zjAO/8kTLfNxynXwTpze6PlnG8/o16B+fzTfqCRgq1W62nXtYff1X1orjRiqzn2M8TgySlqAFjNuqDxFdIRKpWeag/Vo7zfJWXXei1ep3AaKDYDWypNvhLQnETk1+kWf/hC3iUrdGil0i3lAE8iRM/r1cpm3g0aNzAdgB8sACnvm8Bo0AuSLgLwKMeBQjosTEuCAJu0BSPgjsjo5WS0KyUM4Amqf6aO2cFRPUKU0cLAOhvgsgUAUM4u/PQz9lAGwC5/75eDgFlhAHuxKzNmynGtMwDtvMWOmIBahEjbYAACBWYCzY6A18kx3jI2WXolQJvRKMLqb6g5bbO0AnMPlbwSFdBrpwMA4FkOOwJ6mw08q/J8jChZnhtCR9HdfTo2IP6JyGQrfKbVGZBeETWdB723PwzQ/ZISr1IDchs9IcCtnasbWWMvCC3SNUhm2ophJ2raq9pyjycvjbju1yTje/604IzHllMXmH0256BGRBoPTipaO/jv4ktTPaNaC+rd02I5dqUsdTdUXiaGfOYbdKbPi2bnLkjLO3cszGJx+00fRLoemXlg1qkLVDOOxVyM6v4MM4kLlpQh6cObI22OIcatNh0nJj3X/8S2S3aTFhZwJ9/Z5raTZ71npZKUOWVxhPtDuBD5jZI7c+8DJ8/Giga7GcObzCMxMkFKJWlUYm6ztU0cYbihH7lccbv3cw9z+Tuq+yrG8gptNDGHBEcCSXGDjz7NDG6zWQyYLylhTyDSl1nK7VRYHLfxKmOpjCDcaH5dR5T1obPddekel9f95/BPs/ubwa+wB76acTzPRJ6hOWbYGnkEEb/wqlc96eu2CHAJ1cznLg5Fdf8lBQjxBqv87qbcx2MQJFd5HAjMyrSD0bxN6ABbWUiSQ9f4jQnNA7epjwNBSvWVGATmrX+M+xjjUGbLbHbtLLvU7w/dYf/0OrCV0ZTjjUEQ/WOxzJYh+QiRut5GkP6dz/jBms0kartA0ByWIekbbQQ9DnXYHG2gkIJOE7gc5jK32AgyavwOZ/A504N/AjG/px2entvtxf5Hoh5yByspZMN/JMjZbQ/RwRrf1W5RLZMY3Pkd7Ii8q5N71y9rae/CLbI/PY5qfKyk7ttvy13nj3aBIN6XslwZnW2TcX1KMlre8vk7RZB6QsVd7ccD3dUPXTwVhSCuI+lD80fi2iQhb1H+X5ssBEmn9KD+B7k54yut0XX/HfgvpUkmTvPggOsAAAAASUVORK5CYII=",
                },
                {
                    id:2,
                    question:"Sebutkan macam-macam topologi jaringan komputer yang anda ketahui!",
                    status:'Valid',
                    kisi:'Topologi Bus, Topologi Ring, Topologi Star. topologi Pohon',
                    has_image:false,
                    photo:null,
                },
                {
                    id:3,
                    question:"Dalam filsafat ilmu mempelajari masalah kemanusiaan dalam hidup ini yang meliputi tiga hubungan penting manusia diantaranya:",
                    status:'Valid',
                    kisi:'Lorem Ipsum dolor sit amet consectetur adipsicing',
                    has_image:false,
                    photo:null,
                },
                {
                    id:4,
                    question:"Sebutkan perbedaan antara Software dan Hardware!",
                    status:'Valid',
                    kisi:'Software merupakan kumpulan beberapa perintah yang dieksekusi oleh mesin komputer dalam menjalankan pekerjaannya. Sedangkan hardware adalah perangkat keras komputer atau komponen fisik pada komputer yang digunakan untuk oleh sistem untuk menjalankan suatu perintah yang telah diprogramkan.',
                    has_image:false,
                    photo:null,
                },
                {
                    id:5,
                    question:"Jelaskan yang dimaksud dengan firewall!",
                    status:'Valid',
                    kisi:'Firewall adalah perangkat yang digunakan untuk mengontrol akses terhadap siapapun yang memiliki akses terhadap jaringan privat dari pihak luar.',
                    has_image:false,
                    photo:null,
                },
                {
                    id:6,
                    question:"Apa pengertian topologi jaringan?",
                    status:'Valid',
                    kisi:'Topologi jaringan adalah suatu metode yang memiliki fungsi untuk menghubungkan satu komputer dengan komputer yang lain, yang dilakukannya dapat melalui kabel maupun nirkabel.',
                    has_image:false,
                    photo:null,
                },
                {
                    id:7,
                    question:"Sebutkan macam-macam distro Linux!",
                    status:'Valid',
                    kisi:'Debian, Ubuntu, MX Linux, Fedora, Zorin, Steam, Mint, Linux Console, Elementary',
                    has_image:false,
                    photo:null,
                },
                {
                    id:8,
                    question:"Sebutkan alat yang dibutuhkan sebelum merakit PC atau Komputer!",
                    status:'Valid',
                    kisi:'obeng (+), obeng (-), tang lancip, multimeter (untuk mengukur tegangan), pinset (untuk mencabut jumper) dan gelang anti statik',
                    has_image:false,
                    photo:null,
                },
                {
                    id:9,
                    question:"Apa yang dimaksud hardware komputer yang berfungsi untuk penyimpanan sementara?",
                    status:'Valid',
                    kisi:'RAM',
                    has_image:false,
                    photo:null,
                },
                {
                    id:10,
                    question:"Sebutkan bahan yang perlu disiapkan saat merakit pc atau komputer",
                    status:'Valid',
                    kisi:'Bahan yang perlu disiapkan saat merakit pc yaitu : Motherboard, processor, hardisk, CD/DVD drive, floppy disk, kabel data, kartu memory (RAM), kartu VGA, kartu USB, modem, Casing dan Power Suplay',
                    has_image:false,
                    photo:null,
                },
                {
                    id:11,
                    question:"Sebutkan macam macam standar WLAN IEEE!",
                    status:'Valid',
                    kisi:'802.11, 802.11b, 802.11a, 802.11a, 802.11n, 802.11ac, 802.11ax',
                    has_image:false,
                    photo:null,
                },
                {
                    id:12,
                    question:"Sebutkan Pengertian dari Sistem Operasi pada Komputer!",
                    status:'Valid',
                    kisi:'Perangkat lunak sistem yang mengatur sumber daya dari perangkat keras (Hardware) dan perangkat lunak(Software).',
                    has_image:false,
                    photo:null,
                },
                {
                    id:13,
                    question:"Apa kepanjangan dari RJ? Sebutkan pengertiannya!",
                    status:'Valid',
                    kisi:'RJ singkatan dari Register Jack adalah standard peralatan pada jaringan yang mengatur tentang pemasangan kepala konektor dan urutan kabel, yang digunakan untuk menghubungkan 2 atau lebih peralatan telekomunikasi (Telephone Jack) ataupun peralatan jaringan (Computer Networking).',
                    has_image:false,
                    photo:null,
                },
                {
                    id:14,
                    question:"Apa yang perlu disiapkan sebelum merakit komputer?",
                    status:'Valid',
                    kisi:'Central Processing Unit (CPU) dan Motherboard, Random Access Memory (RAM), CPU Cooler, Kartu Grafis (VGA card), Power Supply, Kotak Casing, serta Sistem Operasi dan Obeng',
                    has_image:false,
                    photo:null,
                },
                {
                    id:15,
                    question:"Apakah yang dimaksud komputer terapan jaringan ",
                    status:'Valid',
                    kisi:'Sekelompok komputer rekayasa(terapan) yang saling berhubungan  antara satu dengan lainnya menggunakan protokol komunikasi melalui media komunikasi sehingga dapat saling berbagi informasi, program-program, penggunaan bersama perangkat keras dengan tujuan membawa informasi secara cepat dan tepat dari sisi pengirim (Transmitter) menuju ke sisi penerima (Receiver)',
                    has_image:false,
                    photo:null,
                },
                {
                    id:16,
                    question:"Apa pengertian dari Mikrokontroler?",
                    status:'Valid',
                    kisi:'Suatu komponen elektronika yang di dalamnya terdapat rangkaian mikroprosesor, memori (RAM/ROM) dan I/O, rangkaian tersebut terdapat dalam level chip atau biasa disebut single chip microcomputer.',
                    has_image:false,
                    photo:null,
                },
                {
                    id:17,
                    question:"Sebutkan macam-macam mikrokontroler populer!",
                    status:'Valid',
                    kisi:'Mikrokontroler AVR, Mikrokontroler MCS-51, Mikrokontroler PCI, Mikrokontroler ARM',
                    has_image:false,
                    photo:null,
                },
                {
                    id:18,
                    question:"Apakah yang dimaksud UART ( Universal Asynchronous Receiver Transmisi ) ?",
                    status:'Valid',
                    kisi:'Bagian perangkat keras komputer yang menerjemahkan antara bit-bit paralel data dan bit-bit serial',
                    has_image:false,
                    photo:null,
                },
                {
                    id:19,
                    question:"Sebutkan jenis-jenis konsentrator!",
                    status:'Valid',
                    kisi:'Hub atau Repeater, Switch, Bridge, Router',
                    has_image:false,
                    photo:null,
                },
                {
                    id:20,
                    question:"Apakah fungsi dari Router?",
                    status:'Valid',
                    kisi:'Router Berfungsi sebagai penghubung antara dua jaringan ataupun lebih dan meneruskan paket data dari jaringan satu ke jaringan yang lain',
                    has_image:false,
                    photo:null,
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
                    has_image:false,
                    photo:null,
                },
                {
                    id:2,
                    question:"Dalam filsafat ilmu mempelajari masalah kemanusiaan dalam hidup ini yang meliputi tiga hubungan penting manusia diantaranya:",
                    kisi:'Hibungan manusia dengan keberadaan Tuhan, Hubungan manusia dengan alam semesta dan Hubungan manusia baik secara individu maupun kelompok',
                    status:'Valid',
                    has_image:false,
                    photo:null,
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
                    has_image:false,
                    photo:null,
                },
                {
                    id:2,
                    question:"Sebutkan 6 komponen silabus!",
                    kisi:'Kompetensi Dasar, Materi pokok, Pembelajaran, Penilaian, Alokasi waktu, Sumber belajar',
                    status:'Valid',
                    has_image:false,
                    photo:null,
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
