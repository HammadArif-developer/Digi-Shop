import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/forapis.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  Allsales : any[];
  addsale = false;
  saleForm: FormGroup;
  deleteids= [];
  constructor(private router: Router,private fb: FormBuilder,private applicationSevice: ApplicationService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.saleForm = this.fb.group ({
      discount: ['', Validators.required],
      title: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    });
    this.applicationSevice.getallsales().subscribe(sales => {
      this.Allsales = sales;
    });
  }
  toaddsale() {
    this.addsale = true;
  }
  addsaleid(e) {
    let i = e.target.value;
    let index = this.deleteids.indexOf(i);
    if(index==-1) {
      this.deleteids.push(i);
    } else {
      this.deleteids.splice(index,1);
    }
    this.applicationSevice.productids.next(this.deleteids);
  }
  todeletesale() {
    if(this.deleteids.length > 0) {
      for (let i = 0;i<this.deleteids.length;i++) {
        this.applicationSevice.deletesale(this.deleteids[i]).subscribe(res => {
          if(i = this.deleteids.length - 1) {
            this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Deleted.', '', {
              disableTimeOut: true,
              enableHtml: true,
              closeButton: true,
              toastClass: "alert alert-danger alert-with-icon",
              positionClass: 'toast-' + 'top' + '-' +  'center'
            });
            this.applicationSevice.getallsales().subscribe(sales => {
              this.Allsales = sales;
            });
          }
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
  onsubmitaddsale() {
    if(this.saleForm.get('discount').errors || this.saleForm.get('title').errors || this.saleForm.get('start_date').errors || this.saleForm.get('end_date').errors) {
      this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Fill the complete data', '', {
        disableTimeOut: true,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' +  'center'
      }); 
    } else {
      this.applicationSevice.addnewsale(this.saleForm.get('discount').value,this.saleForm.get('title').value,this.saleForm.get('start_date').value,this.saleForm.get('end_date').value).subscribe(res => {
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Added.', '', {
          disableTimeOut: true,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'center'
        });
        this.applicationSevice.getallsales().subscribe(sales => {
          this.Allsales = sales;
        });
      })
    }
  }
}
