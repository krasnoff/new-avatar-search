import { Component } from '@angular/core';
import {AppService} from './app.service';

//main component of the screen
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  title = 'avatar-search';
  txtFullName: string;

  items: Array<any> = [];

  constructor(private _httpService:AppService) { }

  // press the seach button
  search() {
    this._httpService.getMethod("https://api.github.com/search/repositories?q=" + encodeURI(this.txtFullName))
        .subscribe (
          data => {
            data.items.forEach(element => {
              this.items.push(element);
            });
          },
          error => {
            alert(error._body);
          }
        );
  }

  // add to bookmark
  bookmark(obj: any) 
  {
    localStorage.setItem(obj.id, JSON.stringify(obj));
  }

  // fetch from bookmarks
  getBookmarks()
  {
    this.items = this.allStorage();
  }

  private allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( JSON.parse(localStorage.getItem(keys[i])) );
    }

    return values;
  }
}
