import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/faces/avatar.png";
import DosenProfile from "views/UserProfile/dosen";
import AddMataKuliahDosen from "views/MataKuliah/dosen/add";
import MataKuliahKosekDosen from "views/MataKuliah/dosen/kosek";
import DetailSeksiDosen from "views/KodeSeksi/dosen/detail";
import AddSeksiDosen from "views/KodeSeksi/dosen/add";
import AddBankSoalDosen from "views/BankSoal/dosen/add";
import SoalDosen from "views/BankSoal/dosen/soal";
import AddSoalDosen from "views/BankSoal/dosen/soal/add";
import EditSoalDosen from "views/BankSoal/dosen/soal/edit";
import EditBankSoalDosen from "views/BankSoal/dosen/edit";
import DetailUjianDosen from "views/Ujian/dosen/detail";
import AddUjianDosen from "views/Ujian/dosen/add";
import DetailUjianDosenMahasiswa from "views/Ujian/dosen/ujian";
import ResultUjianDosenMahasiswa from "views/Ujian/dosen/ujian/detail";
import UjianOnProcessDosen from "views/Ujian/dosen/ujian/onprocess";
import DetailUjianFinishedDosen from "views/Ujian/dosen/ujian/detail/finished";
import DetailUjianReadyDosen from "views/Ujian/dosen/ujian/detail/ready";
import DetailUjianHoldDosen from "views/Ujian/dosen/ujian/detail/hold";
import DetailUjianRunningDosen from "views/Ujian/dosen/ujian/detail/running";
import ImportSoalDosen from "views/BankSoal/dosen/soal/import";
import DetailPaketSoalDosen from "views/PaketSoal/dosen/detail";
import SoalPaketSoalDosen from "views/PaketSoal/dosen/paket";
import AddPaketSoalDosen from "views/PaketSoal/dosen/paket/add";
import EditPaketSoalDosen from "views/PaketSoal/dosen/paket/soal";
import EditStatusPaketSoalDosen from "views/PaketSoal/dosen/edit";
import DosenProfileUpdate from "views/UserProfile/dosen/photo";

let ps;

const routerBaseName = process.env.PUBLIC_URL;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/dosen") {
        return (
          <Route
            path={routerBaseName + prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Route path={routerBaseName+"/dosen/profile"} component={DosenProfile} />
    <Route path={routerBaseName+"/dosen/update-photo"} component={DosenProfileUpdate} />
    <Route path={routerBaseName+"/dosen/matkul/add"} component={AddMataKuliahDosen} />
    <Route path={routerBaseName+"/dosen/matkul/:id/kosek/"} component={MataKuliahKosekDosen} />
    <Route path={routerBaseName+"/dosen/matkul/:id/add/"} component={AddSeksiDosen} />
    <Route path={routerBaseName+"/dosen/matkul/kosek-detail"} component={DetailSeksiDosen} />
    <Route path={routerBaseName+"/dosen/bank-soal/add"} component={AddBankSoalDosen} />
    <Route path={routerBaseName+"/dosen/bank-soal/:id/import"} component={ImportSoalDosen} />
    <Route path={routerBaseName+"/dosen/bank-soal/:id/detail/"} component={SoalDosen} />
    <Route path={routerBaseName+"/dosen/bank-soal/edit/"} component={EditBankSoalDosen} />
    <Route path={routerBaseName+"/dosen/bank-soal/:id/add/"} component={AddSoalDosen} />
    <Route path={routerBaseName+"/dosen/bank-soal/:id/edit/"} component={EditSoalDosen} />
    <Route path={routerBaseName+"/dosen/ujian/detail/finished/"} component={DetailUjianFinishedDosen} />
    <Route path={routerBaseName+"/dosen/ujian/detail/ready/"} component={DetailUjianReadyDosen} />
    <Route path={routerBaseName+"/dosen/ujian/detail/hold/"} component={DetailUjianHoldDosen} />
    <Route path={routerBaseName+"/dosen/ujian/detail/running/"} component={DetailUjianRunningDosen} />
    <Route path={routerBaseName+"/dosen/ujian/detail/:id/"} component={DetailUjianDosen} />
    <Route path={routerBaseName+"/dosen/ujian/:id/add/"} component={AddUjianDosen} />
    <Route path={routerBaseName+"/dosen/ujian/:id/detail/:id/result/"} component={ResultUjianDosenMahasiswa} />
    <Route path={routerBaseName+"/dosen/ujian/:id/detail/:id/onprocess/"} component={UjianOnProcessDosen} />
    <Route path={routerBaseName+"/dosen/ujian/:id/detail/:id/"} component={DetailUjianDosenMahasiswa} />
    <Route path={routerBaseName+"/dosen/paket-soal/:id/detail/:id_paket/edit"} component={EditPaketSoalDosen} />
    <Route path={routerBaseName+"/dosen/paket-soal/:id/detail/:id_paket/"} component={SoalPaketSoalDosen} />
    <Route path={routerBaseName+"/dosen/paket-soal/:id/detail/"} component={DetailPaketSoalDosen} />
    <Route path={routerBaseName+"/dosen/paket-soal/:id/edit/"} component={EditStatusPaketSoalDosen} />
    <Route path={routerBaseName+"/dosen/paket-soal/:id/add/"} component={AddPaketSoalDosen} />
    <Redirect from="/dosen" to="/dosen/beranda" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("green");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/dosen/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Dosen"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}