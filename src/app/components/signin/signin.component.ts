import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SigninService } from './signin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User = new User();
  
  constructor(private signinService: SigninService, private acticateRoute : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  signin(){
    if((this.user.Username == null || this.user.FirstName == null || this.user.LastName == null || this.user.Password == null || this.user.Email == null)){
      Swal.fire({
        icon: 'error',
        title: 'SignIn', 
        text: 'Campos incorrectos',
        footer: 'Store v1.0.0'
      })
      return;
    }
    this.signinService.signin(this.user).subscribe(response =>{
      Swal.fire({
        icon: 'success',
        title: 'SignIn success', 
        text: `Registrado correctamente!!!`,
        footer: 'Store v1.0.0'
      }).then(result => {
        if(result.isConfirmed){
          this.router.navigate(['/signin']);
        }
      })
    }, error => {
      if(error.status == 400){
        Swal.fire({
          icon: 'error',
          title: 'SignIn',
          text: 'Datos incorrectos',
          footer: 'Store v1.0.0'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Service failed',
          text: 'Existe un problema con los servicios de Store',
          footer: 'Store v1.0.0'
        });
      }
    });
  }
}
