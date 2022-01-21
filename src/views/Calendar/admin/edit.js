import { Button, makeStyles } from "@material-ui/core";
import Table from "components/Table/Table.js";
import Event from "@material-ui/icons/Event";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import RegularButton from "components/CustomButtons/Button";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Swal from 'sweetalert2'
import React, { useEffect, useState } from "react";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Cookies from "js-cookie";
import CustomInput from "components/CustomInput/CustomInput";
const useStyles = makeStyles(styles);

export default function EditCalendarAdmin(params) {

  const [editActive,setEditActive] = useState(0);
  const [editDate,setEditDate] = useState("");
  const [editName,setEditName] = useState("");
  const [editNameStart,setEditNameStart] = useState(false);
  const [editDateStart,setEditDateStart] = useState(false);
  const [schedule,setSchedule] = useState([])

  const classes = useStyles();

  const getSchedule = ()=>{
    const currentSchedule = JSON.parse(localStorage.getItem('schedule'));

    setSchedule(currentSchedule);
  }

  useEffect(()=>{
    getSchedule();
  },[])

  const renderEdit = (value) => {
    return (
      <div>
        {
          editActive == value.id &&
          <div style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            padding:"15px 0px",
            borderBottom:"1px solid #eee"
          }}>
            <CustomInput
              labelText="Tanggal"
              formControlProps={{
                fullWidth: true,
              }}
              style={{
                marginBottom:"0px",
              }}
              inputProps={{
                onChange:(event)=>{
                  setEditDateStart(true)
                  setEditDate(event.target.value)
                },
                value:editDateStart ? editDate : value.date
              }}
            />
            <CustomInput
              labelText="Jadwal"
              formControlProps={{
                fullWidth: true
              }}
              style={{
                marginBottom:"0px"
              }}
              inputProps={{
                onChange:(event)=>{
                  setEditNameStart(true)
                  setEditName(event.target.value)
                },
                value:editNameStart ? editName : value.name
              }}
            />
            <div>
              <Button
                onClick={() => {
                  saveState(value.id)
                }}
                style={{ marginTop: 20,width:"200px" }}
                color="primary"
              >
                Simpan
              </Button>
            </div>
          </div>
        }
        {
          editActive != value.id &&
          <div style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            padding:"15px 0px",
            borderBottom:"1px solid #eee"
          }} >
            <div style={{minWidth:"400px"}} >
              {value.date}
            </div>
            <div style={{maxWidth:"500px",minWidth:"500px"}}>
              {value.name}
            </div>
            <div>
              <Button
                onClick={() => {
                  setEditName(value.name);
                  setEditDate(value.date);
                  setEditActive(value.id)
                }}
                style={{ marginTop: 20 }}
                color="primary"
              >
                Ubah
              </Button>
            </div>
          </div>
        }
      </div>
    )
  }

  const saveState = (id)=>{
    const newData = {
      name:editName,
      date:editDate,
    }

    const data = schedule[id - 1];
    data.name = newData.name;
    data.date = newData.date;

    setSchedule(schedule);
    setEditActive(0);
  }

  const saveSchedule = ()=>{
    localStorage.setItem('schedule',JSON.stringify(schedule));
    Swal.fire({
      title: 'Berhasil!',
      text: 'Berhasil mengubah kalender akademik',
      icon: 'success',
      confirmButtonText: 'Tutup'
    })
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={126}>
        <Card>
          <CardHeader color="primary">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Event
                style={{
                  fontSize: 50,
                  marginRight: 15,
                }}
              />
              <div>
                <h4 className={classes.cardTitleWhite}>Kalender Akademik</h4>
                <p className={classes.cardCategoryWhite}>
                  Kalender Akademik Bulan {new Date().getMonth()}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {
              schedule.map(v=>(
                renderEdit(v)
              ))
            }
            <RegularButton
              onClick={() => (
                saveSchedule()
              )}
              style={{ marginTop: 20 }}
              color="primary"
            >
              Simpan Perubahan Jadwal
            </RegularButton>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
