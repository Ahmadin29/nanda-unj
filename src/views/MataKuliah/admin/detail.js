import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import Table from "components/Table/Table.js";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";

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

export default function DetailMatkulAdmin(params) {

  const classes = useStyles();
  const [matKul,setMatKul] = useState();
  const [seksi,setSeksi] = useState([]);

  const getId = () => {
    return location.pathname.split("/")[
      location.pathname.split("/").length - 1
    ];
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = ()=>{
    const setedMataKuliah = localStorage.getItem('mataKuliah');

    const selected = JSON.parse(setedMataKuliah).filter(v=>{
      return v.id == getId();
    });

    const dataSeksi = [];

    selected[0].seksi.map(v=>{
      const data = [v.kodeSeksi,v.dosen,v.sks,v.semester,v.jenisMatkul];

      dataSeksi.push(data);
    })

    setMatKul(selected[0]);
    setSeksi(dataSeksi);
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Detail Data Mata Kuliah</h4>
          </CardHeader>
          {
            matKul &&
            <CardBody>
              <span>Mata Kuliah</span>
              <h4>{matKul.namaMatKul}</h4>
              <p>{matKul.deskripsi}</p>
              <Table
                tableHeaderColor="primary"
                tableHead={["Kode Seksi","Dosen","Jumlah SKS","Semester","Jenis Mata Kuliah"]}
                tableData={seksi}
              />
            </CardBody>
          }
        </Card>
      </GridItem>
    </GridContainer>
  );
}
