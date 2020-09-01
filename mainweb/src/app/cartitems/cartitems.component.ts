import { Component, OnInit, Input} from '@angular/core';
import { ApplicationService } from '../services/application-service.service';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { FormControl , FormGroup, FormBuilder, Validators} from '@angular/forms';
import { SpinnerService } from '../services/spinner.service';
@Component({
  selector: 'app-cartitems',
  templateUrl: './cartitems.component.html',
  styleUrls: ['./cartitems.component.css']
})
export class CartitemsComponent implements OnInit {
  cartproductsids = [];
  cartproducts = [];
  productcost = [];
  productbrand = [];
  subtotal = 0;
  grandtotal = 0;
  state: string;
  country: string;
  address: string;
  coupon: string;
  orderForm: FormGroup;
  notcom = false;
  confirm = false;
  clicked = false;
  justid = [];
  quantity = 0;
  orderCode: string; 
  quantitychoosen= [];
  constructor(private spinnerService: SpinnerService,private fb: FormBuilder,private router: Router, private route: ActivatedRoute,private applicationSevice: ApplicationService) { }
  @Input() isMobile : boolean;
  ngOnInit(): void {
    window.onresize = (evt) => {
      if(window.innerWidth<=770)
      {
        this.isMobile=true;
      }
      if(window.innerWidth>770)
      {
        this.isMobile=false;
      }
    };
    this.orderForm = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      address: ['', Validators.required],
      coupon: [''],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      requestedDay: [''],
      requestedTime: ['']
    })
    // this.cartproducts=this.applicationSevice.products.getValue();
    this.cartproductsids=JSON.parse(sessionStorage.getItem("products"));
    for (let i=0;i< this.cartproductsids.length;i++) {
      this.applicationSevice.getproductbrand(this.cartproductsids[i].id).subscribe(brand => {
        this.productbrand.push(brand[0].title);
      })
      this.applicationSevice.getproductdetails(this.cartproductsids[i].id).subscribe(product => {
        this.cartproducts.push(product);
        if(product[0].sale_id != null) {
          this.applicationSevice.singlesale(product[0].sale_id).subscribe(ressale => {
            if(ressale[0].discount>0) {
              let per = ressale[0].discount / 100;
              let discount = product[0].sell_price * per;
              let newprice = product[0].sell_price - discount;
              product[0].sell_price = newprice;
              this.productcost.push(newprice * this.cartproductsids[i].quantity);
              this.quantitychoosen.push(this.cartproductsids[i].quantity);
            } else {
              this.productcost.push(product[0].sell_price * this.cartproductsids[i].quantity);
              this.quantitychoosen.push(this.cartproductsids[i].quantity);
            }
          })
        } else {
          this.productcost.push(product[0].sell_price * this.cartproductsids[i].quantity);
          this.quantitychoosen.push(this.cartproductsids[i].quantity);
        }
      })
    }
    for(let i=0;i<this.cartproductsids.length;i++){
          this.justid.push(this.cartproductsids[i].id);
          this.quantity = this.quantity + this.cartproductsids[i].quantity;
    }
    this.applicationSevice.togeordercode().subscribe(value => {
      this.orderCode = 'DigiShop_' + value[0].id; 
    })
  }
  checking(i) {
    let newadd = this.quantitychoosen[i] - this.cartproductsids[i].quantity;
    this.quantity= this.quantity + newadd;
    this.cartproductsids[i].quantity = this.quantitychoosen[i];
    this.productcost[i] = this.cartproducts[i][0].sell_price * this.quantitychoosen[i];
    // console.log(this.productcost[i]);
  }
  tohome () {
    this.router.navigate(['/home']);
  }
  calculatetotal() {
    for(let i=0;i< this.productcost.length;i++){ 
      this.subtotal = this.subtotal +  this.productcost[i];
      // this.subtotal += this.productcost[i];
      this.grandtotal = this.subtotal;
    }
    this.clicked = true;
    this.confirm = false;
  }
  orderplaced() {
    if(this.clicked) {
      this.spinnerService.requestStarted();
      if(this.orderForm.get('country').errors?.required || this.orderForm.get('state').errors?.required || this.orderForm.get('address').errors?.required || this.orderForm.get('fullName').errors?.required || this.orderForm.get('phoneNumber').errors?.required) {
        this.notcom=true;
      } else {
        this.notcom=false;
          this.applicationSevice.orderinfo(this.orderForm.get('address').value,JSON.stringify(this.justid),this.quantity,this.orderForm.get('fullName').value,this.orderForm.get('phoneNumber').value,this.orderForm.get('phoneNumber').value,this.grandtotal, this.orderCode).subscribe(res=>{
            this.applicationSevice.togeordercode().subscribe(order => {
              let orderid = order[0].id;
              for(let i=0;i<this.cartproductsids.length;i++) {
                let remaining = this.cartproducts[i][0].available_quantity - this.cartproductsids[i].quantity;
                this.applicationSevice.reduceprodquantity(this.cartproductsids[i].id,remaining).subscribe();
                this.applicationSevice.addorderedproduct(this.cartproductsids[i].id,orderid,this.cartproductsids[i].quantity).subscribe();
                if(i == this.cartproductsids.length - 1 ) {
                  sessionStorage.clear();
                  this.spinnerService.requestEnded();
                  alert('Your Order have been placed!');
                  this.router.navigate(['/home']);
                }
              }
            });
          })
      }
    } else {
      this.confirm = true;
    }
  }
}

