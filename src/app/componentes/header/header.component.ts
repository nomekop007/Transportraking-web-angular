import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  nombreUsuario: string;

  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      this.nombreUsuario = user.email;
    })
  }

  logout() {
    this.auth.signOut();
  }
}
