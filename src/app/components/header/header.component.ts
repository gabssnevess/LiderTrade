import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { Supabase } from 'src/app/services/supabase/supabase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule, RouterModule],
})
export class HeaderComponent  implements OnInit {
  constructor(private supabase: Supabase, private alertController: AlertController, private router: Router) { }
  async ngOnInit() {
    await this.GetUser();
  }

  // Criando alertas
  async PresentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Pegando usuário
  public usuario: any = '';
  async GetUser() {
    const {data, error} = await this.supabase.GetUser();
    if(error) {
      this.PresentAlert('🔴 Erro!', 'Erro ao pegar usuário, tente novamente.');
    } else {
      this.usuario = data.user.email?.split('@', 1);
    }
  }

  // Deslogando usuário
  async LogOut() {
    const {error} = await this.supabase.LogOut();
    if(error) {
      this.PresentAlert('🔴 Erro!', 'Erro ao deslogar, tente novamente.');
    } else {
      this.router.navigate(['/login']);
    }
  }
}