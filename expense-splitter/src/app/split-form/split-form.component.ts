import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-split-form',
  templateUrl: './split-form.component.html',
  styleUrls: ['./split-form.component.css']
})
export class SplitFormComponent implements OnInit {
  tcode : string;
  amountCode : string;
  form: FormGroup;
  individualTotal : number[] = [];
  tempValIndividualCount : number=0;
  totalAmount : number=0;
  tempValTotalCount : number=0;
  
  amountvalue : string;
  constructor(private fb : FormBuilder) { }
  ngOnInit() {
    this.form = this.fb.group({
      'persons': this.fb.array([
        this.initPerson()
      ])
    });
  }
  send(value){
    this.addIndividualTotalAmount(value);
  }
  addIndividualTotalAmount(val){
    var i;
    var j;
    for(i=0;i<val.persons.length;i++){
      this.tempValIndividualCount=0;
      for(j=0;j<val.persons[i].howMuchs.length;j++){
        this.tempValIndividualCount += parseInt(val.persons[i].howMuchs[j].howMuch);
      }
      this.individualTotal[i] = this.tempValIndividualCount;
    }
  }
  countTotalAmount(){
    var i;
    this.tempValTotalCount = 0;
    for(i=0;i<this.individualTotal.length;i++){
      this.tempValTotalCount += this.individualTotal[i];
    } 
    this.totalAmount = this.tempValTotalCount;
  }
  initPerson() {
    return this.fb.group({
      'personName': ['', [Validators.required]],
      'howMuchs': this.fb.array([
        this.initAmount()
      ])
    })
  }
  initAmount() {
    return this.fb.group({
      'howMuch': ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
    })
  }
  addPerson() {
    var i;
    var temp = parseInt(this.tcode);
    temp = temp/10;
    const control = <FormArray>this.form.controls['persons'];
    for(i=0;i<temp;i++){
      control.push(this.initPerson());   
    }
  }
  addAmount(index) {
    const control = (<FormArray>this.form.controls['persons']).at(index).get('howMuchs') as FormArray;
      control.push(this.initAmount());  
  }
  deleteAmount(indexH,indexP){
    this.individualTotal[indexP]-=parseInt(this.form.value.persons[indexP].howMuchs[indexH].howMuch);
    const control = (<FormArray>this.form.controls['persons']).at(indexP).get('howMuchs') as FormArray;
    control.removeAt(indexH);
  }
}
