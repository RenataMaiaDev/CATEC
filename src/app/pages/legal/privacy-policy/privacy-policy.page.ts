import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../../components/footer/footer.component';
import { PrivacyContentComponent } from './privacy-content.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterLink, FooterComponent, PrivacyContentComponent],
  templateUrl: './privacy-policy.page.html',
  styleUrl: './privacy-policy.page.scss',
})
// Standalone /politica-de-privacidade page: page chrome around the shared privacy content.
export class PrivacyPolicyPage {}
