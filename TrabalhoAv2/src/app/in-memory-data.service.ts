import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Tweet } from "./tweet";
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService{
createDb () {
const Tweet =  [  
  {
  name: 'Amon Cruz',
  title: 'Ads',
  description: 'Ea consectetur dolor cupidatat esse proident reprehenderit in',
  ativo: true,
  url: './assets/images/thor.png',
  pefurl: './assets/images/bruce.png',

},

{
  name: "Emilio",
  title: 'Ciência Da computação',
  description: 'Ea consectetur dolor cupidatat esse proident reprehenderit in',
  ativo: true,
  url: '/assets/images/scarlett.png',
  pefurl: './assets/images/tony.png'
},

{
  name: 'Daniel',
  title: 'Engenharia da computação',
  description: 'Ea consectetur dolor cupidatat esse proident reprehenderit in',
  ativo: true,
  url: 'assets/images/homem-aranha.png',
  pefurl: './assets/images/capitao.png'
}

];
return {Tweet};
  }
 }