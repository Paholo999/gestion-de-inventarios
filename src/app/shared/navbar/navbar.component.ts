import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/components/createproducts/product.service';
import { LoginService } from 'src/app/components/login/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  myCart$ = this.productService.myCart$
  myCartBuy$ = this.productService.myCartBuy$

  constructor(public loginService: LoginService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/home']);
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('#user-menu-button')) {
      this.isMenuOpen = false;
    }
  }
}
