import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMobile : boolean = false;
  ngOnInit() {
    if(window.innerWidth <= 770)
    {
      this.isMobile = true; 
    }
  }
}
