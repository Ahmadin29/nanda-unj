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
import Cookies from "js-cookie";
import AdminProfile from "views/UserProfile/admin";
import EditCalendarAdmin from "views/Calendar/admin/edit";
import AddDosenAdmin from "views/Dosen/admin/add";
import EditDosenAdmin from "views/Dosen/admin/edit";
import AddMahasiswaAdmin from "views/Mahasiswa/admin/add";
import EditMahasiswaAdmin from "views/Mahasiswa/admin/edit";
import AddMataKuliahAdmin from "views/MataKuliah/admin/add";
import DetailMatkulAdmin from "views/MataKuliah/admin/detail";
import EditMataKuliahAdmin from "views/MataKuliah/admin/edit";
import DetailSeksiAdmin from "views/KodeSeksi/admin/detail";
import AddSeksiAdmin from "views/KodeSeksi/admin/add";
import EditSeksiAdmin from "views/KodeSeksi/admin/edit";
import DetailUjianAdmin from "views/Ujian/admin/detail";
import ImportDosenAdmin from "views/Dosen/admin/import";
import ImportMahasiswaAdmin from "views/Mahasiswa/admin/import";
import ImportSeksiAdmin from "views/KodeSeksi/admin/import";
import ImportMatkulAdmin from "views/MataKuliah/admin/import";
import DetailUjianFinishedAdmin from "views/Ujian/admin/detail/finished";
import DetailUjianHoldAdmin from "views/Ujian/admin/detail/hold";
import DetailUjianRunningAdmin from "views/Ujian/admin/detail/running";
import DetailUjianReadyAdmin from "views/Ujian/admin/detail/ready";
import SoalPaketSoalAdmin from "views/Ujian/admin/detail/soal";
import AdminProfileUpdate from "views/UserProfile/admin/photo";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Route path="/admin/profile" component={AdminProfile} />
    <Route path="/admin/update-photo" component={AdminProfileUpdate} />
    <Route path="/admin/calendar/edit" component={EditCalendarAdmin} />
    <Route path="/admin/dosen/add" component={AddDosenAdmin} />
    <Route path="/admin/dosen/edit" component={EditDosenAdmin} />
    <Route path="/admin/dosen/import" component={ImportDosenAdmin} />
    <Route path="/admin/mahasiswa/add" component={AddMahasiswaAdmin} />
    <Route path="/admin/mahasiswa/edit" component={EditMahasiswaAdmin} />
    <Route path="/admin/mahasiswa/import" component={ImportMahasiswaAdmin} />
    <Route path="/admin/matkul/add" component={AddMataKuliahAdmin} />
    <Route path="/admin/matkul/detail" component={DetailMatkulAdmin} />
    <Route path="/admin/matkul/edit" component={EditMataKuliahAdmin} />
    <Route path="/admin/matkul/import" component={ImportMatkulAdmin} />
    <Route path="/admin/seksi/detail" component={DetailSeksiAdmin} />
    <Route path="/admin/seksi/add" component={AddSeksiAdmin} />
    <Route path="/admin/seksi/import" component={ImportSeksiAdmin} />
    <Route path="/admin/seksi/edit" component={EditSeksiAdmin} />
    <Route path="/admin/ujian-detail/finished" component={DetailUjianFinishedAdmin} />
    <Route path="/admin/ujian-detail/hold" component={DetailUjianHoldAdmin} />
    <Route path="/admin/paket-soal/:id/detail/:id_paket/" component={SoalPaketSoalAdmin} />
    <Route path="/admin/ujian-detail/ready/:id" component={DetailUjianReadyAdmin} />
    <Route path="/admin/ujian-detail/running" component={DetailUjianRunningAdmin} />
    <Redirect from="/admin" to={'/admin/beranda'} />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {

  const checkSession = ()=>{
    const session = localStorage.getItem('session');
  
    if (session) {
      const role = JSON.parse(session).role

      if (role != 'admin') {
        window.location.href = '/'+role+'/beranda'
      }
    }else{
      window.location.href = '/login'
    }
  }

  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("orange");
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
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {

    checkSession();

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
        logoText={"Admin"}
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
