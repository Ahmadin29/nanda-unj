import React, { useEffect, useRef, useState } from "react";
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
import * as XLSX from 'xlsx';
import SeksiTemplate from '../../../assets/seksi-template.csv';
import CardFooter from "components/Card/CardFooter";
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

export default function ImportSeksiAdmin() {
  const classes = useStyles();

  const [fileAvailable,setFileAvailable] = useState(false);
  const [column,setColumn] = useState([]);
  const [data,setData] = useState([]);
  const [listData,setListData] = useState([]);
  
  const downloadFile = ()=>{
    location.href=SeksiTemplate
  };

  const file = useRef();

  const openReader = ()=>{
    file.current.click();
  }

  const handleFileUpload = (e)=>{

    setFileAvailable(true);

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  }

  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
 
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
 
        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columns = headers.map(c => (c));
    const data = list.map(v=>([v.kodeSeksi,v.namaMataKuliah,v.dosen,v.sks,v.jenisMatkul]));
    
    setColumn(columns);
    setData(data);
    setListData(list);
  }

  const upload = ()=>{
    const recentSeksi = JSON.parse(Cookies.get('kodeSeksi'));
    const lastId = recentSeksi[recentSeksi.length - 1].id;

    const uploaded = listData.map((v,i)=>({
      id:lastId + i + 1,
      kodeSeksi:v.kodeSeksi,
      dosen:v.dosen,
      sks:v.sks,
      jenisMatkul:v.jenisMatkul,
      mataKuliah:{
        name:v.namaMataKuliah
      }
    }))
    
    const newData = [...recentSeksi,...uploaded];

    Cookies.set('kodeSeksi',JSON.stringify(newData));

    Swal.fire({
      title: 'Berhasil!',
      text: 'Berhasil menambahkan data seksi',
      icon: 'success',
      confirmButtonText: 'Tutup'
    });

    setFileAvailable(false);
    setColumn([]);
    setData([]);
    setListData([]);
  }

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
              }} >Daftar Data Seksi</span>
              <div>
                <Button onClick={()=>downloadFile()} color="primary">Download Template</Button>
                <Button onClick={()=>openReader()} color="success">Import Data Seksi</Button>
                <input type="file" accept=".csv" style={{visibility:"hidden",position:"absolute"}} ref={file} onChange={handleFileUpload} />
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      {
      fileAvailable &&
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Data Seksi</h4>
              <p className={classes.cardCategoryWhite}>
                Data Seksi Kuliah
              </p>
            </CardHeader>
            <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={column}
                  tableData={data}
                />
            </CardBody>
            <CardFooter>
              <Button onClick={()=>upload()} color="success">Tambahkan Data Seksi</Button>
            </CardFooter>
          </Card>
        </GridItem>
      }
    </GridContainer>
  );
}