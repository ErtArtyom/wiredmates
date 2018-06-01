import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Details } from '../../models/details';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ImageDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[image]' // Attribute selector
})
export class ImageDirective {
  private renderedElement: any;

  constructor (private renderer: Renderer2,
               private el: ElementRef,
               private auth: AuthProvider) {
    console.log('Hello ImageDirective Directive');
  }

  @Input('size') size: string = 'l';

  @Input() set card (details: Details) {
    if (this.renderedElement) {
      this.renderer.removeChild(this.el.nativeElement, this.renderedElement);
    }

    if (details.photo) {
      this.renderedElement = this.renderer.createElement('img');
      this.renderer.setAttribute(this.renderedElement, 'src', this.auth.domain + 'uploads/profiles/images/' + details.photo + '.' + this.size + '.' + details.photoType);
      this.renderer.appendChild(this.el.nativeElement, this.renderedElement);
    } else if (details.firstName && details.lastName) {
      this.renderedElement = this.renderer.createElement('strong');
      const text = this.renderer.createText((details.firstName.charAt(0) + details.lastName.charAt(0)).toUpperCase());
      this.renderer.appendChild(this.renderedElement, text);
      this.renderer.appendChild(this.el.nativeElement, this.renderedElement);
    }
  }
}
