import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: 'decks',
    loadComponent: () => import('./decks/decks.page').then( m => m.DecksPage)
  },
  {
    path: 'adicionar-deck',
    loadComponent: () => import('./adicionar-deck/adicionar-deck.page').then( m => m.AdicionarDeckPage)
  },
  {
    path: 'revisar',
    loadComponent: () => import('./revisar/revisar.page').then( m => m.RevisarPage)
  },
  {
    path: 'revisar/:id',
    loadComponent: () => import('./revisar/revisar.page').then( m => m.RevisarPage)
  },
  {
    path: 'adicionar-card',
    loadComponent: () => import('./adicionar-card/adicionar-card.page').then( m => m.AdicionarCardPage)
  },
  {
    path: 'adicionar-card/:id',
    loadComponent: () => import('./adicionar-card/adicionar-card.page').then( m => m.AdicionarCardPage)
  },
  {
    path: 'fazer-revisao',
    loadComponent: () => import('./fazer-revisao/fazer-revisao.page').then( m => m.FazerRevisaoPage)
  },
  {
    path: 'fazer-revisao/:id',
    loadComponent: () => import('./fazer-revisao/fazer-revisao.page').then( m => m.FazerRevisaoPage)
  },
  {
    path: 'estatisticas',
    loadComponent: () => import('./estatisticas/estatisticas.page').then( m => m.EstatisticasPage)
  },
  {
    path: 'estatisticas/:id',
    loadComponent: () => import('./estatisticas/estatisticas.page').then( m => m.EstatisticasPage)
  },
];
