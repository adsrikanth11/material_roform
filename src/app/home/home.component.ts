import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  firstFormGroup: any = FormGroup;
  secondFormGroup: any = FormGroup;
  isLinear = false;
  panelOpenState = true;
  acc_condition: string = 'No';
  acc_conditions: string[] = ['Yes', 'No'];
  myaccessories: string = '';
  accessories: string[] = ['Case', 'Battery', 'Charger'];

  warranty_condition: string = 'Out of Warranty';
  warranty_conditions: string[] = ['Warranty', 'Out of Warranty'];

  
  stepperOrientation: Observable<StepperOrientation>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    
  }

}
