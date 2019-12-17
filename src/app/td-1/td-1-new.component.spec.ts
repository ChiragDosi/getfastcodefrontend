import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule,EntryComponents } from '../../testing/utils';
import {ITd1,Td1Service, Td1NewComponent} from './index';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { Validators, FormBuilder } from '@angular/forms';


describe('Td1NewComponent', () => {
  let component: Td1NewComponent;
  let fixture: ComponentFixture<Td1NewComponent>;
  
  let httpTestingController: HttpTestingController;
  let url:string = environment.apiUrl + '/td1';
  let formBuilder:any = new FormBuilder(); 
    
  let data:ITd1 = {
		id:1,
		    };
  beforeEach(async(() => {
  
    TestBed.configureTestingModule({
      declarations: [
        Td1NewComponent       
      ].concat(EntryComponents),
      imports: [TestingModule],
      providers: [
				Td1Service,
				{ provide: MAT_DIALOG_DATA, useValue: {} },
				{provide: MatDialogRef, useValue: {close: (dialogResult: any) => { }} },
      ]      
   
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Td1NewComponent);
    httpTestingController = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    spyOn(component, 'manageScreenResizing').and.returnValue();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run #onSubmit()', async () => {
   
    component.itemForm=formBuilder.group(data);    
    fixture.detectChanges();
    const result = component.onSubmit(); 
    const req = httpTestingController.expectOne(req => req.method === 'POST' && req.url === url ).flush(data); 
    httpTestingController.verify();
 
  });

  it('should set associations', async () => {
    component.setAssociations();
    expect(component.associations).toBeDefined();
    expect(component.parentAssociations).toBeDefined();
  });
});
