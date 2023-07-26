import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/components/home/home.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  myCart$ = this.homeService.myCart$

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
  }

}
