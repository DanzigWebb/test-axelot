import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@components/header/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private service: HeaderService
  ) {
  }

  ngOnInit(): void {
  }

  emitUpdateForm(): void {
    this.service.emitForm();
  }

  emitUpdateData(): void {
    this.service.emitData();
  }
}
