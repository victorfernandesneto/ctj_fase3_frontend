import { Component, EventEmitter, Output } from '@angular/core';
import { PrimaryInputComponent } from '../primary-input/primary-input.component';

@Component({
  selector: 'app-variant-input',
  standalone: true,
  imports: [],
  templateUrl: './variant-input.component.html',
  styleUrl: './variant-input.component.scss'
})
export class VariantInputComponent extends PrimaryInputComponent{
  @Output("submit") onSubmit = new EventEmitter<string>();
  
  
  override onInput(event: Event){
    const value = (event.target as HTMLInputElement).value
    this.value = value
  }
  
  submit() {
    const userInput = this.value;
    console.log(userInput);
    this.onSubmit.emit(userInput);
  }
}
