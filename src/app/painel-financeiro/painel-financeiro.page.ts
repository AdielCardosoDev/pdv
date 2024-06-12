import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-painel-financeiro',
  templateUrl: './painel-financeiro.page.html',
  styleUrls: ['./painel-financeiro.page.scss'],
})
export class PainelFinanceiroPage implements OnInit {
a = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router, 
    ) { }

  ngOnInit() {
    this.a =  ''
  }

  logout(){
    this.router.navigate(['/login']);
  }
}
