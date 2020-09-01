import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/forapis.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  Allproducts : any[];
  deleteids= [];
  categoryarr=[];
  subcategoryarr=[];
  statusarr=[];
  brandarr=[];
  vendorarr=[];
  salesarr=[];
  img1 = false;
  img2 = false;
  img3 = false;
  img4 = false;
  image_id= 0;
  prod : any;
  show = false;
  constructor(private router: Router,private fb: FormBuilder,private applicationSevice: ApplicationService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group ({
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      title: ['', Validators.required],
      quantity: ['', Validators.required],
      warranty: ['', Validators.required],
      status: ['', Validators.required],
      brand: ['', Validators.required],
      vendor: ['', Validators.required],
      sale: [null, Validators.required],
      purchaseprice: ['', Validators.required],
      sellingprice: ['', Validators.required],
      productdescription: ['', Validators.required],
      image_1: ['', Validators.required],
      image_2: ['', Validators.required],
      image_3: ['', Validators.required],
      image_4: ['', Validators.required],
    });
    this.applicationSevice.getallproducts().subscribe(products => {
      this.Allproducts = products;
    });
    this.applicationSevice.getallcategories().subscribe(catres => {
      this.categoryarr=catres;
    });
    this.applicationSevice.getallbrands().subscribe(brandres => {
      this.brandarr=brandres;
    });
    this.applicationSevice.getallstatus().subscribe(statusres => {
      this.statusarr=statusres;
    });
    this.applicationSevice.getallvendors().subscribe(vendorres => {
      this.vendorarr=vendorres;
    });
    this.applicationSevice.getallsales().subscribe(salesres => {
      this.salesarr=salesres;
    });
  }
  onrowclick(id: any) {
    this.prod = this.Allproducts[id];
    this.productForm.controls['category'].setValue(this.prod.category_id);
    this.productForm.controls['subcategory'].setValue(this.prod.subcategory_id);
    this.productForm.controls['title'].setValue(this.prod.title);
    this.productForm.controls['quantity'].setValue(this.prod.available_quantity);
    this.productForm.controls['productdescription'].setValue(this.prod.description);
    this.productForm.controls['brand'].setValue(this.prod.brand_id);
    this.productForm.controls['vendor'].setValue(this.prod.vendor_id);
    this.productForm.controls['status'].setValue(this.prod.status_id);
    this.productForm.controls['purchaseprice'].setValue(this.prod.purchase_price);
    this.productForm.controls['sellingprice'].setValue(this.prod.sell_price);
    this.productForm.controls['warranty'].setValue(this.prod.warranty);
    this.productForm.controls['sale'].setValue(this.prod.sale_id);
    this.applicationSevice.getsubcategory(this.prod.category_id).subscribe(subcat => {
      this.subcategoryarr= subcat;
    })
    this.applicationSevice.getproductimage(this.prod.id).subscribe(imgs => {
      this.image_id = imgs[0].id;
    })
    this.show=true;
  }
  saveimage1(e) {
    this.productForm.controls['image_1'].setValue(e.target.files[0]);
    this.img1 =true;
  }
  saveimage2(e) {
    this.productForm.controls['image_2'].setValue(e.target.files[0]);
    this.img2 =true;
  }
  saveimage3(e) {
    this.productForm.controls['image_3'].setValue(e.target.files[0]);
    this.img3 =true;
  }
  saveimage4(e) {
    this.productForm.controls['image_4'].setValue(e.target.files[0]);
    this.img4 =true;
  }
  routetoaddproduct() {
    this.router.navigate(['/addproduct']);
  }
  editproduct() {
    if(this.productForm.get('category').errors || this.productForm.get('subcategory').errors || this.productForm.get('title').errors || this.productForm.get('quantity').errors || this.productForm.get('warranty').errors || this.productForm.get('status').errors || this.productForm.get('brand').errors || this.productForm.get('vendor').errors || this.productForm.get('purchaseprice').errors || this.productForm.get('sellingprice').errors || this.productForm.get('productdescription').errors) {
      this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Fill the complete data', '', {
        disableTimeOut: true,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' +  'center'
      }); 
    } else {
      let count = 0;
      if(this.img1) {
        this.applicationSevice.saveimage(this.productForm.get('image_1').value, this.prod.id).subscribe();
        this.applicationSevice.updateimage(this.image_id,this.productForm.get('image_1').value, this.prod.id).subscribe();
      }
      if(this.img2) {
        count = count + 1;
        this.applicationSevice.saveimage(this.productForm.get('image_2').value, this.prod.id).subscribe();
        this.applicationSevice.updateimage(this.image_id + count ,this.productForm.get('image_2').value, this.prod.id).subscribe();
      }
      if(this.img3) {
        count = count + 1;
        this.applicationSevice.saveimage(this.productForm.get('image_3').value, this.prod.id).subscribe();
        this.applicationSevice.updateimage(this.image_id + count,this.productForm.get('image_3').value, this.prod.id).subscribe();
      }
      if(this.img4) {
        count = count + 1;
        this.applicationSevice.saveimage(this.productForm.get('image_4').value, this.prod.id).subscribe();
        this.applicationSevice.updateimage(this.image_id + count,this.productForm.get('image_4').value, this.prod.id).subscribe();
      }
      this.applicationSevice.editproduct(this.productForm.get('sale').value,this.prod.id,this.productForm.get('category').value,this.productForm.get('subcategory').value,this.productForm.get('brand').value,this.productForm.get('vendor').value,this.productForm.get('title').value,this.productForm.get('status').value,this.productForm.get('quantity').value,this.productForm.get('warranty').value,this.productForm.get('purchaseprice').value,this.productForm.get('sellingprice').value,this.productForm.get('productdescription').value).subscribe();
      this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Added.', '', {
        disableTimeOut: true,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' +  'center'
      }); 
      this.applicationSevice.getallproducts().subscribe(products => {
        this.Allproducts = products;
      });
      this.productForm.controls['category'].setValue(this.prod.category_id);
      this.productForm.controls['subcategory'].setValue(this.prod.subcategory_id);
      this.productForm.controls['title'].setValue(this.prod.title);
      this.productForm.controls['quantity'].setValue(this.prod.available_quantity);
      this.productForm.controls['productdescription'].setValue(this.prod.description);
      this.productForm.controls['brand'].setValue(this.prod.brand_id);
      this.productForm.controls['vendor'].setValue(this.prod.vendor_id);
      this.productForm.controls['status'].setValue(this.prod.status_id);
      this.productForm.controls['purchaseprice'].setValue(this.prod.purchase_price);
      this.productForm.controls['sellingprice'].setValue(this.prod.sell_price);
      this.productForm.controls['warranty'].setValue(this.prod.warranty);
      this.productForm.controls['sale'].setValue(this.prod.sale_id);
      // this.applicationSevice.getallcategories().subscribe(catres => {
      //   this.categoryarr=catres;
      // });
      // this.applicationSevice.getallbrands().subscribe(brandres => {
      //   this.brandarr=brandres;
      // });
      // this.applicationSevice.getallstatus().subscribe(statusres => {
      //   this.statusarr=statusres;
      // });
      // this.applicationSevice.getallvendors().subscribe(vendorres => {
      //   this.vendorarr=vendorres;
      // });
      // this.applicationSevice.getallsales().subscribe(salesres => {
      //   this.salesarr=salesres;
      // });
    }
  }
  addproduct(e) {
    // console.log(e.target.value);
    let i = e.target.value;
    let index = this.deleteids.indexOf(i);
    if(index==-1) {
      this.deleteids.push(i);
    } else {
      this.deleteids.splice(index,1);
    }
    // console.log(this.deleteids);
    this.applicationSevice.productids.next(this.deleteids);
  }
  deleteproducts() {
    if(this.deleteids.length > 0) {
      for (let i = 0;i<this.deleteids.length;i++) {
        this.applicationSevice.deleteproduct(this.deleteids[i]).subscribe(res => {
            this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Deleted.', '', {
              disableTimeOut: true,
              enableHtml: true,
              closeButton: true,
              toastClass: "alert alert-danger alert-with-icon",
              positionClass: 'toast-' + 'top' + '-' +  'center'
            });
            this.applicationSevice.getallproducts().subscribe(products => {
              this.Allproducts = products;
            });
        });
      }
    } else {
      this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> No Product Selected', '', {
        disableTimeOut: true,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' +  'center'
      });
    }
  }
  disableproducts() {
    if(this.deleteids.length > 0) {
      for (let i = 0;i<this.deleteids.length;i++) {
        this.applicationSevice.disableproduct(this.deleteids[i]).subscribe(res => {
            this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Disabled.', '', {
              disableTimeOut: true,
              enableHtml: true,
              closeButton: true,
              toastClass: "alert alert-danger alert-with-icon",
              positionClass: 'toast-' + 'top' + '-' +  'center'
            });
            this.applicationSevice.getallproducts().subscribe(products => {
              this.Allproducts = products;
            });
        });
      }
    } else {
      this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> No Product Selected', '', {
        disableTimeOut: true,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' +  'center'
      });
    }
  }
}
