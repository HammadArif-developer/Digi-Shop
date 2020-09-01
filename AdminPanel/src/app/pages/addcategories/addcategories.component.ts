import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/forapis.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addcategories',
  templateUrl: './addcategories.component.html',
  styleUrls: ['./addcategories.component.scss']
})
export class AddcategoriesComponent implements OnInit {
  addfeaturedcategoryForm: FormGroup;
  deletefeaturedcategoryForm: FormGroup;
  categoryarr=[];
  featuredcategoryarr=[];
  constructor(private router: Router,private fb: FormBuilder,private applicationSevice: ApplicationService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.addfeaturedcategoryForm = this.fb.group ({
      category: ['', Validators.required],
    });
    this.deletefeaturedcategoryForm = this.fb.group ({
      category: ['', Validators.required],
    });
    this.applicationSevice.getallcategories().subscribe(catres => {
      this.categoryarr=catres;
    })
    this.applicationSevice.getfeaturedcategories().subscribe(feacatres => {
      this.featuredcategoryarr = feacatres;
    })
  }
  onsubmitfeaturedcategory() {
    this.applicationSevice.getsubcategory(this.addfeaturedcategoryForm.get('category').value).subscribe(subcat => {
      if(subcat[0] != undefined) {
        this.applicationSevice.getproductinsubcategory(this.addfeaturedcategoryForm.get('category').value,subcat[0].id).subscribe(prod => {
          if(prod[0] != undefined) {
            this.applicationSevice.getproductimage(prod[0].id).subscribe(img => {
              this.applicationSevice.addfeaturedcategory(this.addfeaturedcategoryForm.get('category').value,this.categoryarr[this.addfeaturedcategoryForm.get('category').value - 1].title,img[0].image_url).subscribe(res => {
                this.applicationSevice.getfeaturedcategories().subscribe(feacatres => {
                  this.featuredcategoryarr = feacatres;
                  this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Added.', '', {
                    disableTimeOut: true,
                    enableHtml: true,
                    closeButton: true,
                    toastClass: "alert alert-danger alert-with-icon",
                    positionClass: 'toast-' + 'top' + '-' +  'center'
                  }); 
                })
              });
            })
          } else {
            this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> No Product in this category', '', {
              disableTimeOut: true,
              enableHtml: true,
              closeButton: true,
              toastClass: "alert alert-danger alert-with-icon",
              positionClass: 'toast-' + 'top' + '-' +  'center'
            }); 
          }
        });
      } else {
        this.applicationSevice.getproductincategory(this.addfeaturedcategoryForm.get('category').value).subscribe(prod => {
          if(prod[0] != undefined) {
            this.applicationSevice.getproductimage(prod[0].id).subscribe(img => {
              this.applicationSevice.addfeaturedcategory(this.addfeaturedcategoryForm.get('category').value,this.categoryarr[this.addfeaturedcategoryForm.get('category').value].title,img[0].image_url).subscribe(res => {
                this.applicationSevice.getfeaturedcategories().subscribe(feacatres => {
                  this.featuredcategoryarr = feacatres;
                  this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Added.', '', {
                    disableTimeOut: true,
                    enableHtml: true,
                    closeButton: true,
                    toastClass: "alert alert-danger alert-with-icon",
                    positionClass: 'toast-' + 'top' + '-' +  'center'
                  }); 
                })
              });
            })
          } else {
            this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> No Product in this category', '', {
              disableTimeOut: true,
              enableHtml: true,
              closeButton: true,
              toastClass: "alert alert-danger alert-with-icon",
              positionClass: 'toast-' + 'top' + '-' +  'center'
            }); 
          }
        });
      }
    })
  }
  onsubmitdeletefeaturedcategory() {
    this.applicationSevice.deletefeaturedcategories(this.deletefeaturedcategoryForm.get('category').value).subscribe( res => {
      this.applicationSevice.getfeaturedcategories().subscribe(feacatres => {
        this.featuredcategoryarr = feacatres;
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Category Removed.', '', {
          disableTimeOut: true,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'center'
        });
      });
    });
  }
}
