import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  roform: any = FormGroup;
  panelOpenState = true;
  acc_condition: string = 'No';
  myaccessories: string = '';
  accessories: string[] = ['Case', 'Battery', 'Charger'];
  warranty_condition: string = 'Out of Warranty';
  logistic_provider: string = 'GLS';

  @ViewChild('fileInput')
  fileInput!: ElementRef;
  fileAttr = 'Choose File';
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }
  
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.roform = this.fb.group({
      title: ['', Validators.required],
      first_last_name: [''],
      mobile_number: [],
      email_address: [''],
      comapany_name: [''],
      reference_number: [],
      vat_id: [],
      town_name: [''],
      street_name: [''],
      house_number: [],
      postal_code: [],
      logistic_provider: [''],
      gls_pickup_date: [],
      dpd_pickup_date: [],
      terms_conditions: [],
      data_protection_notice: [],
      products: new FormArray([
        this.fb.group({
          'tool_type_number': new FormControl('', Validators.required),
          'tool_name': new FormControl(''),
          'serial_number': new FormControl(''),
          'description': new FormControl(''),
          'accessories': new FormControl(''),
          'warranty_condition': new FormControl(''),
          'cost_limit': new FormControl('')
        })
      ])
    });
    console.log(this.roform.value);
    console.log(this.roform.value.products.length);
  }

  add_product() {
    let products_array = this.roform.get('products') as FormArray;
    let add_product = this.fb.group({
      'tool_type_number': new FormControl(''),
      'tool_name': new FormControl(''),
      'serial_number': new FormControl(''),
      'description': new FormControl(''),
      'accessories': new FormControl(''),
      'warranty_condition': new FormControl(''),
      'cost_limit': new FormControl('')
    })
    products_array.push(add_product);
  }

  del_product(i: any) {
    let products_array = this.roform.get('products') as FormArray;
    products_array.removeAt(i);
  }

  Submit_Roform() {
    console.log(this.roform.value);
  }

  resetform() {
    this.roform.reset();
  }
}
