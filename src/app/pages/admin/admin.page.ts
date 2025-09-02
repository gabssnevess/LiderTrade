import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalCadastroComponent } from 'src/app/components/modal-cadastro/modal-cadastro.component';
import { Supabase } from 'src/app/services/supabase/supabase';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false,
})
export class AdminPage implements OnInit {
  constructor(private supabase: Supabase, private alertController: AlertController, private modalCtrl: ModalController) { }
  async ngOnInit() {
    await this.GetProfiles();
  }

  // Abrindo modal
  async AbrirModal(titulo: string) {
    const modal = await this.modalCtrl.create({
      component: ModalCadastroComponent,
      componentProps: {
        titulo: titulo,
      }
    });

    // Mostrando o modal
    await modal.present();

    // Captura o retorno do modal
    const { data } = await modal.onDidDismiss();
    console.log('Retorno do modal:', data);
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

  // Get - Perfil dos usuários
  usuarios: any[] = [];
  async GetProfiles() {
    const {data, error} = await this.supabase.GetProfiles();
    if(error) {
      this.PresentAlert('🔴 Erro!', 'Erro ao carregar os dados!');
    } else {
      this.usuarios = data;
    }
  }
}
