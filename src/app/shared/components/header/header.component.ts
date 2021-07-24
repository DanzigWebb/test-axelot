import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@components/header/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public canUpdate$ = this.service.canUpdateData$;
  public showControl$ = this.service.isLogin$;

  constructor(
    private service: HeaderService
  ) {
  }

  ngOnInit(): void {
  }

  updateForm(): void {
    this.service.emitForm();
  }

  updateData(): void {
    this.service.emitData();
  }
}
