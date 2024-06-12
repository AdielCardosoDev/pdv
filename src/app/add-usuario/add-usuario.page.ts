import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../services/api';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {
  id: number = 0;
  nome: string = '';
  cpf: string = '';
  email: string = '';
  senha: string = '';
  nivel: string = '';

  antigo: string = '';
  antigo2: string = '';

  constructor(
    private router: Router,
    private provider: Api,
    private actRouter: ActivatedRoute,
    private toastController: ToastController
    ) { }

  ngOnInit() {
   this.actRouter.params.subscribe((data: any) => {
    this.id = data.id;
    this.nome = data.nome;
    this.cpf = data.cpf;
    this.email = data.email;
    this.senha = data.senha;
    this.nivel = data.nivel;

    this.antigo = data.email;
    this.antigo2 = data.cpf;
   });
  }

  async mensagemSucesso(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async mensagemError(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  usuarios(){
    this.router.navigate(['/usuarios'])
  }

  cadastrar(){
    return new Promise(resolve => {
      let dados = {
        nome: this.nome,
        cpf: this.cpf,
        email: this.email,
        senha: this.senha,
        nivel: this.nivel,
        id: this.id,
        antigo: this.antigo,
        antigo2: this.antigo2,
      }
      this.provider.dadosApi(dados, 'usuarios/inserir.php').subscribe(
        (data: any) => {
          if(data['ok'] == true){
            this.router.navigate(['usuarios'])
            this.mensagemSucesso(data['mensagem']);
          }else{
            this.mensagemError(data['mensagem']);
          }          
        }
      )
    });
  }

  editar(){

  }

}
