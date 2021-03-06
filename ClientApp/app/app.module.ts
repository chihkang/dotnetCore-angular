import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { AuthService } from './services/auth.service';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { BrowserXhr } from '@angular/http';
import { PhotoService } from './services/photo.service';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle';
import { PaginationComponent } from './components/shared/pagination.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list';
import * as Raven from 'raven-js';
import { AppErrorHandler } from './app.error-handler';
import { ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
import { UniversalModule } from 'angular2-universal';


import { VehicleService } from './services/vehicle.service';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { AUTH_PROVIDERS } from "angular2-jwt/angular2-jwt";

Raven
    .config('https://5831931939d44e3d94ca87082f034a01@sentry.io/166809')
    .install();

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent,
        AdminComponent
    ],
    imports: [
        ToastyModule.forRoot(),
        FormsModule,
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles/new',component: VehicleFormComponent, canActivate: [AuthGuard]},
            { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [AuthGuard]},
            { path: 'vehicles/:id',component: ViewVehicleComponent},
            { path: 'vehicles',component: VehicleListComponent},
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'admin', component: AdminComponent, canActivate: [ AdminAuthGuard ] },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[
        { provide: ErrorHandler, useClass: AppErrorHandler },
        VehicleService,
        PhotoService,
        AuthService,
        AuthGuard,
        AUTH_PROVIDERS,
        AdminAuthGuard
    ]
})
export class AppModule {
}
