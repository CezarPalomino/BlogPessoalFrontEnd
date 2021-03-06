import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AuthService } from '../service/auth.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor( 
    private router: Router,
    private temaService: TemaService
    ) { }

  ngOnInit(): void {

      if(environment.token == ''){
        alert('Sua sessão expirou, faça login novamente!')
        this.router.navigate(['/logar'])
      }

      this.findAllTemas()
    }

    findAllTemas(){
      this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
    }

    cadastrar(){
      this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
        this.tema = resp
        alert('Tema cadastrado com sucesso!')
        this.tema = new Tema()
      })
      this.findAllTemas()
    }

  }
