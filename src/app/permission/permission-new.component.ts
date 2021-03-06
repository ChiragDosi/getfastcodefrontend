import { Component, OnInit, Inject } from '@angular/core';

import { ActivatedRoute,Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Globals, BaseNewComponent, PickerDialogService, ErrorService } from 'fastCodeCore';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PermissionService } from './permission.service';
import { IPermission } from './ipermission';
import { GlobalPermissionService } from '../core/global-permission.service';

@Component({
  selector: 'app-permission-new',
  templateUrl: './permission-new.component.html',
  styleUrls: ['./permission-new.component.scss']
})
export class PermissionNewComponent extends BaseNewComponent<IPermission> implements OnInit {
  
    title:string = "New Permission";
		constructor(
			public formBuilder: FormBuilder,
			public router: Router,
			public route: ActivatedRoute,
			public dialog: MatDialog,
			public dialogRef: MatDialogRef<PermissionNewComponent>,
			@Inject(MAT_DIALOG_DATA) public data: any,
			public global: Globals,
			public pickerDialogService: PickerDialogService,
			public dataService: PermissionService,
			public errorService: ErrorService,
			public globalPermissionService: GlobalPermissionService,
		) {
			super(formBuilder, router, route, dialog, dialogRef, data, global, pickerDialogService, dataService, errorService);
	  }
 
	ngOnInit() {
		this.entityName = 'Permission';
		this.setAssociations();
		super.ngOnInit();
		this.itemForm = this.formBuilder.group({
			displayName: [''],
			name: ['', Validators.required],
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
