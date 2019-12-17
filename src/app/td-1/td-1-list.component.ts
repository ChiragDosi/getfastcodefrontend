import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { ITd1 } from './itd-1';
import { Td1Service } from './td-1.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Td1NewComponent} from './td-1-new.component';
import { BaseListComponent, Globals, IListColumn, listColumnType, PickerDialogService, ErrorService } from 'fastCodeCore';

import { GlobalPermissionService } from '../core/global-permission.service';

@Component({
  selector: 'app-td-1-list',
  templateUrl: './td-1-list.component.html',
  styleUrls: ['./td-1-list.component.scss']
})
export class Td1ListComponent extends BaseListComponent<ITd1> implements OnInit {

	title:string = "Td1";
	constructor(
		public router: Router,
		public route: ActivatedRoute,
		public global: Globals,
		public dialog: MatDialog,
		public changeDetectorRefs: ChangeDetectorRef,
		public pickerDialogService: PickerDialogService,
		public dataService: Td1Service,
		public errorService: ErrorService,
		public globalPermissionService: GlobalPermissionService,
	) { 
		super(router, route, dialog, global, changeDetectorRefs, pickerDialogService, dataService, errorService)
  }

	ngOnInit() {
		this.setAssociation();
		this.setColumns();
		this.setPrimaryKeys();
		this.setEntityName();
		super.ngOnInit();
	}

	setPrimaryKeys(){
		this.primaryKeys = ["id"];
	}
  
	setEntityName(){
		this.entityName = 'Td1';
	}
  
	setAssociation(){
  	
		this.associations = [
		];
	}
  
  	setColumns(){
  		this.columns = [
    		{
				column: 'id',
				label: 'id',
				sort: false,
				filter: false,
				type: listColumnType.Number
			},
		  	{
				column: 'actions',
				label: 'Actions',
				sort: false,
				filter: false,
				type: listColumnType.String
			}
		];
		this.selectedColumns = this.columns;
		this.displayedColumns = this.columns.map((obj) => { return obj.column });
  	}
  
	addNew() {
		super.addNew(Td1NewComponent);
	}
  
}
