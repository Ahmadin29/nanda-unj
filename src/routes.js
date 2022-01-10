/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Cookies from 'js-cookie'

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/admin";
import Dosen from "views/Dosen/admin/index";
import Mahasiswa from "views/Mahasiswa/admin/admin";
import MataKuliah from "views/MataKuliah/admin/index";
import Ujian from "views/Ujian/admin/admin";
import SeksiAdmin from "views/KodeSeksi/admin";
import AdminUserGuide from "views/Petunjuk/admin";
import DashboardDosen from "views/Dashboard/dosen";
import MataKuliahDosen from "views/MataKuliah/dosen";
import BankSoalDosen from "views/BankSoal/dosen";
import UjianDosen from "views/Ujian/dosen";
import DashboardMahasiswa from "views/Dashboard/mahasiswa";
import ResultsUjianMahasiswa from "views/Ujian/mahasiswa/results";

const role = Cookies.get('session') && JSON.parse(Cookies.get('session')).role

const adminRoutes = [
  {
    path: "/beranda",
    name: "Beranda",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/"+role,
  },
  {
    path: "/dosen-data",
    name: "Dosen",
    rtlName: "قائمة الجدول",
    icon: "people",
    component: Dosen,
    layout: "/"+role,
  },
  {
    path: "/mahasiswa-data",
    name: "Mahasiswa",
    rtlName: "طباعة",
    icon: "school",
    component: Mahasiswa,
    layout: "/"+role,
  },
  {
    path: "/matakuliah-data",
    name: "Mata Kuliah",
    rtlName: "الرموز",
    icon: "book_open_variant",
    component: MataKuliah,
    layout: "/"+role,
  },
  {
    path: "/seksi-data",
    name: "Kode Seksi",
    rtlName: "الرموز",
    icon: "book_open_variant",
    component: SeksiAdmin,
    layout: "/"+role,
  },
  {
    path: "/ujian",
    name: "Ujian",
    rtlName: "خرائط",
    icon: AssignmentIcon,
    component: Ujian,
    layout: "/"+role,
  },
  {
    path: "/user-guide",
    name: "Petunjuk",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "lan",
    component: AdminUserGuide,
    layout: "/admin",
  },
];

const dosenRoutes = [
  {
    path: "/beranda",
    name: "Beranda",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardDosen,
    layout: "/"+role,
  },
  {
    path: "/matkul-data",
    name: "Data Mata Kuliah",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "book_open_variant",
    component: MataKuliahDosen,
    layout: "/dosen",
  },
  {
    path: "/banksoal-data",
    name: "Data Bank Soal",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "book_open_variant",
    component: BankSoalDosen,
    layout: "/dosen",
  },
  {
    path: "/ujian-data",
    name: "Data Ujian",
    rtlName: "ملف تعريفي للمستخدم",
    icon: AssignmentIcon,
    component: UjianDosen,
    layout: "/dosen",
  },
  {
    path: "/user-guide",
    name: "Petunjuk",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "lan",
    component: AdminUserGuide,
    layout: "/dosen",
  },
]

const MahasiswaRoutes = [
  {
    path: "/beranda",
    name: "Beranda",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardMahasiswa,
    layout: "/"+role,
  },
  {
    path: "/result-ujian",
    name: "Hasil Ujian",
    rtlName: "لوحة القيادة",
    icon: AssignmentIcon,
    component: ResultsUjianMahasiswa,
    layout: "/"+role,
  },
]


export default role == 'admin' ? adminRoutes : role == 'dosen' ? dosenRoutes : MahasiswaRoutes;
