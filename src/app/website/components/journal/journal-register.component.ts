import { Component, OnInit } from "@angular/core";

@Component ({
  selector: 'app-journal-request',
  templateUrl: './journal-request.component.html',
})

export class JournalRegisterComponent implements OnInit {

  ngOnInit(): void {
    console.log('register');
  }
}
