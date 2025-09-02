import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { Supabase } from 'src/app/services/supabase/supabase';

@Component({
  selector: 'app-modal-cadastro',
  templateUrl: './modal-cadastro.component.html',
  styleUrls: ['./modal-cadastro.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule, RouterModule]
})
export class ModalCadastroComponent implements OnInit {
  // Dados passados como parâmetros
  @Input() titulo: string = '';

  constructor(private modalCtrl: ModalController, private supabase: Supabase, private alertController: AlertController) { }
  ngOnInit() {}

  // Criando alertas
  async PresentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Fechando o modal
  FecharModal() {
    this.modalCtrl.dismiss({
      // Retornar confirmação ao fechar o modal
      confirmado: true
    });
  }

  // Cadastrando cliente
  public nome: string = '';
  public sku : number = 0;
  async InsertCliente(nome: string, sku: number) {
    const {error} = await this.supabase.InsertCliente(nome, sku);
    if (error) {
      this.PresentAlert('🔴 Erro!', 'Verifique sua conexão ou seu nível de acesso com um administrador.');
    } else {
      await this.PresentAlert('🟢 Item Cadastrado!', 'Item cadastrado com sucesso. Sua página será recarregada.');
      window.location.reload();
    }
  }

  // Cadastrando coordenador
  public coordenador: string = '';
  public estado: string = '';
  async InsertCoordenador(nome: string, estado: string) {
    const {error} = await this.supabase.InsertCoordenador(nome, estado);
    if (error) {
      this.PresentAlert('🔴 Erro!', 'Verifique sua conexão ou seu nível de acesso com um administrador.');
    } else {
      await this.PresentAlert('🟢 Item Cadastrado!', 'Item cadastrado com sucesso. Sua página será recarregada.');
      window.location.reload();
    }
  }
}