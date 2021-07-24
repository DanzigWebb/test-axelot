import { Component } from '@angular/core';
import { HeaderService } from '@components/header/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public canUpdate$ = this.service.canUpdateData$;
  public showControl$ = this.service.isLogin$;

  constructor(
    private service: HeaderService
  ) {
  }

  updateForm(): void {
    this.service.emitForm();
  }

  updateData(): void {
    this.service.emitData();
  }

  logOut(): void {
    this.service.logOut();
  }
}
