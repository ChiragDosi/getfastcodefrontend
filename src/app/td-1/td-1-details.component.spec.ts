import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { TestingModule,EntryComponents } from '../../testing/utils';
import {ITd1,Td1Service, Td1DetailsComponent} from './index';
import { MatDialogRef } from '@angular/material';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { Validators, FormBuilder } from '@angular/forms';


describe('Td1DetailsComponent', () => {
  let component: Td1DetailsComponent;
  let fixture: ComponentFixture<Td1DetailsComponent>;
  let httpTestingController: HttpTestingController;
  let url:string = environment.apiUrl + "/td1/";
    
  let data:ITd1 = {
	  id:1,
        };
  beforeEach(async(() => {
   

    TestBed.configureTestingModule({
      declarations: [
        Td1DetailsComponent       
      ].concat(EntryComponents),
      imports: [TestingModule],
      providers: [
      Td1Service,  
       
       {provide: MatDialogRef, useValue: {close: (dialogResult: any) => { }} },
      ]      
   
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Td1DetailsComponent);
    httpTestingController = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run #ngOnInit()', async () => {
       
    httpTestingController = TestBed.get(HttpTestingController);
    fixture.detectChanges();
   
    const req = httpTestingController.expectOne(req => req.method === 'GET' && req.url === url + data.id).flush(data);   
   
    expect(component.item).toBeTruthy();
    httpTestingController.verify(); 
  });
  it('should run #onSubmit()', async () => {
   
    //component.itemForm=formBuilder.group(data);    && req.url === url + data.id

    const req = httpTestingController.expectOne(req => req.method === 'GET'  && req.url === url + data.id).flush(data);
    fixture.detectChanges();
    ///if(component.per)
    console.log("Hello");
    const result = component.onSubmit(); 
    const req2 = httpTestingController.expectOne(req => req.method === 'PUT'  && req.url === url + data.id).flush(data); 
    httpTestingController.verify();
 
  });

  it('should set associations', async () => {
    component.setAssociations();
    expect(component.associations).toBeDefined();
    expect(component.childAssociations).toBeDefined();
    expect(component.parentAssociations).toBeDefined();
  });

  it('should set item details in form', async () => {
    component.onItemFetched(data);
    expect(component.item).toEqual(data);
    expect(component.itemForm.getRawValue()).toEqual(data);
  });


});
