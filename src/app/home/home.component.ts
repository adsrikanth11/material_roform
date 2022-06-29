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
  acc_conditions: string = 'No';
  myaccessory = [
    {
      name: ['case'],
      check: [true],
      quantity_name: ['case_quantity'],
      quantity: [1]
    },
    {
      name: ['battery'],
      check: [false],
      quantity_name: ['battery_quantity'],
      quantity: [2]
    },
    {
      name: ['charger'],
      check: [true],
      quantity_name: ['charger_quantity'],
      quantity: [3]
    },
  ]
  repair_type: string = 'Out of Warranty';
  logistic_provider: string = 'GLS';
  urls: any = [];
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  fileAttr = 'Choose File';
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      // this.fileAttr = '';
      // Array.from(imgFile.target.files).forEach((file: any) => {
      //   this.fileAttr += file.name + ' - ';
      // });
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        this.urls.push(e.target.result);
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      // this.fileAttr = 'Choose File';
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
      products: this.fb.array([
        this.fb.group({
          tool_type_number: ['', Validators.required],
          tool_name: [''],
          serial_number: [''],
          description: [''],
          acc_condition: ['No'],
          myaccessories: this.fb.array([
            this.fb.group({
              name: ['case'],
              check: [true],
              quantity_name: ['case_quantity'],
              quantity: []
            }),
            this.fb.group({
              name: ['battery'],
              check: [true],
              quantity_name: ['battery_quantity'],
              quantity: []
            }),
            this.fb.group({
              name: ['charger'],
              check: [true],
              quantity_name: ['charger_quantity'],
              quantity: []
            }),
          ]),
          repair_type: ['Out of Warranty'],
          cost_limit: [],
          warranty_files: []
        })
      ])
    });
    console.log(this.roform);
  }

  add_product() {
    let products_array = this.roform.get('products') as FormArray;
    let add_product = this.fb.group({
        tool_type_number: [''],
        tool_name: [''],
        serial_number: [''],
        description: [''],
        acc_condition: ['No'],
        myaccessories: this.fb.array([
          this.fb.group({
            name: ['case'],
            check: [true],
            quantity_name: ['case_quantity'],
            quantity: ['11']
          }),
          this.fb.group({
            name: ['battery'],
            check: [true],
            quantity_name: ['battery_quantity'],
            quantity: ['22']
          }),
          this.fb.group({
            name: ['charger'],
            check: [true],
            quantity_name: ['charger_quantity'],
            quantity: ['33']
          }),
        ]),
        repair_type: ['Out of Warranty'],
        cost_limit: [''],
        warranty_files: []
      })
    products_array.push(add_product);
  }

  del_product(i: any) {
    let products_array = this.roform.get('products') as FormArray;
    products_array.removeAt(i);
  }

  uploadfile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const files = event.target.files;
      this.fileAttr = '';
      Array.from(event.target.files).forEach((file: any) => {
        this.fileAttr += file.name;
        let products_array = this.roform.products.get('warranty_files') as FormArray;
        products_array.push(file.name);
      });
      for (let index = 0; index < files.length; index++) {
        const element = files[index];
        // console.log(element.name);
        // this.fileAttr += element.name;
        let reader = new FileReader();

        reader.readAsDataURL(files[index]);

        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
      }
    } else {
      this.fileAttr = 'Choose file';
    }
  }

  remove_img(url: any) {
    this.urls.splice(url);
  }

  Submit_Roform() {
    console.log(this.roform.value);
  }

  resetform() {
    this.roform.reset();
  }
}
