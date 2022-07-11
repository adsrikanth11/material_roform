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
  preview_img: string[] = [];
  upload_img: string[] = [];
  files_length: any = 0;
  file_name: string[] = [];

  stepperOrientation: Observable<StepperOrientation>;

  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.roform = this.fb.group({
      title: [''],
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
      logistic_provider: ['GLS'],
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
              acc_name: ['case'],
              case: [false],
              quantity_name: ['case_quantity'],
              case_quantity: [],
            }),
            this.fb.group({
              acc_name: ['battery'],
              battery: [false],
              quantity_name: ['battery_quantity'],
              battery_quantity: [],
            }),
            this.fb.group({
              acc_name: ['charger'],
              charger: [false],
              quantity_name: ['charger_quantity'],
              charger_quantity: [],
            }),
          ]),
          repair_type: ['Out of Warranty'],
          cost_limit: [],
          preview_img: [],
          warranty_files: []
        })
      ])
    });
    // console.log(this.roform);
  }

  get f(){
    return this.roform.controls.products.controls;
  }

  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      let file_type = event.target.files[0].type;
      // Check file type
      if(file_type === 'image/jpeg' || file_type === 'image/png' || file_type === 'image/gif' || file_type === 'application/pdf') {
        Array.from(event.target.files).forEach((file: any, index: any) => {
          // Upload file limit
          if(index <= 2) {
            this.upload_img.push(file.name);
            this.file_name.push(file.name);
            this.files_length = this.upload_img.length;
            // Upload files
            this.roform.patchValue({
              products: [{
                warranty_files: this.upload_img
              }]
            });
          } 
        });
        for (let i = 0; i < event.target.files.length; i++) {
          var reader = new FileReader();
          // Preview file limit
          if(i <= 2) {
            // Preview files
            reader.onload = (event:any) => {
              this.preview_img.push(event.target.result);
            }
            reader.readAsDataURL(event.target.files[i]);
          }
        }
      } else {
        alert('upload only jpg, png, gif, pdf only');
      }
    } else {
      alert('files/images are required');
    }
  }

  del_img(imgs: any, img: any, index: any) {
    this.preview_img.splice(img, 1);
    let myindex = this.upload_img.indexOf(img);
    if (myindex !== -1) {
      this.upload_img.splice(myindex, 1);
      this.file_name.splice(myindex, 1);
      this.roform.patchValue({
        products: [{
          warranty_files: this.upload_img
        }]
      });
    }
    this.files_length = this.roform.value.products[0].warranty_files.length;
    // console.log(this.roform.value.products[0].warranty_files.length);
    // this.upload_img.splice(img);
    // this.files_length = this.upload_img.length;
    // console.log("images: " + imgs);
    // console.log("image: " + img + " index: " + index);
    // console.log("upload_img_: " + this.upload_img);
    // console.log("files_length: " + this.files_length);
    
    // this.roform.controls.products.controls.warranty_files.splice(img, 1);
    // console.log(this.roform.value.products);
  }

  add_product() {
    let products_array = this.roform.get('products') as FormArray;
    let add_product = this.fb.group({
      tool_type_number: ['', Validators.required],
      tool_name: [''],
      serial_number: [''],
      description: [''],
      acc_condition: ['No'],
      myaccessories: this.fb.array([
        this.fb.group({
          acc_name: ['case'],
          case: [false],
          quantity_name: ['case_quantity'],
          case_quantity: [],
        }),
        this.fb.group({
          acc_name: ['battery'],
          battery: [false],
          quantity_name: ['battery_quantity'],
          battery_quantity: [],
        }),
        this.fb.group({
          acc_name: ['charger'],
          charger: [false],
          quantity_name: ['charger_quantity'],
          charger_quantity: [],
        }),
      ]),
      repair_type: ['Out of Warranty'],
      cost_limit: [],
      preview_img: [],
      warranty_files: []
    })
    products_array.push(add_product);
  }

  del_product(i: any) {
    let products_array = this.roform.get('products') as FormArray;
    products_array.removeAt(i);
  }

  Submit_Roform() {
    console.log(this.roform.value.products);
  }

  resetform() {
    this.roform.reset();
  }
}
