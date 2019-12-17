import { Component, OnInit, Inject } from '@angular/core';
import { Td1Service } from './td-1.service';
import { ITd1 } from './itd-1';

import { ActivatedRoute,Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Globals, BaseNewComponent, PickerDialogService, ErrorService } from 'fastCodeCore';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GlobalPermissionService } from '../core/global-permission.service';

@Component({
  selector: 'app-td-1-new',
  templateUrl: './td-1-new.component.html',
  styleUrls: ['./td-1-new.component.scss']
})
export class Td1NewComponent extends BaseNewComponent<ITd1> implements OnInit {
  
    title:string = "New Td1";
	constructor(
		public formBuilder: FormBuilder,
		public router: Router,
		public route: ActivatedRoute,
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<Td1NewComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public global: Globals,
		public pickerDialogService: PickerDialogService,
		public dataService: Td1Service,
		public errorService: ErrorService,
		public globalPermissionService: GlobalPermissionService,
	) {
		super(formBuilder, router, route, dialog, dialogRef, data, global, pickerDialogService, dataService, errorService);
	}
 
	ngOnInit() {
		this.entityName = 'Td1';
		this.setAssociations();
		super.ngOnInit();
		this.itemForm = this.formBuilder.group({
		});
		this.checkPassedData();
    }
 		
	 
		setAssociations(){
	  	
			this.associations = [
			];
			this.parentAssociations = this.associations.filter(association => {
				return (!association.isParent);
			});
	
		}  
    
}
