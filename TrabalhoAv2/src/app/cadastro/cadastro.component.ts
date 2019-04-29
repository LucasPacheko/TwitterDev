import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TweetService } from "../tweet.service";
import { UsuarioService } from "../usuario.service";
import { Usuario } from '../Usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  rForm: FormGroup;
  url = '';
  pefurl = '';
  usuarios: Usuario[];
  ativo: boolean;
  constructor(private fb: FormBuilder, private tweetService: TweetService, private usuarioService: UsuarioService) {
    this.rForm = fb.group({
      'usuario': [null, Validators.required],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      'ativo': [false, Validators.requiredTrue]
    })
  }

  ngOnInit() {
    this.usuarioService.getUsers().subscribe(usuarios => this.usuarios = usuarios);
  }

  addPost(post) {
    post.url = this.url;
    let nome = post.usuario.nome;
    let fotourl = post.usuario.fotoUrl;
    post.name = nome;
    post.pefurl = fotourl;
    this.tweetService.setTweets(post);
    this.rForm.reset('');
    this.url = '';
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      console.log(event.target.files[0] + " " + event.target.files)
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
}
