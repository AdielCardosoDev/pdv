import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../services/api';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  nome = '';
  itens: any = [];
  limit: number = 10;
  start: number = 0;

  constructor(
    private router : Router,
    private provider: Api,
    private actRouter: ActivatedRoute,
    public toastController: ToastController
    ) { }

  ngOnInit() {
    var teste = '';
  }

  ionViewWillEnter(){
    this.itens = [];
    this.start = 0;
    this.carregar();
  }

  async mensagem(mensagem: any, cor: any){
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: cor
    });
    toast.present();
  }

  addUsuarios(){
    this.router.navigate(['/add-usuario'])
  }

  carregar(){
    return new Promise(resolve => {
      this.itens = [];
      let dados = {
        nome : this.nome,
        limit : this.limit,
        start : this.start
      };

        this.provider.dadosApi(dados, 'usuarios/listar.php').subscribe((data: any) => {
          console.log(data)
        if(data.itens.length == '0') {
          this.ionViewWillEnter();
        }else{
          this.itens = [];
          for(let item of data.itens){
            this.itens.push(item);            
          }
        }
     
         resolve(true);
         
        });
    });
    
  }

  editar(id: number, nome: string, cpf: string, email: string, senha: string, nivel: string){
    this.router.navigate(['/add-usuario/' + id + '/' + nome + '/' + cpf + '/' + email + '/'  + senha + '/' + nivel + '/'])
  }

  mostrar(id: number, nome: string, cpf: string, email: string, senha: string, nivel: string){
    this.router.navigate(['/mostrar-usuarios/' + id + '/' + nome + '/' + cpf + '/' + email + '/' + senha + '/' + nivel + '/'])
  }

  excluir(id: number){
    return new Promise(resolve => {
      let dados = {
        id: id,
              
      }
      this.provider.dadosApi(dados, 'usuarios/excluir.php').subscribe(
        (data: any) =>{
          
          if(data['ok'] == true){
            this.carregar();
            this.mensagem(data['mensagem'], 'success');
            
          }else{
            this.mensagem(data['mensagem'], 'danger');
          }
                
          
        }
      )
    });
  }

  doRefresh(event: any){
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  loadData(event: any){
    this.start += this.limit;

    setTimeout(() => {
      this.carregar().then(()=>{ 
        event.target.complete();
       });
     
    }, 500);
  }

}
