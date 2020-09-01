import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/forapis.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-totalsales',
  templateUrl: './totalsales.component.html',
  styleUrls: ['./totalsales.component.scss']
})
export class TotalsalesComponent implements OnInit {
  Allorders : any[];
  OrderedProducts: any[];
  Productinfo = [];
  order: any;
  show = false;
  genprofit = false;
  Profit = [];
  Total_Profit = 0;
  constructor(private router: Router,private fb: FormBuilder,private applicationSevice: ApplicationService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.applicationSevice.getallorders().subscribe(orders => {
      this.Allorders = orders;
      // for(let id=0;id<this.Allorders.length;id++) {
      //   this.order = this.Allorders[id];
      //   this.applicationSevice.getorderedproducts(this.order.id).subscribe(orderedproducts => {
      //     this.OrderedProducts = orderedproducts;
      //     let profittotal = 0;
      //     for(let i = 0;i<this.OrderedProducts.length;i++) {
      //       this.applicationSevice.getproductdetails(this.OrderedProducts[i].product_id).subscribe(prod => {
      //         let sell = this.OrderedProducts[i].quantity * prod[0].sell_price;
      //         let buy = this.OrderedProducts[i].quantity * prod[0].purchase_price;
      //         let profit = sell - buy;
      //         this.Productinfo.push({'title': prod[0].title,'profit': profit});
      //         console.log(profit);
      //         console.log('check');
      //         profittotal = profittotal + profit;
      //         if(i = this.OrderedProducts.length-1) {
      //           console.log(profittotal);
      //           this.Profit.push(profittotal);
      //           this.Total_Profit = this.Total_Profit + profittotal;       
      //         }
      //       })
      //     }
      //   }); 
      // }
    });
  }
  onrowclick(id: any) {
    this.Total_Profit = 0;
    this.Productinfo = [];
    this.order = this.Allorders[id];
    this.applicationSevice.getorderedproducts(this.order.id).subscribe(orderedproducts => {
      this.OrderedProducts = orderedproducts;
      for(let i =0;i<this.OrderedProducts.length;i++) {
        this.applicationSevice.getproductdetails(this.OrderedProducts[i].product_id).subscribe(prod => {
          let sell = this.OrderedProducts[i].quantity * prod[0].sell_price;
          if(prod[0].sale_id != null) {
            this.applicationSevice.singlesale(prod[0].sale_id).subscribe(ressale => {
              if(ressale[0].discount>0) {
                let per = ressale[0].discount / 100;
                let discount = prod[0].sell_price * per;
                let saleprice=prod[0].sell_price - discount;
                sell = saleprice * this.OrderedProducts[i].quantity;
                let buy = this.OrderedProducts[i].quantity * prod[0].purchase_price;
                let profit = sell - buy;
                this.Total_Profit = this.Total_Profit + profit;
                this.Productinfo.push({'title': prod[0].title,'profit': profit});
              } else {
                let buy = this.OrderedProducts[i].quantity * prod[0].purchase_price;
                let profit = sell - buy;
                this.Total_Profit = this.Total_Profit + profit;
                this.Productinfo.push({'title': prod[0].title,'profit': profit});
              }
            })
          } else {
            let buy = this.OrderedProducts[i].quantity * prod[0].purchase_price;
            let profit = sell - buy;
            this.Total_Profit = this.Total_Profit + profit;
            this.Productinfo.push({'title': prod[0].title,'profit': profit});
          }
        })
      }
    })
    this.show=true;
    this.genprofit = true;
  }
  // generateprofits() {
  //   this.Total_Profit = 0;
  //   for(let id=0;id<this.Allorders.length;id++) {
  //     this.order = this.Allorders[id];
  //     this.applicationSevice.getorderedproducts(this.order.id).subscribe(orderedproducts => {
  //       this.OrderedProducts = orderedproducts;
  //       let profittotal = 0;
  //       for(let i = 0;i<this.OrderedProducts.length;i++) {
  //         this.applicationSevice.getproductdetails(this.OrderedProducts[i].product_id).subscribe(prod => {
  //           let sell = this.OrderedProducts[i].quantity * prod[0].sell_price;
  //           let buy = this.OrderedProducts[i].quantity * prod[0].purchase_price;
  //           let profit = sell - buy;
  //           this.Productinfo.push({'title': prod[0].title,'profit': profit});
  //           console.log(profit);
  //           console.log('check');
  //           profittotal = profittotal + profit;
  //           if(i = this.OrderedProducts.length-1) {
  //             console.log(profittotal);
  //             this.Profit.push(profittotal);
  //             this.Total_Profit = this.Total_Profit + profittotal;       
  //           }
  //         })
  //       }
  //     }); 
  //     if(id == this.Allorders.length-1) {
  //       this.genprofit = true;
  //     }
  //   }
  // }

}
