import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-split-form',
  templateUrl: './split-form.component.html',
  styleUrls: ['./split-form.component.css']
})
export class SplitFormComponent implements OnInit {
  personsForm : FormGroup;
  individualTotal : number=0;
  tcode : string;
  arrayValue : string;
  previousValue : number=0;
  constructor(private fb : FormBuilder) {
    var i;
    // this.personsForm = this.fb.group({
    //   howMuch: this.fb.array([
    //     this.fb.control(null)
    //   ])      
    // });   
    this.personsForm = this.fb.group({
      person: this.fb.array([
        this.fb.control(null)
      ]),
      howMuch: this.fb.array([
        this.fb.control(null)
      ])
    });
  }
  // findIndividualTotal(){
  //   var temp = parseInt(this.tcode);
  //   this.individualTotal = temp;
  //   this.previousValue = this.individualTotal;
  //   console.log(this.individualTotal);
  // }
  // countIndividualTotal(){
  //   var temp = parseInt(this.tcode);
  //   if(this.individualTotal!=this.previousValue){
  //     this.individualTotal +=temp;
  //   }
  //   else{
  //     this.individualTotal =this.previousValue;
  //   }
  // }
  addMoreExpense(){
    (this.personsForm.get('howMuch') as FormArray).push(
      this.fb.control(null)
    );
  }
  addMorePerson(){
    var i;
    var limit = parseInt(this.tcode);
    for(i=0;i<limit;i++){
      (this.personsForm.get('person') as FormArray).push(
        this.fb.control(null)
      )
    }
  }
  removeExpense() {
    (this.personsForm.get('howMuch') as FormArray).removeAt(1);
  }

  getExpenseFormControls(): AbstractControl[] {
    return (<FormArray> this.personsForm.get('howMuch')).controls
  }
  getPersonFormControls(): AbstractControl[] {
    return (<FormArray> this.personsForm.get('person')).controls
  }
  ngOnInit() {
  }

}
