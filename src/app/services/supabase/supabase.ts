import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class Supabase {
  private API_URL : string = "https://cmtlvwfzwjusparliaxz.supabase.co";
  private API_KEY : string = "sb_publishable_DNkkuqRTZh-oK2U_2s7sXg_UecrLPR3";
  private supabase: SupabaseClient;
  constructor () {
    this.supabase = createClient(this.API_URL, this.API_KEY);
  }

  // Login
  async Login(email: string, senha: string) {
    return await this.supabase.auth.signInWithPassword({email: email, password: senha});
  }

  // LogOut
  async LogOut() {
    return await this.supabase.auth.signOut();
  }

  // Usuário
  async GetUser() {
    return await this.supabase.auth.getUser();
  }

  // Sessão do usuário
  async GetSession() {
    return await this.supabase.auth.getSession();
  }

  // Pegando o perfil dos usuários
  async GetProfiles() {
    return await this.supabase.from('profiles').select('*');
  }

  // Cadastrar novos clientes
  async InsertCliente(nome: string, sku: number) {
    return await this.supabase.from('tbl_Clientes').insert({
      nome: nome,
      sku : sku,
    });
  }

  // Cadastrar coordenador
  async InsertCoordenador(nome: string, estado: string) {
    return await this.supabase.from('tbl_Coordenadores').insert({
      nome: nome,
      estado: estado,
    });
  }
}