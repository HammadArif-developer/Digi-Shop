import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/forapis.service';
import { ToastrService } from 'ngx-toastr';
import { SlicePipe } from '@angular/common';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  filterForm: FormGroup;
  Allorders : any[];
  OrderedProducts: any[];
  Productinfo = [];
  orderids= [];
  order: any;
  show = false;
  constructor(private router: Router,private fb: FormBuilder,private applicationSevice: ApplicationService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group ({
      delivery_date: ['']
    });
    this.applicationSevice.getallorders().subscribe(orders => {
      this.Allorders = orders;
    });
  }
  addfilter(e) {
    console.log('yes');
    this.Allorders = [];
    let filterdate = this.filterForm.get('delivery_date').value;
    console.log(filterdate);
    this.applicationSevice.getallorders().subscribe(orders => {
      // this.Allorders = orders;
      for(let i=0;i<orders.length;i++) {
          if(orders[i].order_delivery_date==filterdate) {
            this.Allorders.push(orders[i]);
          }
      }
    });
  }
  onrowclick(id: any) {
    this.Productinfo = [];
    this.order = this.Allorders[id];
    this.applicationSevice.getorderedproducts(this.order.id).subscribe(orderedproducts => {
      this.OrderedProducts = orderedproducts;
      for(let i =0;i<this.OrderedProducts.length;i++) {
        this.applicationSevice.getproductdetails(this.OrderedProducts[i].product_id).subscribe(prod => {
          let price = this.OrderedProducts[i].quantity * prod[0].sell_price;
          if(prod[0].sale_id != null) {
            this.applicationSevice.singlesale(prod[0].sale_id).subscribe(ressale => {
              if(ressale[0].discount>0) {
                let per = ressale[0].discount / 100;
                let discount = prod[0].sell_price * per;
                let saleprice=prod[0].sell_price - discount;
                saleprice = saleprice * this.OrderedProducts[i].quantity;
                this.Productinfo.push({'title': prod[0].title,'price': saleprice});
              } else {
                this.Productinfo.push({'title': prod[0].title,'price': price});
              }
            })
          } else {
            this.Productinfo.push({'title': prod[0].title,'price': price});
          }
        })
      }
    })
    this.show=true;
  }
  adddatefilter(e) {
    console.log(e.target.value);
  }
  addorder(e) {
    let i = e.target.value;
    let index = this.orderids.indexOf(i);
    if(index==-1) {
      this.orderids.push(i);
    } else {
      this.orderids.splice(index,1);
    }
    console.log(this.orderids);
  }
  dispatch() {
    for(let i=0;i<this.orderids.length;i++) {
      this.applicationSevice.updateorderstatus(this.orderids[i],'dispatched').subscribe(res => {
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Updated.', '', {
          disableTimeOut: true,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'center'
        });
        this.applicationSevice.getallorders().subscribe(orders => {
          this.Allorders = orders;
          this.orderids=[];
        });
      });
    }
  }
  delivered() {
    for(let i=0;i<this.orderids.length;i++) {
      this.applicationSevice.updateorderstatus(this.orderids[i],'delivered').subscribe(res => {
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successfully Updated.', '', {
          disableTimeOut: true,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'center'
        });
        this.applicationSevice.getallorders().subscribe(orders => {
          this.Allorders = orders;
          this.orderids=[];
        });
      });
    }
  }
  reorder() {
    console.log(this.orderids);
    for(let i=0;i<this.orderids.length;i++) {
      this.applicationSevice.getsingleorder(this.orderids[i]).subscribe(resorder => {
        this.applicationSevice.orderinfo(resorder[0].address,"none",resorder[0].quantity,resorder[0].contact_person,resorder[0].contact_person_number1,resorder[0].contact_person_number2,resorder[0].total_amount,resorder[0].order_code).subscribe(res=>{
          this.applicationSevice.togeordercode().subscribe(orderid => {
            let neworderid = orderid[0].id;
            this.applicationSevice.getorderedproducts(this.orderids[i]).subscribe(orderedproducts => {
              let neworderedproducts = orderedproducts;
              for(let j =0;j<neworderedproducts.length;j++) {
                this.applicationSevice.getproductdetails(neworderedproducts[j].product_id).subscribe(prod => {
                  if(prod[0].available_quantity > neworderedproducts[j].quantity) {
                    let remaining = prod[0].available_quantity - neworderedproducts[j].quantity;
                    this.applicationSevice.reduceprodquantity(neworderedproducts[j].product_id,remaining).subscribe();
                    this.applicationSevice.addorderedproduct(neworderedproducts[j].product_id,neworderid,neworderedproducts[j].quantity).subscribe();
                  } else {
                    this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>One of the Product has finished so it is not added in the order', '', {
                      disableTimeOut: true,
                      enableHtml: true,
                      closeButton: true,
                      toastClass: "alert alert-danger alert-with-icon",
                      positionClass: 'toast-' + 'top' + '-' +  'center'
                    }); 
                  }
                  if(i == neworderedproducts.length - 1 ) {
                    this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Order Placed.', '', {
                      disableTimeOut: true,
                      enableHtml: true,
                      closeButton: true,
                      toastClass: "alert alert-danger alert-with-icon",
                      positionClass: 'toast-' + 'top' + '-' +  'center'
                    });
                    this.applicationSevice.getallorders().subscribe(orders => {
                      this.Allorders = orders;
                      this.orderids=[];
                    });
                  }
                });
              }
            });
          });
        });
      })
    }
  }
}
