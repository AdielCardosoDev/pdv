import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-usuarios',
  templateUrl: './mostrar-usuarios.page.html',
  styleUrls: ['./mostrar-usuarios.page.scss'],
})
export class MostrarUsuariosPage implements OnInit {
  id: number = 0;
  nome: string = '';
  cpf: string = '';
  email: string = '';
  senha: string = '';
  nivel: string = '';

  constructor(
     private actRouter: ActivatedRoute,
     private router: Router,
  ) { }

  ngOnInit() {
    this.actRouter.params.subscribe((data: any) => {
      this.id = data.id;
      this.nome = data.nome;
      this.cpf = data.cpf;
      this.email = data.email;
      this.senha = data.senha;
      this.nivel = data.nivel;
    });
    
  }

  usuarios(){
    this.router.navigate(['/usuarios'])
  }

  

}
