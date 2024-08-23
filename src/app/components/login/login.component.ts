import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from './user.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private loginService: LoginService, private acticateRoute : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    if((this.user.Username == null || this.user.Password == null)){
      Swal.fire({
        icon: 'error',
        title: 'Login', 
        text: 'Username o password son incorrectos',
        footer: 'Store v1.0.0'
      })
      return;
    }
    this.loginService.login(this.user).subscribe(response =>{
      const payload = this.loginService.getToken(response.token);
      console.log(payload);
      this.loginService.saveToken(response.token);
      this.loginService.saveUser(payload);
      Swal.fire({
        icon: 'success',
        title: 'Login success', 
        text: `Bienvenido al sistema!!!`,
        footer: 'Store v1.0.0'
      }).then(result => {
        if(result.isConfirmed){
          this.router.navigate(['/home']);
        }
      })
      console.log(response)
    }, error => {
      if(error.status == 400){
        Swal.fire({
          icon: 'error',
          title: 'Login',
          text: 'Username o password son incorrectos, revise sus credenciales',
          footer: 'Store v1.0.0'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Service failed',
          text: 'Existe un problema con los servicios de Kalum',
          footer: 'Store v1.0.0'
        });
      }
        
    })
  }

  signin(){
    this.router.navigate(['/signin']);
  }

}
