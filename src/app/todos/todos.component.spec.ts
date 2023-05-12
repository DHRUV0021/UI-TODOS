import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TODOSComponent } from './todos.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';


describe('TODOSComponent', () => {
  let component: TODOSComponent;
  let fixture: ComponentFixture<TODOSComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TODOSComponent],
      imports: [
        HttpClientModule,
        // ToastrService,
        FormsModule,
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        HttpClient,
        ToastrService
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TODOSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
