import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextSearchRequest } from 'src/app/models/text-search-request';
import { SearchService } from 'src/app/services/search.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.css']
})
export class TextSearchComponent implements OnInit {

  systemUp = false;
  defaultSentanceValue = 'Coders who code don\'t always eat cod. Exclaimed the coder who codes CODE.';

  textSearchForm = new FormGroup({
    sentence: new FormControl(this.defaultSentanceValue, Validators.required),
    searchWord: new FormControl('', Validators.required),
    fullWordSearch: new FormControl(false),
    caseSensitiveSerch: new FormControl(false)
  });

  constructor(
    private searchService: SearchService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.searchService.healthCheck().subscribe(result => {
      console.log(result);

      if (result.responseObject) {
        this.systemUp = true;
      }
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.textSearchForm.value);

    const request: TextSearchRequest = {
      sentence: this.textSearchForm.value.sentence as string,
      searchWord: this.textSearchForm.value.searchWord as string,
      fullWordSearch: this.textSearchForm.value.fullWordSearch as boolean,
      caseSensitiveSearch: this.textSearchForm.value.caseSensitiveSerch as boolean
    }

    this.searchService.searchText(request).subscribe(result => {
      console.log(result);

      if (result.success) {
        var matches = parseInt(result.responseObject.totalMatches);
        var message = '';

        switch (matches) {
          case 0:
            message = 'There are no matches!';
            break;
          case 1:
            message = 'There is 1 match!';
            break;
          default:
            message = 'There are ' + matches + ' matches!';
            break;
        }
        
        this.snackBar.open(message, 'Close', {
          duration: 3000
        });
      } else {
        this.snackBar.open('ERROR: ' + result.message, 'Close', {
          duration: 3000
        });
      }
      
    });

  }

  resetForm() {
    this.clearForm();
    this.textSearchForm.controls.sentence.setValue(this.defaultSentanceValue);
    
  }

  clearForm() {
    this.textSearchForm.reset();
    this.textSearchForm.controls.fullWordSearch.setValue(false);
    this.textSearchForm.controls.caseSensitiveSerch.setValue(false);
  }
}
