import React, { useEffect, useState } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import AssignmentIcon from "@material-ui/icons/Assignment";
import Event from "@material-ui/icons/Event";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Button from "components/CustomButtons/Button.js";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const useStyles = makeStyles(styles);

export default function UjianRunningMahasiswa() {
    const classes = useStyles();


    const [soal,setSoal] = useState();
    const [selectedSoal,setSelectedSoal] = useState();
    const [ujian,setUjian] = useState();
    const [time,setTime] = useState('');
    const [showSoal,setShowSoal] = useState(true);
    const [answer,setAnswer] = useState('');
    const [answered,setAnswered] = useState([]);

    const generateUjian = ()=>{
        const data = {
            name:'FILSAFAT ILMU',
            year:'2021',
        }

        setUjian(data);
    }

    const getMatkul = ()=>{
        return location.pathname.split("/")[
          location.pathname.split("/").length - 1
        ].replace('-',' ');
    }

    const getData = ()=>{

        const currentSoal = JSON.parse(localStorage.getItem('bankSoal'));

        const selected = currentSoal.filter(v=>{
            return v.matakuliah == getMatkul();
        })

        console.log(selected);

        const data = [
            {
                no:1,
                question:'Sebutkan 3 cici-ciri filsafat ilmu!',
                answer:'Berpikir secara sitematik, Kritik atau analitik, Deskriptif',
                image:false
            },
            {
                no:2,
                question:'Sebutkan cabang-cabang Filsafat Ilmu!',
                answer:'Metafisika, Epistemologi, Aksiologi',
                image:true
            },
            {
                no:3,
                question:'Dalam filsafat ilmu mempelajari masalah kemanusiaan dalam hidup ini yang meliputi tiga hubungan penting manusia diantaranya:',
                answer:'Hubungan manusia dengan keberadaan Tuhan, Hubungan manusia dengan alam semesta, Hubungan manusia dengan baik secara individu maupun kelompok',
                image:false
            },
            {
                no:4,
                question:'Sebutkan nama tokoh-tokoh logika modern beserta tahunnya!',
                answer:'Petrus Hispanus 1210-1278, Roger Bacon 1214-1292, Raymundus Lullus 1232-1315, William Ocham 1295-1349',
                image:false
            },
            {
                no:5,
                question:'Sebutkan teori kebenaran yang berkaitan dengan pengembangan ilmu!',
                answer:'Empiris, Rasional, Ilmiah, Intuitif',
                image:false
            },
        ];

        selected[0]?.soal.map((v,i)=>{
            v.no = i + 1
        })

        setSoal(selected[0]?.soal);
        setSelectedSoal(selected[0]?.soal[0]);
    }

    useEffect(()=>{
        getData();
        generateUjian();
        timer();
    },[])

    const timer = ()=>{
        const count = new Date().setHours(new Date().getHours() + 1);

        const timer = setInterval(() => {
            // Get todays date and time
            let now = new Date().getTime();
            
            // Find the distance between now an the count down date
            let distance = count - now;
            
            // Time calculations for days, hours, minutes and seconds
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (hours < 10) {
                hours = "0"+hours
            }

            if (minutes < 10) {
                minutes = "0"+minutes
            }

            if (seconds < 10) {
                seconds = "0"+seconds
            }
            
            // Output the result in an element with id="demo"

            setTime(hours+':'+minutes+":"+seconds);
            
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(timer);
                setTime("00:00:00");
            }
        }, 1000);
    }

    const navigateSoal = (no)=>{

        if (no <= soal.length && no >= 1) {

            if (answer != '') {

                const answerData = {
                    no:selectedSoal.no,
                    answer:answer,
                }

                const check = answered.filter(v=>{
                    return v.no == selectedSoal.no
                })

                if (check.length > 0) {
                    const filtered = answered.filter(v=>{
                        return v.no != selectedSoal.no
                    })

                    const data = [...filtered,answerData];
                    setAnswered(data);
                }else{
                    const data = [...answered,answerData];
                    setAnswered(data);
                }

                setAnswer('')
            }

            const selected = soal.filter(v=>{
                return v.no == no
            })
    
            setSelectedSoal(selected[0]);
            getAnswer(selected[0]);
        }

    }

    const renderSoal = ()=>{

        return(
            soal?.map((v,i)=>{

                const isAnswered = answered.filter(val=>{
                    return val.no == v.no
                })

                return(
                    <div style={{
                        width:"10%",
                        marginRight:10,
                        marginBottom:10,
                        height:50,
                        background:selectedSoal?.no == v.no ? "#eee" : isAnswered.length > 0 ? "#53AF50" : "#fff",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        border:'1px solid #ddd',
                        borderRadius:10,
                    }} >
                        {v.no}
                    </div>
                )
            })
        )
    }

    const getAnswer = (selected)=>{
        const answerData = answered.filter(val=>{
            return val.no == selected.no
        })

        if (answerData.length > 0) {
            setAnswer(answerData[0]?.answer)
        }

    }

    const finishing = ()=>{
        Swal.fire({
            title: 'Yakin kamu ingin menyelesaikan ujian?',
            showCancelButton: true,
            confirmButtonText: 'Ya, Lanjutkan',
            icon:'question'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Berhasil!', 'Data ujian berhasil disimpan', 'success');

              setTimeout(() => {
                  location.href = '/mahasiswa/beranda'
              }, 1000);
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={showSoal ? 8 : 12}>
                    <Card>
                        <CardBody>

                            <div style={{
                                display:"flex",
                                flexDirection:"column",
                                justifyContent:"center",
                                alignItems:"center",
                                marginTop:50,
                                paddingBottom:50,
                                marginBottom:20,
                                borderBottom:"1px solid #ddd",
                            }} >
                                <span>Soal Ujian</span>
                                <span style={{
                                    fontSize:20,
                                    fontWeight:700,
                                }} >{ujian?.name}</span>
                            </div>

                            <div style={{
                                display:"flex",
                                flexDirection:"row",
                                justifyContent:"space-between",
                                alignItems:"center",
                                paddingBottom:20,
                                marginBottom:20,
                                borderBottom:"1px solid #ddd",
                            }} >
                                <span style={{
                                    fontSize:20,
                                    padding:10,
                                    background:"#eee"
                                }} >No {selectedSoal?.no}</span>
                                <span style={{
                                    fontSize:20,
                                    padding:10,
                                    fontWeight:700,
                                    border:"1px solid #000"
                                }} id="timer" >{time}</span>
                            </div>

                            <div style={{
                                display:"flex",
                                flexDirection:"column",
                                paddingBottom:20,
                                marginBottom:20,
                                borderBottom:"1px solid #ddd",
                            }} >
                                {
                                    selectedSoal?.photo &&
                                    <img src={selectedSoal?.photo} style={{width:"100%",maxHeight:300,objectFit:"contain"}} />
                                }
                                <span style={{
                                    fontSize:20,
                                    marginBottom:20,
                                }} >{selectedSoal?.question} ...</span>
                                <textarea
                                    style={{
                                        minWidth:"99%",
                                        maxWidth:"99%",
                                        background:'#efefef',
                                        border:"0px",
                                        padding:10,
                                        marginBottom:20,
                                    }}
                                    rows={10}
                                    onChange={(e)=>{
                                        setAnswer(e.target.value);
                                    }}
                                    value={answer}
                                ></textarea>
                                {
                                    selectedSoal?.has_image && <>
                                        <p>Masukan jawaban bergambar</p>
                                        <input type="file"/>
                                    </>
                                }
                            </div>
                            <div style={{
                                display:"flex",
                                flexDirection:"row",
                                justifyContent:"space-between",
                                alignItems:"center",
                            }} >
                                <Button onClick={()=>navigateSoal(selectedSoal?.no - 1)} color="success">Sebelumnya</Button>
                                {
                                    selectedSoal?.no != soal?.length &&
                                    <Button onClick={()=>navigateSoal(selectedSoal?.no + 1)} color="success">Selanjutnya</Button>
                                }
                                {
                                    selectedSoal?.no == soal?.length &&
                                    <Button onClick={()=>finishing()} color="success">Selesaikan</Button>
                                }
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                {
                    showSoal &&
                    <GridItem xs={12} sm={12} md={4}>
                        <Card>
                            <CardBody>
                                <div style={{
                                    display:"flex",
                                    flexDirection:"column"
                                }} >
                                    <span style={{
                                        fontSize:20,
                                        fontWeight:700,
                                        marginBottom:20,
                                        paddingBottom:20,
                                        borderBottom:"1px solid #ddd"
                                    }} >Daftar Soal</span>
                                    <div style={{
                                        display:"flex",
                                        flexDirection:"row",
                                        flexWrap:"wrap",
                                        marginBottom:20,
                                        paddingBottom:20,
                                        borderBottom:"1px solid #ddd"
                                    }} >
                                        {renderSoal()}
                                    </div>
                                    <Button onClick={()=>finishing()} color="success">Selesaikan</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </GridItem>
                }
            </GridContainer>
        </div>
    );
}
