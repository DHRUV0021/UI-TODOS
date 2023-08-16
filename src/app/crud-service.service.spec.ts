import { TestBed } from '@angular/core/testing';

import { CrudServiceService } from './crud-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('CrudServiceService', () => {
  let service: CrudServiceService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        HttpClient
      ],
    });
    service = TestBed.inject(CrudServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
