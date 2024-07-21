import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() showSearch: boolean = true;
  @Input() isAbsolute: boolean = true;
  public showMobileMenu: boolean = false;
  constructor(private route: ActivatedRoute,private router: Router) {

  }
}
