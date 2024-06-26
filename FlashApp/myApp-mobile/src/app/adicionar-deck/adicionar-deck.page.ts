import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular/standalone';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../login/usuario.model';

@Component({
  selector: 'app-adicionar-deck',
  templateUrl: './adicionar-deck.page.html',
  styleUrls: ['./adicionar-deck.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, FormsModule],
  providers: [HttpClient, Storage]
})
export class AdicionarDeckPage implements OnInit {
  public token_usuario: string | undefined; // Declare token_user como uma string
  public usuario: Usuario = new Usuario();
  public instancia: {titulo: string, descricao: string|null} = {
    titulo: '',
    descricao: ''
  };

  constructor(
    public http: HttpClient,
    private storage: Storage,
    public controle_toast: ToastController,
    public controle_navegacao: NavController,
    public controle_carregamento: LoadingController,
    public router: Router
  ) { }

  async ngOnInit() {
    await this.storage.create();

    let registro = await this.storage.get('usuario');
    if (registro) {
      this.token_usuario = registro.token;
    } else {
      console.error('Usuário não encontrado no armazenamento');
    }
  }

  async adicionarDeck() {
    const loading = await this.controle_carregamento.create({ message: 'Adicionando...' });
    await loading.present();

    const usuario = await this.storage.get('usuario');

    // Headers com o token de autenticação
    let http_headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.token_usuario}`
    });

    // Realiza a requisição POST para adicionar o deck
    this.http.post('http://127.0.0.1:8000/decks/api/novodeck/', 
      {
        usuario: usuario.id,
        titulo: this.instancia.titulo,
        descricao: this.instancia.descricao || null,
      }, 
      { 
        headers: http_headers 
      })
      .subscribe({
        next: async (resposta: any) => {
          loading.dismiss();
          const mensagem = await this.controle_toast.create({
            message: 'Deck adicionado com sucesso!',
            duration: 2000
          });
          this.router.navigate(['/decks']);
          mensagem.present();
        },
        error: async (erro: any) => {
          loading.dismiss();
          console.error('Erro ao adicionar deck:', erro); // Exibir o erro completo no console
          const mensagem = await this.controle_toast.create({
            message: `Falha ao adicionar deck: ${erro.error}`,
            duration: 2000
          });
          mensagem.present();
        }
      });
  }

  async voltarTela(){
    this.router.navigate(['/decks']);
  }
}
