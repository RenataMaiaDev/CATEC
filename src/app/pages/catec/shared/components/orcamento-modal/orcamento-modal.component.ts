import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { ButtonComponent } from '../button/button.component';
import { OrcamentoService } from './orcamento.service';

type TipoPessoa = 'fisica' | 'juridica';
type StatusEnvio = 'idle' | 'enviando' | 'sucesso' | 'erro';
type Toast = { tipo: 'sucesso' | 'erro'; mensagem: string };

// TODO: credenciais de TESTE (conta pessoal). Trocar pelas credenciais
// definitivas da CATEC antes de ir para produção.
const EMAILJS_SERVICE_ID = 'service_c0rs4th';
const EMAILJS_TEMPLATE_ID = 'template_f0vnyhp';
const EMAILJS_PUBLIC_KEY = 'lkJzopXB5M7ekUZFm';

const DURACAO_TOAST_MS = 5000;

@Component({
  selector: 'app-orcamento-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './orcamento-modal.component.html',
  styleUrl: './orcamento-modal.component.scss',
})
export class OrcamentoModalComponent {
  @ViewChild('orcamentoForm') formRef!: ElementRef<HTMLFormElement>;

  private readonly orcamentoService = inject(OrcamentoService);
  readonly isOpen = this.orcamentoService.isOpen;

  tipoPessoa = signal<TipoPessoa>('fisica');
  status = signal<StatusEnvio>('idle');
  tentouEnviar = signal(false);
  toast = signal<Toast | null>(null);
  private toastTimeoutId?: ReturnType<typeof setTimeout>;

  nome = '';
  documento = '';
  endereco = '';
  email = '';
  telefone = '';
  descricao = '';
  dataPreferida = '';
  horaPreferida = '';

  readonly dataMinima = new Date().toISOString().split('T')[0];

  constructor() {
    effect(() => {
      document.body.style.overflow = this.isOpen() ? 'hidden' : '';
    });
  }

  fechar(): void {
    this.orcamentoService.fechar();
  }

  fecharToast(): void {
    this.toast.set(null);
    clearTimeout(this.toastTimeoutId);
  }

  selecionarTipoPessoa(tipo: TipoPessoa): void {
    this.tipoPessoa.set(tipo);
    this.documento = '';
  }

  onDocumentoInput(event: Event): void {
    const digitos = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    this.documento =
      this.tipoPessoa() === 'fisica'
        ? this.mascararCpf(digitos)
        : this.mascararCnpj(digitos);
  }

  onTelefoneInput(event: Event): void {
    const digitos = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    this.telefone = this.mascararTelefone(digitos);
  }

  private mascararCpf(digitos: string): string {
    return digitos
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  private mascararCnpj(digitos: string): string {
    return digitos
      .slice(0, 14)
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }

  private mascararTelefone(digitosBrutos: string): string {
    const digitos = digitosBrutos.slice(0, 11);
    if (digitos.length <= 10) {
      return digitos
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
    }
    return digitos
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
  }

  // O <input type="date"> guarda/envia o valor em ISO (AAAA-MM-DD); esse
  // getter converte pro formato BR pra ir assim no e-mail (ver campo oculto
  // "data_preferida" no template).
  get dataPreferidaBr(): string {
    if (!this.dataPreferida) return '';
    const [ano, mes, dia] = this.dataPreferida.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  get documentoValido(): boolean {
    const digitos = this.documento.replace(/\D/g, '');
    return this.tipoPessoa() === 'fisica'
      ? digitos.length === 11
      : digitos.length === 14;
  }

  get emailValido(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim());
  }

  get telefoneValido(): boolean {
    return this.telefone.replace(/\D/g, '').length >= 10;
  }

  get formularioValido(): boolean {
    return (
      this.nome.trim().length > 1 &&
      this.documentoValido &&
      this.endereco.trim().length > 3 &&
      this.emailValido &&
      this.telefoneValido
    );
  }

  async enviar(): Promise<void> {
    this.tentouEnviar.set(true);
    if (!this.formularioValido || this.status() === 'enviando') {
      return;
    }

    this.status.set('enviando');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        this.formRef.nativeElement,
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      this.status.set('sucesso');
      this.fechar();
      this.reiniciar();
      this.mostrarToast(
        'sucesso',
        'Solicitação enviada! Nossa equipe vai entrar em contato em breve.',
      );
    } catch (erro) {
      console.error('Erro ao enviar solicitação de orçamento:', erro);
      this.status.set('erro');
      this.mostrarToast(
        'erro',
        'Não conseguimos enviar sua solicitação agora. Tente novamente.',
      );
    }
  }

  private mostrarToast(tipo: Toast['tipo'], mensagem: string): void {
    this.toast.set({ tipo, mensagem });
    clearTimeout(this.toastTimeoutId);
    this.toastTimeoutId = setTimeout(() => this.toast.set(null), DURACAO_TOAST_MS);
  }

  private reiniciar(): void {
    this.nome = '';
    this.documento = '';
    this.endereco = '';
    this.email = '';
    this.telefone = '';
    this.descricao = '';
    this.dataPreferida = '';
    this.horaPreferida = '';
    this.tentouEnviar.set(false);
    this.status.set('idle');
    this.formRef?.nativeElement?.reset();
  }
}
