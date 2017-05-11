import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../models/vehicle';
import { Component, OnInit } from '@angular/core';
@Component({
    templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[];
    allVehicles: Vehicle[];
    makes: KeyValuePair[];
    filter: any = {};

    constructor(private VehicleService: VehicleService) { }
    
    ngOnInit() {
        this.VehicleService.getMakes()
            .subscribe(makes => this.makes = makes);

        this.VehicleService.getVehicles()
            .subscribe(vehicles => this.vehicles = this.allVehicles = vehicles);
    }

    onFilterChange(){
        var vehicles = this.allVehicles;
        
        if(this.filter.makeId)
            vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);
        
        if(this.filter.modelId)
            vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);
            
        this.vehicles = vehicles;
    }

    resetFilter(){
        this.filter ={};
        this.onFilterChange();
    }
}