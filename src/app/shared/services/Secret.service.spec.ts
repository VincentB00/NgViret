/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecretService } from './Secret.service';

describe('Service: Secret', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecretService]
    });
  });

  it('should ...', inject([SecretService], (service: SecretService) => {
    expect(service).toBeTruthy();
  }));
});
