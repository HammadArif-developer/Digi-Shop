import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/forapis.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  productForm: FormGroup;
  categoryForm: FormGroup;
  subcategoryForm: FormGroup;
  brandForm: FormGroup;
  vendorForm: FormGroup;
  categoryarr=[];
  subcategoryarr=[];
  statusarr=[];
  salearr=[];
  brandarr=[];
  vendorarr=[];
  showsizes=[];
  sizetypes = ['sml','inches'];
  sizes = [['small','medium','large'],['10','11','12','13','14','15','17']];
  addcategory=false;
  addsubcategory=false;
  addbrand=false;
  addvendor=false;
  constructor(private router: Router,private fb: FormBuilder,private applicationSevice: ApplicationService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group ({
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      title: ['', Validators.required],
      quantity: ['', Validators.required],
      warranty: ['', Validators.required],
      status: ['', Validators.required],
      sale: ['', Validators.required],
      brand: ['', Validators.required],
      vendor: ['', Validators.required],
      purchaseprice: ['', Validators.required],
      sellingprice: ['', Validators.required],
      productdescription: ['', Validators.required],
      sizetype: [null],
      size: [null],
      image_1: ['', Validators.required],
      image_2: ['', Validators.required],
      image_3: ['', Validators.required],
      image_4: ['', Validators.required],
    });
    this.categoryForm = this.fb.group ({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.subcategoryForm = this.fb.group ({
      title: ['', Validators.required],
      category: ['', Validators.required],
    });
    this.brandForm = this.fb.group ({
      title: ['', Validators.required],
    });
    this.vendorForm = this.fb.group ({
      name: ['', Validators.required],
      number: ['', Validators.required],
      contactpersonname: ['', Validators.required],
      contactpersonnumber: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.applicationSevice.getallcategories().subscribe(catres => {
      this.categoryarr=catres;
    })
    this.applicationSevice.getallbrands().subscribe(brandres => {
      this.brandarr=brandres;
    })
    this.applicationSevice.getallstatus().subscribe(statusres => {
      this.statusarr=statusres;
    })
    this.applicationSevice.getallvendors().subscribe(vendorres => {
      this.vendorarr=vendorres;
    })
    this.applicationSevice.getallsales().subscribe(sales => {
      this.salearr = sales;
    })
  }
  saveimage1(e) {
    this.productForm.controls['image_1'].setValue(e.target.files[0]);
  }
  saveimage2(e) {
    this.productForm.controls['image_2'].setValue(e.target.files[0]);
  }
  saveimage3(e) {
    this.productForm.controls['image_3'].setValue(e.target.files[0]);
  }
  saveimage4(e) {
    this.productForm.controls['image_4'].setValue(e.target.files[0]);
  }
  toaddcategory() {
    this.addcategory=true;
    this.addsubcategory=false;
    this.addbrand=false;
    this.addvendor=false;
  }
  toaddsubcategory() {
    this.addcategory=false;
    this.addsubcategory=true;
    this.addbrand=false;
    this.addvendor=false;
  }
  toaddbrand() {
    this.addcategory=false;
    this.addsubcategory=false;
    this.addbrand=true;
    this.addvendor=false;
  }
  toaddvendor() {
    this.addcategory=false;
    this.addsubcategory=false;
    this.addbrand=false;
    this.addvendor=true;
  }

  updatesubcat() {
    this.applicationSevice.getsubcategory(this.productForm.get('category').value).subscribe(subcat => {
      this.subcategoryarr= subcat;
    })
  }
  updateshowsize() {
    this.showsizes=this.sizes[this.productForm.get('sizetype').value];
    let index =this.productForm.get('sizetype').value;
    this.productForm.controls['sizetype'].setValue(this.sizetypes[index]);
    console.log(this.productForm.get('sizetype').value);
  }
  onsubmitcategory() {
    if(this.categoryForm.get('title').errors || this.categoryForm.get('description').errors) {
      this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Fill the complete data', '', {
        disableTimeOut: true,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' +  'center'
      }); 
    } else {
      this.applicationSevice.addcategory(this.categoryForm.get('title').value,this.categoryForm.get('description').value).subscribe(res => {
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Added.', '', {
          disableTimeOut: true,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'center'
        }); 
        this.applicationSevice.getallcategories().subscribe(catres => {
          this.categoryarr=catres;
        })
      });
    }
  }
  onsubmitsubcategory() {
    if(this.subcategoryForm.get('title').errors || this.subcategoryForm.get('category').errors) {
      this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Fill the complete data', '', {
        disableTimeOut: true,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' +  'center'
      }); 
    } else {
      this.applicationSevice.addsubcategory(this.subcategoryForm.get('title').value,this.subcategoryForm.get('category').value).subscribe(res => {
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Added.', '', {
          disableTimeOut: true,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'center'
        }); 
      });
    }
  }
  onsubmitbrand() {
    if(this.brandForm.get('title').errors) {
      this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Fill the complete data', '', {
        disableTimeOut: true,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' +  'center'
      }); 
    } else {
      this.applicationSevice.addbrand(this.brandForm.get('title').value).subscribe(res => {
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Added.', '', {
          disableTimeOut: true,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'center'
        });
        this.applicationSevice.getallbrands().subscribe(brandres => {
          this.brandarr=brandres;
        })
      });
    }
  }
  onsubmitvendor() {
    this.applicationSevice.addvendor(this.vendorForm.get('name').value,this.vendorForm.get('number').value,this.vendorForm.get('contactpersonname').value,this.vendorForm.get('contactpersonnumber').value,this.vendorForm.get('address').value).subscribe(res => {
      this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Added.', '', {
        disableTimeOut: true,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' +  'center'
      });
      this.applicationSevice.getallvendors().subscribe(vendorres => {
        this.vendorarr=vendorres;
      })
    })
  }
  onsubmit() {
    console.log(this.productForm.get('category').errors,this.productForm.get('subcategory').errors,this.productForm.get('title').errors,this.productForm.get('quantity').errors,this.productForm.get('warranty').errors,this.productForm.get('status').errors,this.productForm.get('brand').errors,this.productForm.get('vendor').errors,this.productForm.get('purchaseprice').errors,this.productForm.get('sellingprice').errors,this.productForm.get('productdescription').errors,this.productForm.get('image_1').errors,this.productForm.get('image_2').errors,this.productForm.get('image_3').errors,this.productForm.get('image_4').errors)
    if(this.productForm.get('category').errors || this.productForm.get('subcategory').errors || this.productForm.get('title').errors || this.productForm.get('quantity').errors || this.productForm.get('warranty').errors || this.productForm.get('status').errors || this.productForm.get('brand').errors || this.productForm.get('vendor').errors || this.productForm.get('purchaseprice').errors || this.productForm.get('sellingprice').errors || this.productForm.get('productdescription').errors || this.productForm.get('image_1').errors || this.productForm.get('image_2').errors || this.productForm.get('image_3').errors || this.productForm.get('image_4').errors) {
      this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Fill the complete data', '', {
        disableTimeOut: true,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' +  'center'
      }); 
    } else {
      this.applicationSevice.insertnewproduct(this.productForm.get('category').value,this.productForm.get('subcategory').value,this.productForm.get('brand').value,this.productForm.get('vendor').value,this.productForm.get('title').value,this.productForm.get('status').value,this.productForm.get('sale').value,this.productForm.get('quantity').value,this.productForm.get('warranty').value,this.productForm.get('purchaseprice').value,this.productForm.get('sellingprice').value,this.productForm.get('productdescription').value,this.productForm.get('sizetype').value,this.productForm.get('size').value).subscribe(res => {
        this.applicationSevice.getprodmaxid().subscribe(res => {
          var maxid: number = +res[0].id;
          this.applicationSevice.saveimage(this.productForm.get('image_1').value, maxid).subscribe();
          this.applicationSevice.insertimage(this.productForm.get('image_1').value, maxid).subscribe();
          this.applicationSevice.saveimage(this.productForm.get('image_2').value, maxid).subscribe();
          this.applicationSevice.insertimage(this.productForm.get('image_2').value, maxid).subscribe();
          this.applicationSevice.saveimage(this.productForm.get('image_3').value, maxid).subscribe();
          this.applicationSevice.insertimage(this.productForm.get('image_3').value, maxid).subscribe();
          this.applicationSevice.saveimage(this.productForm.get('image_4').value, maxid).subscribe();
          this.applicationSevice.insertimage(this.productForm.get('image_4').value, maxid).subscribe();
          this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Added.', '', {
            disableTimeOut: true,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: 'toast-' + 'top' + '-' +  'center'
          }); 
          this.router.navigate(['/product']);
        });
      });
    }
  }
}
