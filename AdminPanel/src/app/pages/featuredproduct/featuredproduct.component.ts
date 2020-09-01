import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/forapis.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-featuredproduct',
  templateUrl: './featuredproduct.component.html',
  styleUrls: ['./featuredproduct.component.scss']
})
export class FeaturedproductComponent implements OnInit {
  addfeaturedproductForm: FormGroup;
  deletefeaturedproductForm: FormGroup;
  productarr=[];
  featuredproductarr=[];
  constructor(private router: Router,private fb: FormBuilder,private applicationSevice: ApplicationService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.addfeaturedproductForm = this.fb.group ({
      product: ['', Validators.required],
    });
    this.deletefeaturedproductForm = this.fb.group ({
      product: ['', Validators.required],
    });
    this.applicationSevice.getallproducts().subscribe(catres => {
      this.productarr=catres;
    });
    this.applicationSevice.getfeaturedproducts().subscribe(prods => {
      this.featuredproductarr=[];
      for (let i=0;i<prods.length;i++) {
        this.applicationSevice.getproductdetails(prods[i].product_id).subscribe(detprods => {
          this.featuredproductarr.push(detprods[0]);
        })
      }
    });
  }
  onsubmitaddfeaturedproduct() {
    this.applicationSevice.getproductdetails(this.addfeaturedproductForm.get('product').value).subscribe(prod => {
      this.applicationSevice.getproductimage(prod[0].id).subscribe(img => {
        this.applicationSevice.addfeaturedproduct(prod[0].id,img[0].image_url).subscribe(res => {
          this.featuredproductarr.push(prod[0]);
          this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Added.', '', {
            disableTimeOut: true,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: 'toast-' + 'top' + '-' +  'center'
          }); 
        });
      })
    })
  }
  onsubmitdeletefeaturedproduct() {
    this.applicationSevice.getproductdetails(this.deletefeaturedproductForm.get('product').value).subscribe(prod => {
      // console.log(prod[0].id);
        this.applicationSevice.deletefeaturedproduct(prod[0].id).subscribe(res => {
          this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Deleted.', '', {
            disableTimeOut: true,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: 'toast-' + 'top' + '-' +  'center'
          });
          this.applicationSevice.getfeaturedproducts().subscribe(prods => {
            this.featuredproductarr=[];
            for (let i=0;i<prods.length;i++) {
              this.applicationSevice.getproductdetails(prods[i].product_id).subscribe(detprods => {
                this.featuredproductarr.push(detprods[0]);
              })
            }
          });
        });
    })
  }
}
