
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Input } from '@angular/core';
import { HttpTestingController } from '@angular/common/http/testing';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Component, Directive, ChangeDetectorRef } from '@angular/core';
import { ITd1, Td1ListComponent, Td1Service } from './index';
import { TestingModule, EntryComponents } from '../../testing/utils';
import { environment } from '../../environments/environment';
import { IAssociationEntry } from 'fastCodeCore';
import { isDefined } from '@angular/compiler/src/util';


@Injectable()
class MockRouter { navigate = () => { }; }

@Injectable()
class MockGlobals { }

@Injectable()
class MockTd1Service { }

@Injectable()
class MockPickerDialogService { }
@Directive({
  selector: '[routerlink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
describe('Td1ListComponent', () => {
  let fixture: ComponentFixture<Td1ListComponent>;
  let component: Td1ListComponent;
  let httpTestingController: HttpTestingController;
  let td1Service: Td1Service;
  let url: string = environment.apiUrl + '/td1';
  let mockGlobal = {
    isSmallDevice$: of({ value: true })
  };
  let data: ITd1[] = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];

  let associations: IAssociationEntry[] = [
    {
      column: [
        {
          key: 'permissionId',
          value: undefined,
          referencedkey: 'id'
        }
      ],
      table: 'table1'
    }
  ]

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        Td1ListComponent
      ].concat(EntryComponents),
      imports: [TestingModule],
      providers: [
        Td1Service,
        ChangeDetectorRef,
      ]

    }).compileComponents();

  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(Td1ListComponent);
    httpTestingController = TestBed.get(HttpTestingController);
    td1Service = TestBed.get(Td1Service);
    component = fixture.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {

    httpTestingController = TestBed.get(HttpTestingController);
    fixture.detectChanges();

    const req = httpTestingController.expectOne(req => req.method === 'GET' && req.url === url).flush(data);

    expect(component.items.length).toEqual(2);
    httpTestingController.verify();
  });


  it('should list items', async () => {

    fixture.detectChanges();
    httpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne(req => req.method === 'GET' && req.url === url).flush(data);

    expect(component.items.length).toEqual(data.length);
    fixture.detectChanges();

    httpTestingController.verify()
  });
  it('should run #addNew()', async () => {
    httpTestingController = TestBed.get(HttpTestingController);
    fixture.detectChanges();
    const req = httpTestingController.expectOne(req => req.method === 'GET' && req.url === url).flush(data);
    fixture.detectChanges();
    const result = component.addNew();
    httpTestingController.verify();
  });

  it('should run #delete()', async () => {

    fixture.detectChanges();
    httpTestingController = TestBed.get(HttpTestingController);

    const req = httpTestingController.expectOne(req => req.method === 'GET' && req.url === url).flush(data);

    const result = component.delete(data[0]);
    const req2 = httpTestingController.expectOne(req => req.method === 'DELETE' && req.url === url + '/' + data[0].id).flush(null);
    expect(component.items.length).toEqual(1);
    //fixture.detectChanges();
    httpTestingController.verify();

  });

  it('should set associations', async () => {
    component.setAssociation();
    expect(component.associations).toBeDefined()
  });

  it('should set entity name', async () => {
    component.setEntityName();
    expect(component.entityName.length).toBeGreaterThan(0);
  });

  it('should set primary keys', async () => {
    component.setPrimaryKeys();
    expect(component.primaryKeys.length).toBeGreaterThan(0);
  });

  it('should set columns', async () => {
    component.setColumns();
    expect(component.columns.length).toBeGreaterThan(0);
    expect(component.selectedColumns.length).toBeGreaterThan(0);
    expect(component.displayedColumns.length).toBeGreaterThan(0);
  });

});
