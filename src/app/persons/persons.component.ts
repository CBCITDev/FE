import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
})
export class PersonsComponent implements OnInit{
  constructor() {}

  ngOnInit(): void {
  }
  
  public name: string = '';
  public event: any;

  @Output() nameSubmittedEventEmitter = new EventEmitter<string>();

  onChange(UpdatedName : string) :void {
    this.name = UpdatedName;
  }

  onSubmit(): void {
    this.nameSubmittedEventEmitter.emit(this.name);
  }

  omit_special_char(event: { charCode: any; }) {   
   var k;  
   k = event.charCode;  
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 32 ); 
}

}
