import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { Td1Service } from './td-1.service';
import { ITd1 } from './itd-1';
import { PickerDialogService, ErrorService } from 'fastCodeCore';


import { BaseDetailsComponent, Globals } from 'fastCodeCore';
import { GlobalPermissionService } from '../core/global-permission.service';

@Component({
  selector: 'app-td-1-details',
  templateUrl: './td-1-details.component.html',
  styleUrls: ['./td-1-details.component.scss']
})
export class Td1DetailsComponent extends BaseDetailsComponent<ITd1> implements OnInit {
	title:string='Td1';
	parentUrl:string='td1';
	//roles: IRole[];  
	constructor(
		public formBuilder: FormBuilder,
		public router: Router,
		public route: ActivatedRoute,
		public dialog: MatDialog,
		public global: Globals,
		public dataService: Td1Service,
		public pickerDialogService: PickerDialogService,
		public errorService: ErrorService,
		public globalPermissionService: GlobalPermissionService,
	) {
		super(formBuilder, router, route, dialog, global, pickerDialogService, dataService, errorService);
  }

	ngOnInit() {
		this.entityName = 'Td1';
		this.setAssociations();
		super.ngOnInit();
		this.itemForm = this.formBuilder.group({
			id: [{value: '', disabled: true}, Validators.required],
			
	    });
	    if (this.idParam) {
			this.getItem(this.idParam).subscribe(x=>this.onItemFetched(x),error => this.errorMessage = <any>error);
	    }
  }
  
  
	setAssociations(){
  	
		this.associations = [
		];
		
		this.childAssociations = this.associations.filter(association => {
			return (association.isParent);
		});

		this.parentAssociations = this.associations.filter(association => {
			return (!association.isParent);
		});
	}

	onItemFetched(item:ITd1) {
		this.item = item;
		this.itemForm.patchValue({
			id: item.id,
		});
	}
}
