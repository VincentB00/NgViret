/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TouchBarService } from './touch-bar.service';

describe('Service: TouchBar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TouchBarService]
    });
  });

  it('should ...', inject([TouchBarService], (service: TouchBarService) => {
    expect(service).toBeTruthy();
  }));
});
