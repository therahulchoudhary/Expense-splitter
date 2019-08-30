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
  averageAmount : number = 0;
  tempValTotalCount : number=0;
  pendingamount : number[] = [];
  opponent : string[] = [];
  mergedArray : any;  
  payersArray : any[] =[];
  reportCardShow : boolean = false;
  showReportButton : boolean = true;

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
        let howMuchValue = val.persons[i].howMuchs[j].howMuch;
        if(howMuchValue.length>0){
          this.tempValIndividualCount += parseInt(howMuchValue);
        }
        else{
          this.tempValIndividualCount += 0;
        }
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
    console.log(this.form.value.persons[0].personName);
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
    var tempDeleteIndividualValue = this.form.value.persons[indexP].howMuchs[indexH].howMuch;
    var tempTotalAmount = this.form.value.persons[indexP].howMuchs[indexH].howMuch;
    if(tempTotalAmount.length>0){
      this.totalAmount -=parseInt(tempTotalAmount);
    }
    else{
      this.totalAmount -= 0;
    }
    if(tempDeleteIndividualValue.length>0){
      this.individualTotal[indexP]-=parseInt(tempDeleteIndividualValue);
    }
    else{
      this.individualTotal[indexP]-= 0;
    }
    const control = (<FormArray>this.form.controls['persons']).at(indexP).get('howMuchs') as FormArray;
    control.removeAt(indexH);
  }
  createNewKeyValuePair(){
     var columns = this.form.value.persons;
     var rows = this.individualTotal;
     var result =  rows.reduce(function(result, field, index) {
      result[columns[index].personName] = field;
      return result;
     }, {});
    return result;
   }
  calculateExpense() {
    // var i;
    // var j;
    this.averageAmount = this.totalAmount/this.individualTotal.length;
    // for(i=0;i<this.form.value.persons.length;i++){
    //   if(this.averageAmount===this.individualTotal[i]){
    //     this.pendingamount[i]=0;
    //   }
    //   else{
    //     this.pendingamount[i]=this.individualTotal[i]-this.averageAmount;
    //     for(j=1;j<this.form.value.persons.length;j++){
    //       if(this.averageAmount<this.individualTotal[j]){
    //         // this.pendingamount[i]+=this.individualTotal[j]-this.averageAmount;
    //         this.opponent[i]=this.form.value.persons[j].personName;
    //       }
    //     }
    //   }
    // }
    this.mergedArray = this.createNewKeyValuePair();
    console.log(this.mergedArray,"merged array");
    console.log(this.averageAmount,"averageamount");  
  }
  splitPayments(var_array) {
    const people = Object.keys(var_array);
    const sortedPeople = people.sort((personA, personB) => var_array[personA] - var_array[personB]);
    console.log(sortedPeople);
    const sortedValuesPaid = sortedPeople.map((person) => var_array[person] - this.averageAmount);
    this.reportCardShow = true;
    this.showReportButton = false;
    
    let i = 0;
    let j = sortedPeople.length - 1;
    let debt;
  
    while (i < j) {
      var payersObject = {
        payer:"",
        payee:"",
        amount:""
      }
      debt = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;
     
      console.log(`${sortedPeople[i]} owes ${sortedPeople[j]} ${debt}`);
      payersObject.payer = sortedPeople[i];
      payersObject.payee = sortedPeople[j];
      payersObject.amount = debt;
      this.payersArray.push(payersObject);
      if (sortedValuesPaid[i] === 0) {
        i++;
      }
  
      if (sortedValuesPaid[j] === 0) {
        j--;
      }
    }
    console.log(this.payersArray);  
  }  
}
