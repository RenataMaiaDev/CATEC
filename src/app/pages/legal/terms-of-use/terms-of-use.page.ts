import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../../components/footer/footer.component';
import { TermsContentComponent } from './terms-content.component';

@Component({
  selector: 'app-terms-of-use',
  standalone: true,
  imports: [RouterLink, FooterComponent, TermsContentComponent],
  templateUrl: './terms-of-use.page.html',
  styleUrl: './terms-of-use.page.scss',
})
// Standalone /termos-de-uso page: page chrome around the shared terms content.
export class TermsOfUsePage {}
