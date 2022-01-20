import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Play from "@material-ui/icons/PlayArrow";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Icon, IconButton } from "@material-ui/core";

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

export default function UjianAdmin() {
  const classes = useStyles();

  const detail = (status,id)=>{

    let link = '/admin/ujian-detail/';

    if (status == 'Selesai') {
      link = link+'finished';
    }else if (status == 'Soal Siap') {
      link = link+'ready/'+id;
    }else if (status == 'Sedang Dikerjakan'){
      link = link+'running'
    }else{
      link = link+'hold'
    }

    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={()=>location.href=link}
      >
        <Icon color="green">book</Icon>
      </IconButton>
    )
  }

  const [tokenData,setTokenData] = useState([]);
  
  const token = (i,id,val)=>{
    if (val.is_active) {
      if(val.status == 'Selesai'){
        return(
          <div>
            {tokenData[i][id].map(v=>{
              return(
                <p>{v}</p>
              )
            })}
          </div>
        )
      }else{
        return(
          <div>
            {tokenData[i][id].map(v=>{
              return(
                <p>{v}</p>
              )
            })}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={()=>refreshToken(i,id)}
            >
              <Icon color="green">refresh</Icon>
            </IconButton>
          </div>
        )
      }
    }else{
      return(
        <div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>activate_ujian(i,id)}
          >
            <Play/>
          </IconButton>
        </div>
      )
    }
  }

  const activate_ujian = (id_paket,id_ujian)=>{
    
    const newData = [];

    ujian.map((v,i)=>{
      if (i == id_paket) {
        v.ujian[id_ujian].is_active = true;
        v.ujian[id_ujian].status = 'Akan Dimulai';
      }

      newData.push(v);
    })

    setUjian(newData);
    localStorage.setItem('dataUjian',JSON.stringify(newData));
  }

  const refreshToken = (i,id)=>{

    const data = []

    tokenData.map((v,index)=>{ 
      if(index == i){

        const dataToken = [];

        for (let index = 0; index < 5; index++) {
          dataToken.push(Math.floor(100000000 + Math.random() * 900000000))
        }

        v[id] = dataToken
        data.push(v);
      }else{
        data.push(v)
      }
    })

    setTokenData(data)
  }

  const [ujian,setUjian] = useState([]);

  const generateDatabase = ()=>{
    const db_ujian = [
      {
          id:1,
          matkul:{
              id:1,
              namaMatkul:'Filsafat Ilmu',
              kodeMatKul:'00052002',
              kodeSeksi : '1512600059',
          },
          ujian:[
              {
                  id:1,
                  namaUjian:"Quiz",
                  tanggal:"5 Oktober 2021",
                  waktu:"08:00 - 09:50",
                  lamaUjian:"60 Menit",
                  is_active:true,
                  status:'Selesai',
                  banksoal:{
                      id:1,
                  }
              }, 
              {
                  id:2,
                  namaUjian:"UTS",
                  tanggal:"12 Oktober 2021",
                  waktu:"08:00 - 09:50",
                  lamaUjian:"60 Menit",
                  is_active:true,
                  status:'Selesai',
                  banksoal:{
                      id:1,
                  }
              },
              {
                  id:3,
                  namaUjian:"UAS",
                  tanggal:"23 Desember 2021",
                  waktu:"08:00 - 09:50",
                  status:'Selesai',
                  is_active:true,
                  lamaUjian:"60 Menit",
                  banksoal:{
                      id:1,
                  }
              }
          ],
      },
      {
          id:2,
          matkul:{
              id:1,
              namaMatkul:'Komunikasi Data',
              kodeMatKul:'00051132',
              kodeSeksi : '1512600068',
          },
          ujian:[
              {
                  id:1,
                  namaUjian:"Quiz",
                  tanggal:"12 Oktober 2021",
                  is_active:true,
                  waktu:"10:00 - 11:50",
                  lamaUjian:"60 Menit",
                  status:'Selesai',
                  banksoal:{
                      id:1,
                  }
              }, 
              {
                  id:2,
                  namaUjian:"UTS",
                  tanggal:"5 Oktober 2021",
                  is_active:true,
                  waktu:"10:00 - 11:50",
                  lamaUjian:"60 Menit",
                  status:'Selesai',
                  banksoal:{
                      id:1,
                  }
              },
              {
                  id:3,
                  namaUjian:"UAS",
                  tanggal:"23 Desember 2021",
                  waktu:"10:00 - 11:50",
                  status:'Akan Dimulai',
                  is_active:false,
                  lamaUjian:"60 Menit",
                  banksoal:{
                      id:1,
                  }
              }
          ],
      },
      {
        id:3,
        matkul:{
            id:1,
            namaMatkul:'Jaringan Komputer', 
            kodeMatKul:'152350213',
            kodeSeksi : '1512600077',
        },
        ujian:[
              {
                id:1,
                namaUjian:"Quiz",
                tanggal:"5 Oktober 2021",
                is_active:true,
                waktu:"13:00 - 15:50",
                lamaUjian:"60 Menit",
                status:'Selesai',
                banksoal:{
                    id:1,
                }
            },
            {
                id:2,
                namaUjian:"UTS",
                tanggal:"12 Oktober 2021",
                is_active:true,
                waktu:"13:00 - 15:50",
                lamaUjian:"60 Menit",
                status:'Selesai',
                banksoal:{
                    id:1,
                }
            },
            {
                id:3,
                namaUjian:"UAS",
                tanggal:"23 Desember 2021",
                waktu:"13:00 - 15:50",
                is_active:false,
                status:'Soal Siap',
                lamaUjian:"60 Menit",
                banksoal:{
                    id:1,
                }
            }
        ],
      },
      {
        id:4,
        matkul:{
            id:1,
            namaMatkul:'Interaksi Manusia dan Komputer', 
            kodeMatKul:'00052122',
            kodeSeksi : '1000000147',
        },
        ujian:[
              {
                id:1,
                namaUjian:"Quiz",
                tanggal:"6 Oktober 2021",
                waktu:"13:00 - 15:50",
                lamaUjian:"60 Menit",
                is_active:true, 
                status:'Selesai',
                banksoal:{
                    id:1,
                }
            },
          {
                id:2,
                namaUjian:"UTS",
                tanggal:"13 Oktober 2021",
                waktu:"13:00 - 15:50",
                lamaUjian:"60 Menit",
                is_active:true, 
                status:'Selesai',
                banksoal:{
                    id:1,
                }
            },
            {
                id:3,
                namaUjian:"UAS",
                tanggal:"24 Desember 2021",
                waktu:"13:00 - 15:50",
                is_active:false, 
                status:'Sedang Dikerjakan',
                lamaUjian:"60 Menit",
                banksoal:{
                    id:1,
                }
            }
        ],
      },
    ];

    const existingUjian = localStorage.getItem('dataUjian');
    
    if (existingUjian) {
      setUjian(JSON.parse(existingUjian));

      const newData = [];

      tokenData.map(v=>{
        newData.push(v);
      })

      JSON.parse(existingUjian).map(v=>{

        const listToken = [];
        
        v.ujian.map(v=>{

          let token_list = []

          for (let index = 0; index < 5; index++) {
            token_list.push(Math.floor(100000000 + Math.random() * 900000000));
          }

          listToken.push(token_list)
        })

        newData.push(listToken);
      })

      setTokenData(newData)

    }else{
      localStorage.setItem('dataUjian',JSON.stringify(db_ujian));

      const data = [];
      const newData = [];

      tokenData.map(v=>{
        newData.push(v);
      })

      db_ujian.map(v=>{
        data.push(v);

        const listToken = []

        v.ujian.map(val=>{

          let token_list = []

          for (let index = 0; index < 5; index++) {
            token_list.push(Math.floor(100000000 + Math.random() * 900000000));
          }

          listToken.push(token_list)
        })

        newData.push(listToken)
      });

      setTokenData(newData);

      setUjian(data)
    }
  }

  const generateDatabasePaket = ()=>{
    const db_banksoal = [
        {
            id:1,
            matakuliah:"Jaringan Komputer",
            kodeMatKul:52350113,
            kodeSeksi:12313123,
            jenisUjian:'UTS',
            status:'Sedang Dikerjakan',
            paket:[
                {
                    id:1,
                    name:'Paket A',
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
                    name:'Paket B',
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
                    id:3,
                    name:'Paket C',
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
                    id:4,
                    name:'Paket D',
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
                    id:5,
                    name:'Paket E',
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
                }
            ]
        },
    ];

    const existingBankSoal = localStorage.getItem('paketSoal');
    
    if (!existingBankSoal) {
        localStorage.setItem('paketSoal',JSON.stringify(db_banksoal));
    }
  }

  useEffect(()=>{
      generateDatabase();
      generateDatabasePaket();
  },[])

  const renderUjian = (v,i)=>{
    return(
      v.ujian.map((val,id)=>{
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
              minWidth:100/7+"%",
              maxWidth:100/7+"%"
            }} >
              {v.matkul.namaMatkul} - {val.namaUjian}
            </div>
            <div style={{
              minWidth:100/6+"%",
              maxWidth:100/7+"%"
            }} >
              {v.matkul.kodeMatKul}
            </div>
            <div style={{
              minWidth:100/6+"%",
              maxWidth:100/7+"%"
            }} >
              {v.matkul.kodeSeksi}
            </div>
            <div style={{
              minWidth:100/6+"%",
              maxWidth:100/7+"%"
            }} >
              {val.status}
            </div> 
            <div style={{
              minWidth:100/6+"%",
              maxWidth:100/7+"%"
            }} >
              {token(i,id,val)}
            </div>
            <div style={{
              minWidth:100/6+"%",
              maxWidth:100/7+"%"
            }} >
              {detail(val.status,val.banksoal.id)}
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
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Data Mata Kuliah</h4>
            <p className={classes.cardCategoryWhite}>
              Data List Mata Kuliah
            </p>
          </CardHeader>
          <CardBody>
            <div style={{
              paddingTop:10,
              paddingBottom:10,
              borderBottom:"1px solid #eee",
              display:"flex",
              flexDirection:"row",
              alignItems:"center"
            }} >
                <div style={{
                  minWidth:100/7+"%",
                  maxWidth:100/7+"%"
                }} >
                  Nama Mata Kuliah
                </div>
                <div style={{
                  minWidth:100/6+"%",
                  maxWidth:100/7+"%"
                }} >
                  Kode Matkul
                </div>
                <div style={{
                  minWidth:100/6+"%",
                  maxWidth:100/7+"%"
                }} >
                  Kode Seksi
                </div>
                <div style={{
                  minWidth:100/6+"%",
                  maxWidth:100/7+"%"
                }} >
                  Status
                </div>
                <div style={{
                  minWidth:100/6+"%",
                  maxWidth:100/7+"%"
                }} >
                  Token
                </div>
                <div style={{
                  minWidth:100/6+"%",
                  maxWidth:100/7+"%"
                }} >
                  Detail
                </div>
            </div>
            {
              ujian.map((v,i)=>renderUjian(v,i))
            }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
