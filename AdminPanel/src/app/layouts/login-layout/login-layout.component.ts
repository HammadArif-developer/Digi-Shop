import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/forapis.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {
  loginForm: FormGroup;
  errormessage = false;
  constructor(private router: Router,private fb: FormBuilder,private applicationSevice: ApplicationService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group ({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
    if(sessionStorage.getItem("userlogged")=='in')
    {
      this.router.navigate(['/dashboard']);
    }
  }
  navigatetodashboard() {
    let user = this.loginForm.get('Username').value;
    let pass = this.loginForm.get('Password').value; 
    this.applicationSevice.getPassword(user).subscribe(res => {
      if(res[0].password==pass) {
        sessionStorage.setItem("userlogged",'in');
        this.errormessage = false;
        this.router.navigate(['/product']);
      }
        this.errormessage = true;
    })
  }
}
