import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {}

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
  }

}
