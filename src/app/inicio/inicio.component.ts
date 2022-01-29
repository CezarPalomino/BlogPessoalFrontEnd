import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  listaPostagens: Postagem[]
  idPostagem: number
  postagem: Postagem = new Postagem()

  listaTemas: Tema[]
  idTema: number
  tema: Tema = new Tema()

  idUsuario = environment.id
  usuario: Usuario = new Usuario()

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
  ) { }

  ngOnInit() {

    if(environment.token == ''){
      alert('Sua sessão expirou, faça login novamente!')
      this.router.navigate(['/logar'])
    }

    this.authService.refreshToken()
    this.getAllTemas()
    this.getAllPostagens()
  }

  // Início métodos GET all
  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) =>{
      this.listaPostagens = resp
    })
  }
// Fim métodos GET all

// Início métodos GET by id 
  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  findByIdPostagem(){
    this.postagemService.getByIdPostagem(this.idPostagem).subscribe((resp: Postagem) =>{
      this.postagem = resp
    })
  }

  findByIdUsuario() {
    this.authService.getByIdUser(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }
// Fim métodos GET by id

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem publicada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens
    })
  }

}
