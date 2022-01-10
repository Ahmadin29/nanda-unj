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
            {tokenData[i][id]}
          </div>
        )
      }else{
        return(
          <div>
            {tokenData[i][id]}
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
        v[id] = Math.floor(100000000 + Math.random() * 900000000)
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
                    id:2,
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
                namaMatkul:'Bahasa Inggris',
                kodeMatKul:'00051132',
                kodeSeksi : '1512600068',
            },
            ujian:[
                {
                    id:1,
                    namaUjian:"UTS",
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
                    namaUjian:"UAS",
                    tanggal:"23 Desember 2021",
                    waktu:"10:00 - 11:50",
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
                  id:2,
                  namaUjian:"UAS",
                  tanggal:"23 Desember 2021",
                  waktu:"13:00 - 15:50",
                  is_active:false,
                  status:'Akan Dimulai',
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
              namaMatkul:'Profesi Pendidik & Tenaga Kependidikan', 
              kodeMatKul:'00052122',
              kodeSeksi : '1000000147',
          },
          ujian:[
              {
                  id:1,
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
                  id:2,
                  namaUjian:"UAS",
                  tanggal:"24 Desember 2021",
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
          id:5,
          matkul:{
              id:1,
              namaMatkul:'Desain Web', 
              kodeMatKul:'52350133',
              kodeSeksi : '1512600079',
          },
          ujian:[
              {
                  id:1,
                  namaUjian:"UTS",
                  tanggal:"14 Oktober 2021",
                  waktu:"09:00 - 11:50",
                  lamaUjian:"60 Menit",
                  is_active:true, 
                  status:'Selesai',
                  banksoal:{
                      id:1,
                  }
              },
              {
                  id:2,
                  namaUjian:"UAS",
                  tanggal:"25 Desember 2021",
                  waktu:"09:00 - 11:50",
                  is_active:false, 
                  status:'Soal Sedang Dikerjakan',
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
          listToken.push(Math.floor(100000000 + Math.random() * 900000000));
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
          listToken.push(Math.floor(100000000 + Math.random() * 900000000));
        })

        newData.push(listToken)
      });

      setTokenData(newData);

      setUjian(data)
    }
  }

  useEffect(()=>{
      generateDatabase()
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
