import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.component.html',
  styleUrls: ['./logar.component.css']
})
export class LogarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  entrar() {
    this.authService.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin)=>{
      this.usuarioLogin = resp

      environment.token = this.usuarioLogin.token
      environment.foto = this.usuarioLogin.foto
      environment.nome = this.usuarioLogin.nome
      environment.id = this.usuarioLogin.id
      environment.tipo = this.usuarioLogin.tipo

      console.log(environment.token)
      console.log(environment.foto)
      console.log(environment.nome)
      console.log(environment.id)
      console.log(environment.tipo)

      this.router.navigate(['/inicio'])
    }, erro =>{
      if (erro.status == 401){
        alert('Usuario ou senha estão incorretos!')
      }
      else{this.router.navigate(['/inicio'])}
    })
  }

}
