import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appRepeat]'
})
export class RepeatDirective {

  constructor(private template: TemplateRef<any>, private container: ViewContainerRef) {
  }

  @Input()
  set appRepeat(times: number) {
    for (let index = 0; index < times; index++) {
      this.container.createEmbeddedView(this.template);
    }
  }

}
