import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { AuthGuard } from './services/auth-guard.service';
import { IsLoggedInGuardService } from './services/is-logged-in-guard.service';

export const routes: Routes = [{
    path: "login", component: LoginComponent, canActivate: [IsLoggedInGuardService]
},
{
    path: "register", component: RegisterComponent, canActivate: [IsLoggedInGuardService]
},
{
    path: "movies", component: MoviesComponent, canActivate: [AuthGuard]
},
];
