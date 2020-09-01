import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { ApplicationService } from '../services/application-service.service';
import { FormControl , FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-category-description',
  templateUrl: './category-description.component.html',
  styleUrls: ['./category-description.component.css']
})
export class CategoryDescriptionComponent implements OnInit {
  laptops = ["../../assets/images/laptop1.jpg", "../../assets/images/laptop2.jpg", "../../assets/images/laptop3.jpg"];
  prod_id: number;
  prod_image= [];
  default_image: string;
  product;
  productsalecheck: any;
  productsaleprice: any;
  checkrel=false;
  relatedproducts = [];
  relatedproductImages = [];
  saleprice = [];
  salecheck = [];
  comments = [];
  prod_rate = 0;
  stars_highlight=[false,false,false,false,false];
  total_reviews=0;
  otherimages = false;
  quantitychoosen = 0;
  commentForm: FormGroup;
  productBrand : string;
  @Input() isMobile : boolean;
  constructor(private router: Router, private route: ActivatedRoute, private applicationSevice: ApplicationService,private fb: FormBuilder,) { }

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
    this.commentForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      comment: ['', [Validators.required, Validators.maxLength(200), Validators.pattern('[a-zA-z ]*')]],
      rating: [0,[Validators.required]]
    })
    let x = this.route.snapshot.paramMap.get('product');
    this.prod_id = +x;
    this.applicationSevice.getprodrating(this.prod_id).subscribe(ratings => {
      let avg_rate = 0;
      this.total_reviews = ratings.length;
      for(let i=0;i<ratings.length;i++) {
        let ra = +ratings[i].stars;
        avg_rate = avg_rate + ra;
        if(i == ratings.length - 1) {
          this.prod_rate = avg_rate/ratings.length;
          for(let j=0;j<this.prod_rate;j++) {
            this.stars_highlight[j]=true;
          }
        }
      }
    })
    this.applicationSevice.getproductimage(this.prod_id).subscribe(img => {
      if(img.length>1) {
        this.otherimages = true;
      }
      for(let i=1;i<img.length;i++) {
        this.prod_image.push('http://localhost/api/images/' + img[i].image_url);
      }
      this.default_image = 'http://localhost/api/images/' + img[0].image_url;
    });
    this.applicationSevice.productcomments(this.prod_id).subscribe(com => {
      this.comments = com;
    })
    this.applicationSevice.getproductdetails(this.prod_id).subscribe(prod => {
      this.product = prod[0];
      this.applicationSevice.getproductbrand(this.product.brand_id).subscribe(brand=> {
        this.productBrand = brand[0].title;
        if(this.product.sale_id == null) {
          this.productsaleprice=0;
          this.productsalecheck=false;
        } else {
          this.applicationSevice.singlesale(this.product.sale_id).subscribe(ressale => {
            if(ressale[0].discount>0) {
              let per = ressale[0].discount / 100;
              let discount = this.product.sell_price * per;
              this.productsaleprice=this.product.sell_price - discount;
              this.productsalecheck=true;
            } else {
              this.productsaleprice=0;
              this.productsalecheck=false;
            }
          })
        }
    });
      this.applicationSevice.getproductinsubcategory(this.product.category_id,this.product.subcategory_id).subscribe(value =>{
        if(value.length > 1) {
          this.checkrel=true;
          for(let i=0;i<value.length;i++) {
            if ( value[i].id != this.prod_id)
            {
              this.relatedproducts.push(value[i]);
              this.applicationSevice.getproductimage(value[i].id).subscribe(img=> {
                  this.relatedproductImages.push('http://localhost/api/images/'+img[0].image_url);
                  if(value[i].sale_id == null) {
                    this.saleprice.push(0);
                    this.salecheck.push(false);
                  } else {
                    this.applicationSevice.singlesale(value[i].sale_id).subscribe(ressale => {
                      if(ressale[0].discount>0) {
                        let per = ressale[0].discount / 100;
                        let discount = value[i].sell_price * per;
                        this.saleprice.push(value[i].sell_price - discount);
                        this.salecheck.push(true);
                      } else {
                        this.saleprice.push(0);
                        this.salecheck.push(false);
                      }
                    })
                  }
              });
            }
          }
        } else {
          this.checkrel = false;
        }
      })  
    });
  }
  onsubmitcomment() {
    if(this.commentForm.get('name').errors || this.commentForm.get('email').errors || this.commentForm.get('comment').errors) { 
      alert('Fill complete information');
    } else {
      if(this.commentForm.get('rating').value > 0) {
        this.applicationSevice.addcomment(this.commentForm.get('comment').value,this.commentForm.get('name').value,this.prod_id,this.commentForm.get('email').value).subscribe(res => {
          this.applicationSevice.productcomments(this.prod_id).subscribe(com => {
            this.comments = com;
            this.applicationSevice.addrating(this.commentForm.get('rating').value,this.prod_id).subscribe(res => {
              this.applicationSevice.getprodrating(this.prod_id).subscribe(ratings => {
                let avg_rate = 0;
                this.total_reviews = ratings.length;
                for(let i=0;i<ratings.length;i++) {
                  avg_rate = avg_rate + ratings[i].stars;
                  if(i == ratings.length - 1) {
                    // console.log(avg_rate);
                    this.prod_rate = avg_rate/ratings.length;
                    // console.log(this.prod_rate);
                    for(let j=0;j<this.prod_rate;j++) {
                      this.stars_highlight[j]=true;
                    }
                  }
                }
              })
            });
          })
          alert('Comment Added Successfully!');
        });
      } else {
        alert('Rating must be greater than 0');
      }
    }
  }

  tosee(index: any) {
    let temp = this.prod_image[index];
    this.prod_image[index] = this.default_image;
    this.default_image = temp;
  }
  saveproducttocache(id: number, quantity: number) {
    let temp = [];
    temp.push({id,quantity});
    let v = JSON.parse(sessionStorage.getItem("products"));
    // console.log(v);
    if(v!=undefined) {
      temp = [...temp, ...v];
    }
    this.applicationSevice.addproducttocache(temp);
  }

  navigatetodescription(selectedid: number) { 
    // this.router.navigate(['/productdescription',{product: id}]);
    this.prod_image= [];
    this.prod_id = selectedid;
    this.applicationSevice.getproductimage(this.prod_id).subscribe(img => {
      if(img.length>1) {
        this.otherimages = true;
      }else {
        this.otherimages = false;
      }
      for(let i=1;i<img.length;i++) {
        this.prod_image.push('http://localhost/api/images/' + img[i].image_url);
      }
      this.default_image = 'http://localhost/api/images/' + img[0].image_url;
    });
    this.applicationSevice.getproductdetails(this.prod_id).subscribe(prod => {
      this.product = prod[0];
      this.applicationSevice.getproductbrand(this.product.brand_id).subscribe(brand=> {
        this.productBrand = brand[0].title;
        if(this.product.sale_id == null) {
          this.productsaleprice=0;
          this.productsalecheck=false;
        } else {
          this.applicationSevice.singlesale(this.product.sale_id).subscribe(ressale => {
            if(ressale[0].discount>0) {
              let per = ressale[0].discount / 100;
              let discount = this.product.sell_price * per;
              this.productsaleprice=this.product.sell_price - discount;
              this.productsalecheck=true;
            } else {
              this.productsaleprice=0;
              this.productsalecheck=false;
            }
          })
        }
    });
    this.relatedproductImages = [];
    this.relatedproducts = [];
      this.applicationSevice.getproductinsubcategory(this.product.category_id,this.product.subcategory_id).subscribe(value =>{
        if(value.length > 1) {
          this.checkrel=true;
          for(let i=0;i<value.length;i++) {
            if ( value[i].id != this.prod_id)
            {
              this.relatedproducts.push(value[i]);
              this.applicationSevice.getproductimage(value[i].id).subscribe(img=> {
                  this.relatedproductImages.push('http://localhost/api/images/'+img[0].image_url);
                  if(value[i].sale_id == null) {
                    this.saleprice[i]=0;
                    this.salecheck[i]=false;
                  } else {
                    this.applicationSevice.singlesale(value[i].sale_id).subscribe(ressale => {
                      if(ressale[0].discount>0) {
                        let per = ressale[0].discount / 100;
                        let discount = value[i].sell_price * per;
                        this.saleprice[i]=value[i].sell_price - discount;
                        this.salecheck[i]=true;
                      } else {
                        this.saleprice[i]=0;
                        this.salecheck[i]=false;
                      }
                    });
                  }
              });
            }
          }
        } else {
          this.checkrel=false;
        }
      })  
    });
  }
}
