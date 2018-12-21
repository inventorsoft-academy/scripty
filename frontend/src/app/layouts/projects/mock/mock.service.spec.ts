import { TestBed } from '@angular/core/testing';

import { MockService } from './mock.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

describe('MockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockService = TestBed.get(MockService);
    expect(service).toBeTruthy();
  });
});
