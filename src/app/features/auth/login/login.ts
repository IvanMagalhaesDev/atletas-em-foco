import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email = '';
  senha = '';
  erro = '';
  carregando = false;

  constructor(private router: Router) {}

  entrar() {
    this.erro = '';

    if (!this.email || !this.senha) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    this.carregando = true;

    setTimeout(() => {
      if (this.email === 'admin@atletasemfoco.com' && this.senha === 'admin123') {
        this.router.navigate(['/dashboard']);
      } else {
        this.erro = 'E-mail ou senha incorretos.';
        this.carregando = false;
      }
    }, 1000);
  }
}