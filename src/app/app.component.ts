import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  posts = [
    {
      title: 'Neat Tree',
      username: 'nature',
      content: 'Saw this awesome tree during my hike today',
      imageUrl: 'assets/img/tree.jpeg',
    },
    {
      title: 'Snowy Mountain',
      username: 'mountainlover',
      content: 'Here is a picture of a snowy mountain',
      imageUrl: 'assets/img/mountain.jpeg',
    },
    {
      title: 'Mountain Biking',
      username: 'biking1234',
      content: 'I did some biking today, yihaa!!!',
      imageUrl: 'assets/img/biking.jpeg',
    },
  ];
}
