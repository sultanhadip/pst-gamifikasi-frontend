import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { Home } from './pages/home/home';
import { Auth } from './pages/auth/auth';
import { Learning } from './pages/learning/learning';
import { Publikasi } from './pages/publikasi/publikasi';
import { PublikasiDetail } from './pages/publikasi-detail/publikasi-detail';
import { Brs } from './pages/brs/brs';
import { Peringkat } from './pages/peringkat/peringkat';
import { Misi } from './pages/misi/misi';
import { Profil } from './pages/profil/profil';
import { Admin } from './pages/admin/admin';

export const routes: Routes = [
    // Public Routes (with Header/Footer)
    {
        path: '',
        component: MainLayout,
        children: [
            { path: '', component: Home },
            { path: 'login', component: Auth },
            { path: 'register', component: Auth }
        ]
    },
    // Dashboard Routes (with Sidebar)
    {
        path: '',
        component: DashboardLayout,
        children: [
            { path: 'learning', component: Learning },
            { path: 'publikasi', component: Publikasi },
            { path: 'publikasi/:id', component: PublikasiDetail },
            { path: 'brs', component: Brs },
            { path: 'peringkat', component: Peringkat },
            { path: 'misi', component: Misi },
            { path: 'profil', component: Profil },
            { path: 'admin', component: Admin }
        ]
    }
];
