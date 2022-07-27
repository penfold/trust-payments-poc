import { AfterViewInit, Component } from '@angular/core';
import { TrustedPaymentsResource } from './trust-payments.resource';
import { ITrustPaymentsEvent, TrustedPaymentsService } from './trust-payments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
  title = 'trust-payments-poc';

  constructor(private readonly trustedPaymentsService: TrustedPaymentsService,
    private readonly trustedPaymentsResource: TrustedPaymentsResource) { }

  ngAfterViewInit(): void {
    this.trustedPaymentsService.initialise();

    this.trustedPaymentsService.getSecureTrading().subscribe(factory => {

      this.trustedPaymentsResource.getPaymentJwt().subscribe(jwt => {
        var st = factory({
          jwt,
          submitCallback: this.submitCallback,
          successCallback: this.successCallback,
          errorCallback: this.errorCallback,
          cancelCallback: this.cancelCallback,
          submitOnCancel: false,
          submitOnError: false,
          submitOnSuccess: false
        });
        st.Components();
      });
    });
  }

  private submitCallback(event: ITrustPaymentsEvent): void {

  }

  private successCallback(event: ITrustPaymentsEvent): void {

  }

  private errorCallback(event: ITrustPaymentsEvent): void {

  }

  private cancelCallback(event: ITrustPaymentsEvent): void {

  }
}
