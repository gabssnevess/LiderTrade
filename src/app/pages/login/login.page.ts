import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Supabase } from 'src/app/services/supabase/supabase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  constructor(private supabase: Supabase, private alertController: AlertController, private router: Router) { }
  ngOnInit() { }

  // Variaveis
  public email: string = '';
  public senha: string = '';

  // Criando alertas
  async PresentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Logando
  async Login() {
    const {error} = await this.supabase.Login(this.email, this.senha);
    if(error) {
      this.PresentAlert('🔴 Erro!', 'Verifique suas credenciais.');
    } else {
      this.router.navigate(['/home']);
    }
  }
}