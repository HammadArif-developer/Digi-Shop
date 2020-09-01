import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { ApplicationService } from '../services/application-service.service';
@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css']
})
export class MainBodyComponent implements OnInit {
  @Input() isMobile : boolean;
  images = ["../../assets/images/image5.jpg", "../../assets/images/image6.jpg", "../../assets/images/image7.jpg"];
  sidebar = [];
  subcategory= [];
  onecat = [];
  onclickinput = [];
  categoryimages = [];
  featuredCategory = [{image: '', thumbImage: ''}];
  featuredItem = [{image: '', thumbImage: ''}];
  constructor(private router: Router, private applicationSevice: ApplicationService) { }

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
    this.applicationSevice.getfeaturedcategories().subscribe(img => {
      let size = img.length;
      // console.log(size);
      for (let i = 0; i < size ; i++) {
        this.featuredCategory.push({image: 'http://localhost/api/images/' + img[i].image, thumbImage: 'http://localhost/api/images/' + img[i].image});
        // console.log(img[i].image);
      }
    });
    this.applicationSevice.getfeaturedproduct().subscribe(img => {
      let size = img.length;
      // console.log(size);
      for (let i = 0; i < size ; i++) {
        this.featuredItem.push({image: 'http://localhost/api/images/' + img[i].image, thumbImage: 'http://localhost/api/images/' + img[i].image});
        // console.log(img[i].image);
      }
    });
    this.applicationSevice.getallcategories().subscribe( data => {
        this.sidebar = data;
        // let size = this.sidebar.length;
        for (let i = 0; i < data.length ; i++) {
          // console.log(this.sidebar[i].id);
          this.applicationSevice.getsubcategory(this.sidebar[i].id).subscribe( value => {
            this.subcategory = [...this.subcategory,...value];
          })
        }

    });
  }
  getproductlist(cat_id: number, subcat_id: number) {
    this.router.navigate(['/categories',{category: cat_id, subcategory: subcat_id}]);
  }
  getonecat(id: number) {
    let temp = [];
    let size = this.subcategory.length;
    for (let i = 0; i < size ; i++) {
      if (this.subcategory[i].category_id == id) {
        temp.push(this.subcategory[i]);
        this.onecat = temp;
      }
    }
    this.onecat = temp;
  }
  currentSubCategorycheck(id: number) {
    let size = this.subcategory.length;
    for (let i = 0; i < size ; i++) {
      if (this.subcategory[i].category_id == id) {
        return true;
      }
    }
  }

  navigateToCategories() {
    this.router.navigate(['/categories']);
  }

imageObject2 = [{
  image: '../../assets/images/logo-carousel/logo-1.png',
  thumbImage: '../../assets/images/logo-carousel/logo-1.png',
}, {
  image: '../../assets/images/logo-carousel/logo-2.png',
  thumbImage: '../../assets/images/logo-carousel/logo-2.png'
}, {
  image: '../../assets/images/logo-carousel/logo-3.png',
  thumbImage: '../../assets/images/logo-carousel/logo-3.png',
},{
  image: '../../assets/images/logo-carousel/logo-4.png',
  thumbImage: '../../assets/images/logo-carousel/logo-4.png',
}];
}
