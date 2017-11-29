import { Component, OnInit } from '@angular/core';
import { JournalService } from '../../services/journal.service';

@Component({
  selector: 'app-journal-register',
  templateUrl: './journal-register.component.html',
  styleUrls: [ './journal-register.component.css' ],
  providers: [JournalService]
})

export class JournalRegisterComponent implements OnInit {

  ngOnInit(): void {
    console.log('register');
  }
}
