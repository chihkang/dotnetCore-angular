import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../models/vehicle';
import { Component, OnInit } from '@angular/core';
@Component({
    templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[];    
    makes: KeyValuePair[];
    query: any = {};
    columns = [
        {title: 'Id'},
        {title: 'Make', key: 'make', isSortable: true },
        {title: 'Model', key: 'model', isSortable: true },
        {title: 'Contact Name', key: 'contactName', isSortable: true },
        { }
    ];

    constructor(private VehicleService: VehicleService) { }
    
    ngOnInit() {
        this.VehicleService.getMakes()
            .subscribe(makes => this.makes = makes);

        this.populateVehicles();
    }
    private populateVehicles(){
        this.VehicleService.getVehicles(this.query)
            .subscribe(vehicles => this.vehicles = vehicles);
    }
    onFilterChange(){
        // Server Side filter        
        this.populateVehicles();

        // Client Side filter
        // var vehicles = this.allVehicles;
        
        // if(this.filter.makeId)
        //     vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);
        
        // if(this.filter.modelId)
        //     vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);
            
        // this.vehicles = vehicles;
    }

    resetFilter(){
        this.query ={};
        this.onFilterChange();
    }

    sortBy(columnName){
        if(this.query.sortBy === columnName){
            this.query.isSortAscending = !this.query.isSortAscending;
        }else{
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;
        }
        this.populateVehicles();
    }
}