import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Options } from '../../../node_modules/ng5-slider';
import { ApplicationService } from '../services/application-service.service';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  constructor(private router: Router, private formBuilder: FormBuilder, private applicationSevice: ApplicationService, private route: ActivatedRoute) { }
  sidebar = [];
  brandids = [];
  allbrands = [];
  filterbrand = [];
  filterproductindex = [];
  subcategory= [];
  brandselectedids = [];
  onecat = [];
  products = [];
  prod_image = [];
  laptops = [];
  saleprice = [];
  salecheck = [];
  filtersizetype= [];
  sml = false;
  inches = false;
  inchesoptions = ['10','11','12','13','14','15','17'];
  filterinches = [];
  smloptions = ['small','medium','large'];
  quantitychoosen = 1;
  @Input() isMobile : boolean;
  public checkboxGroupForm: FormGroup;
  public brandcheckGroupForm: FormGroup;
  minValue: number = 0;
  maxValue: number = 500000;
  options: Options = {
    floor: 0,
    ceil: 500000
  };

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
    this.applicationSevice.getallbrands().subscribe(brands => {
      this.allbrands = brands;
    })
    this.checkboxGroupForm = this.formBuilder.group({
      small: true,
      medium: false,
      large: false
    });
    this.brandcheckGroupForm = this.formBuilder.group({
      HP: true,
      Dell: false,
    })
    this.applicationSevice.getallcategories().subscribe( data => {
      this.sidebar = data;
      for (let i = 0; i < data.length ; i++) {
        this.applicationSevice.getsubcategory(this.sidebar[i].id).subscribe( value => {
          this.subcategory = [...this.subcategory,...value];
        })
      }
  });
  let x = this.route.snapshot.paramMap.get('category');
  let y = this.route.snapshot.paramMap.get('subcategory');
  let cat_id: number = +x;
  let subcat_id: number = +y;
  this.applicationSevice.getproductinsubcategory(cat_id,subcat_id).subscribe ( value => {
    for (let i = 0; i < value.length ; i++) {
      let index = this.brandids.indexOf(value[i].brand_id);
      if(index == -1) {
        this.brandids.push(value[i].brand_id);
      }
      if(value[i].size_type != null) {
        let index2 = this.filtersizetype.indexOf(value[i].size_type);
        if(index2 == -1) {
          this.filtersizetype.push(value[i].size_type);
          if(value[i].size_type == 'sml') {
            this.sml= true;
          }
          if(value[i].size_type == 'inches') {
            this.inches = true;
          }
        }
      }
      this.applicationSevice.getproductimage(value[i].id).subscribe(img => {
        this.filterproductindex.push(i);
        this.prod_image.push('http://localhost/api/images/' + img[0].image_url);
        this.products.push(value[i]);
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
      })
      if(i == value.length - 1) {
        this.filteringbrand();
      }
    }
  });
  }
  // myFunction(i) {
  //   for(let j=0;j<this.sidebar.length;j++) {
  //     if(j != i) {
  //       var element = document.getElementById('tab_' + j);
  //       element.classList.remove("show");
  //     }
  //   }
  // }
  selectedinch(ind) {
    this.filterproductindex = [];
    let index = this.filterinches.indexOf(this.inchesoptions[ind]);
    if(index == -1) {
      this.filterinches.push(this.inchesoptions[ind]);
      for(let i=0;i<this.products.length;i++) {
        let index3 = this.filterinches.indexOf(this.products[i].size);
        if(index3 != -1) {
          if(this.brandselectedids.length > 0) {
            let index2 = this.brandselectedids.indexOf(this.products[i].brand_id);
            if(this.products[i].sell_price <= this.maxValue && this.products[i].sell_price >= this.minValue  && index2 != -1) {
              if(this.filterproductindex.indexOf(i) == -1) {
                this.filterproductindex.push(i);
              }
            }
          } else {
            if(this.products[i].sell_price <= this.maxValue && this.products[i].sell_price >= this.minValue) {
              if(this.filterproductindex.indexOf(i) == -1) {
                this.filterproductindex.push(i);
              }
            }
          }
        }
      }
    } else {
      this.filterinches.splice(index,1);
      for(let i=0;i<this.products.length;i++) {
        let index3 = this.filterinches.indexOf(this.products[i].size);
        if(index3 != -1) {
          if(this.brandselectedids.length > 0) {
            let index2 = this.brandselectedids.indexOf(this.products[i].brand_id);
            if(this.products[i].sell_price <= this.maxValue && this.products[i].sell_price >= this.minValue  && index2 != -1) {
              if(this.filterproductindex.indexOf(i) == -1) {
                this.filterproductindex.push(i);
              }
            }
          } else {
            if(this.products[i].sell_price <= this.maxValue && this.products[i].sell_price >= this.minValue) {
              if(this.filterproductindex.indexOf(i) == -1) {
                this.filterproductindex.push(i);
              }
            }
          }
        }
      }
    }
  }
  selectsml(s) {
    this.filterproductindex = [];
    for(let i=0;i<this.products.length;i++) {
      if(this.products[i].size == s || this.products[i].size_type==null) {
        if(this.filterinches.length > 0) {
          let temp = this.filterinches.indexOf(this.products[i].size);
          if(temp != -1) {
            if(this.brandselectedids.length > 0) {
              let index2 = this.brandselectedids.indexOf(this.products[i].brand_id);
              if(this.products[i].sell_price <= this.maxValue && this.products[i].sell_price >= this.minValue  && index2 != -1) {
                if(this.filterproductindex.indexOf(i) == -1) {
                  this.filterproductindex.push(i);
                }
              }
            } else {
              if(this.products[i].sell_price <= this.maxValue && this.products[i].sell_price >= this.minValue) {
                if(this.filterproductindex.indexOf(i) == -1) {
                  this.filterproductindex.push(i);
                }
              }
            }
          }
        } else {
          if(this.brandselectedids.length > 0) {
            let index2 = this.brandselectedids.indexOf(this.products[i].brand_id);
            if(this.products[i].sell_price <= this.maxValue && this.products[i].sell_price >= this.minValue  && index2 != -1) {
              if(this.filterproductindex.indexOf(i) == -1) {
                this.filterproductindex.push(i);
              }
            }
          } else {
            if(this.products[i].sell_price <= this.maxValue && this.products[i].sell_price >= this.minValue) {
              if(this.filterproductindex.indexOf(i) == -1) {
                this.filterproductindex.push(i);
              }
            }
          }
        }

      }
    }
  }
  rangecheck() {
    this.filterproductindex = [];
    for(let i=0;i<this.products.length;i++) {
      if(this.filterinches.length > 0) {
        let temp = this.filterinches.indexOf(this.products[i].size);
        if(temp != -1) {
          if(this.brandselectedids.length > 0) {
            let index2 = this.brandselectedids.indexOf(this.products[i].brand_id);
            if(this.products[i].sell_price <= this.maxValue && this.products[i].sell_price >= this.minValue  && index2 != -1) {
              if(this.filterproductindex.indexOf(i) == -1) {
                this.filterproductindex.push(i);
              }
            }
          } else {
            if(this.products[i].sell_price <= this.maxValue && this.products[i].sell_price >= this.minValue) {
              if(this.filterproductindex.indexOf(i) == -1) {
                this.filterproductindex.push(i);
              }
            }
          }
        }
      } else {
        if(this.brandselectedids.length > 0) {
          let index2 = this.brandselectedids.indexOf(this.products[i].brand_id);
          if(this.products[i].sell_price <= this.maxValue && this.products[i].sell_price >= this.minValue  && index2 != -1) {
            if(this.filterproductindex.indexOf(i) == -1) {
              this.filterproductindex.push(i);
            }
          }
        } else {
          if(this.products[i].sell_price <= this.maxValue && this.products[i].sell_price >= this.minValue) {
            if(this.filterproductindex.indexOf(i) == -1) {
              this.filterproductindex.push(i);
            }
          }
        }
      }
    }
  }
  filteringbrand() {
    for(let j = 0;j < this.allbrands.length;j++) {
      let index2 = this.brandids.indexOf(this.allbrands[j].id);
      if(index2 != -1) {
        this.filterbrand.push({'id' : this.allbrands[j].id, 'title': this.allbrands[j].title});
      }
    }
  }
  onlybrand(id) {
    this.filterproductindex = [];
    let index = this.brandselectedids.indexOf(id);
    if(index == -1) {
      this.brandselectedids.push(id);
      for(let i=0;i<this.products.length;i++) {
        if(this.filterinches.length > 0 ) {
          let temp = this.filterinches.indexOf(this.products[i].size);
          if(temp != -1) {
            let index2 = this.brandselectedids.indexOf(this.products[i].brand_id);
            if(this.products[i].brand_id <= this.maxValue && this.products[i].sell_price >= this.minValue && index2 != -1) {
              if(this.filterproductindex.indexOf(i) == -1) {
                this.filterproductindex.push(i);
              }
            }
          }
        } else {
          let index2 = this.brandselectedids.indexOf(this.products[i].brand_id);
          if(this.products[i].brand_id <= this.maxValue && this.products[i].sell_price >= this.minValue && index2 != -1) {
            if(this.filterproductindex.indexOf(i) == -1) {
              this.filterproductindex.push(i);
            }
          }
        }
      }
    } else {
      this.brandselectedids.splice(index,1);
      for(let i=0;i<this.products.length;i++) {
        if(this.filterinches.length > 0 ) {
          let temp = this.filterinches.indexOf(this.products[i].size);
          if(temp != -1) {
            let index2 = this.brandselectedids.indexOf(this.products[i].brand_id);
            if(this.products[i].brand_id <= this.maxValue && this.products[i].sell_price >= this.minValue && index2 != -1) {
              if(this.filterproductindex.indexOf(i) == -1) {
                this.filterproductindex.push(i);
              }
            }
          }
        } else {
          let index2 = this.brandselectedids.indexOf(this.products[i].brand_id);
          if(this.products[i].brand_id <= this.maxValue && this.products[i].sell_price >= this.minValue && index2 != -1) {
            if(this.filterproductindex.indexOf(i) == -1) {
              this.filterproductindex.push(i);
            }
          }
        }
      }
    }
  }
  getonecat(id: number, divid: any) {
    let temp = [];
    let size = this.subcategory.length;
    for (let i = 0; i < size ; i++) {
      if (this.subcategory[i].category_id == id) {
        temp.push(this.subcategory[i]);
        this.onecat = temp;
      }
    }
    this.onecat = temp;
    for(let j=0;j<this.sidebar.length;j++) {
      if(j != divid) {
        var element = document.getElementById('tab_' + j);
        element.classList.remove("show");
      }
    }
  }
  navigatetodescription(id: number) { 
    this.router.navigate(['/productdescription',{product: id}]);
  }
  currentSubCategorycheck(id: number) {
    let temp = [];
    let size = this.subcategory.length;
    for (let i = 0; i < size ; i++) {
      if (this.subcategory[i].category_id == id) {
        return true;
      }
    }
  }
  saveproducttocache(id: number, quantity: number) {
    let temp = [];
    temp.push({id,quantity});
    let v = JSON.parse(sessionStorage.getItem("products"));
    if(v!=undefined) {
      temp = [...temp, ...v];
    }
    this.applicationSevice.addproducttocache(temp);
  }
  getproductlist(cat_id: number, subcat_id: number) {
    this.router.navigate(['/categories',{category: cat_id, subcategory: subcat_id}]);
    this.prod_image=[];
    this.products=[];
    this.brandids = [];
    this.filterbrand = [];
    this.filterproductindex = [];
    this.filtersizetype= [];
    this.filterinches = [];
    this.sml=false;
    this.inches=false;
    this.applicationSevice.getproductinsubcategory(cat_id,subcat_id).subscribe ( value => {
      for (let i = 0; i < value.length ; i++) {
        let index = this.brandids.indexOf(value[i].brand_id);
        if(index == -1) {
          this.brandids.push(value[i].brand_id);
        }
        if(value[i].size_type != null) {
          let index2 = this.filtersizetype.indexOf(value[i].size_type);
          if(index2 == -1) {
            this.filtersizetype.push(value[i].size_type);
            if(value[i].size_type == 'sml') {
              this.sml= true;
            }
            if(value[i].size_type == 'inches') {
              this.inches = true;
            }
          }
        }
        this.applicationSevice.getproductimage(value[i].id).subscribe(img => {
          this.filterproductindex.push(i);
          this.prod_image.push('http://localhost/api/images/' + img[0].image_url);
          this.products.push(value[i]);
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
        })
        if(i == value.length - 1) {
          this.filteringbrand();
        }
      }
    });
  }
}
