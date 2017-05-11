import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../models/vehicle';
import { Component, OnInit } from '@angular/core';
@Component({
    templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[];
    makes: KeyValuePair[];
    filter: any = {};

    constructor(private VehicleService: VehicleService) { }
    
    ngOnInit() {
        this.VehicleService.getMakes()
            .subscribe(makes => this.makes = makes);

        this.VehicleService.getVehicles()
            .subscribe(vehicles => this.vehicles = vehicles);
    }

    onFilterChange(){
        this.filter.makeId
    }
}