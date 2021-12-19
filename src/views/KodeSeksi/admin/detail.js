import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import Table from "components/Table/Table.js";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "components/CustomInput/CustomInput";
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

export default function DetailSeksiAdmin(params) {

  const classes = useStyles();
  const [seksi,setSeksi] = useState([]);
  const [mahasiswa,setMahasiswa] = useState([]);

  const getId = () => {
    return location.pathname.split("/")[
      location.pathname.split("/").length - 1
    ];
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = ()=>{
    const existingMahasiswa = Cookies.get('mahasiswa');
    const data = [];
    
    JSON.parse(existingMahasiswa).map((v,i)=>{
        data.push([i + 1,v.nim,v.namaLengkap]);
    });

    setMahasiswa(data)
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Detail Data Seksi</h4>
          </CardHeader>
          {
            seksi &&
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["No","Nama Mahasiswa","NIM"]}
                tableData={mahasiswa}
              />
            </CardBody>
          }
        </Card>
      </GridItem>
    </GridContainer>
  );
}
