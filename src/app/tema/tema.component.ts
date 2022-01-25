import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit(): void {

      if(environment.token == ''){
        alert('Sua sessão expirou, faça login novamente!')
        this.router.navigate(['/logar'])
      }
    }
  }
