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
  ngOnInit() {
    this.GetRedes();
    this.GetTamanhos();
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

  // Pegando as redes
  redes: any[] = [];
  async GetRedes() {
    const {data, error} = await this.supabase.GetRedes();
    if (error) {
      this.PresentAlert('🔴 Erro!', 'Verifique sua conexão ou seu nível de acesso com um administrador.');
    } else {
      this.redes = data;
    }
  }

  // Pegando os tamanhos de lojas
  tamanhos: any[] = [];
  async GetTamanhos() {
    const {data, error} = await this.supabase.GetTamanhos();
    if (error) {
      this.PresentAlert('🔴 Erro!', 'Verifique sua conexão ou seu nível de acesso com um administrador.');
    } else {
      this.tamanhos = data;
    }
  }

  // Cadastrando loja
  public nome_loja: string = "";
  public cnpj_loja: string = "";
  public rua_loja : string = "";
  public cidade_loja: string = "";
  public estado_loja: string = "";
  public rede_loja: number = 0;
  public tamanho_loja: number = 0;
  async InsertLoja() {
    const {error} = await this.supabase.InsertLoja(this.nome_loja, this.cnpj_loja, this.rua_loja, this.cidade_loja,
      this.estado_loja, this.rede_loja, this.tamanho_loja);
    if (error) {
      this.PresentAlert('🔴 Erro!', 'Verifique sua conexão ou seu nível de acesso com um administrador.');
    } else {
      await this.PresentAlert('🟢 Item Cadastrado!', 'Item cadastrado com sucesso. Sua página será recarregada.');
      window.location.reload();
    }
  }
}