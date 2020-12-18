import { JwtInterceptor } from './jwt-interceptor';
import {TestBed} from '@angular/core/testing';
import {AuthService} from '../services/auth.service';

describe('JwtInterceptor', () => {
  TestBed.configureTestingModule({
    providers:[AuthService]
  })

  /*it('should create an instance', () => {
    expect(new JwtInterceptor()).toBeTruthy();
  });*/
});
