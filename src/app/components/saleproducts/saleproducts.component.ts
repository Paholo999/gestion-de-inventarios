import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/components/home/home.service'

@Component({
  selector: 'app-saleproducts',
  templateUrl: './saleproducts.component.html',
  styleUrls: ['./saleproducts.component.css']
})
export class SaleproductsComponent implements OnInit {

  myCart$ = this.homeService.myCart$

  constructor(private homeService:HomeService) { }

  ngOnInit(): void {
  }

    

}
