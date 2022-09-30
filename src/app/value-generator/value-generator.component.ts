import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { ValueOption } from '../shared/models/secret.model';
import { SecretService } from '../shared/services/Secret.service';

@Component({
  selector: 'app-value-generator',
  templateUrl: './value-generator.component.html',
  styleUrls: ['./value-generator.component.scss']
})
export class ValueGeneratorComponent implements OnInit 
{

  value: string = '';

  options: ValueOption = {
    length:      16,
    lowerCase:   4,
    upperCase:   4,
    digitCase:   4,
    specialCase: 4,
  }

  constructor(private ss: SecretService) { }

  ngOnInit(): void {
  }

  generateValue(): void
  {
    if(this.options.length > 65522)
      this.options.length = 65522;
    
    if(this.options.length < 0)
      this.options.length = 0;
    
    this.ss.generateSecret(this.options).pipe(first()).subscribe(
      res => this.value = res.secret
    );
  }

}
