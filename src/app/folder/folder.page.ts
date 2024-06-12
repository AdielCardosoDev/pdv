import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
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
