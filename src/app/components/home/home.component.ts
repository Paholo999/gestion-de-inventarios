import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
  
}
