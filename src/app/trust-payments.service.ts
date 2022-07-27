import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone } from '@angular/core';
import { WINDOW } from 'ngx-window-token';
import { Observable, ReplaySubject, take } from 'rxjs';
import { TrustedPaymentsResource } from './trust-payments.resource';

type Callback = ((event: ITrustPaymentsEvent) => void);

export interface ITrustPaymentsEvent {
  [key: string]: string;
}

type SecureTradingFactory = (config: {
  jwt: string,
  submitCallback?: Callback,
  successCallback?: Callback,
  errorCallback?: Callback,
  cancelCallback?: Callback,
  submitOnCancel?: boolean,
  submitOnError?: boolean,
  submitOnSuccess?: boolean
}) => ISecureTrading;

interface ITrustedPaymentsWindow {
  SecureTrading: SecureTradingFactory;
}

interface ISecureTrading {
  Components(): void;
}

type EventHandlerNonNull = ((this: GlobalEventHandlers, ev: Event) => any);

@Injectable({ providedIn: 'root' })
export class TrustedPaymentsService {

  private readonly secureTrading$: ReplaySubject<SecureTradingFactory> = new ReplaySubject(1);

  constructor(@Inject(DOCUMENT) private readonly document: Document,
    @Inject(WINDOW) private readonly window: ITrustedPaymentsWindow,
    private readonly trustedPaymentsResource: TrustedPaymentsResource,
    private ngZone: NgZone) { }

  public initialise(): void {
    this.lazyLoadResources('https://cdn.eu.trustpayments.com/js/latest/st.js', () => {

      const secureTrading = this.window.SecureTrading;
      
      if (!!secureTrading) {
        this.secureTrading$.next(secureTrading);
      }
    });
  }

  public getSecureTrading(): Observable<SecureTradingFactory> {
    return this.secureTrading$.pipe(take(1));
  }

  private lazyLoadResources(scriptUrl: string, onload: EventHandlerNonNull): void {
    const scriptId = 'trust-payments-script';

    if (!!this.document) {
      if (!this.document.getElementById(scriptId)) {
        this.loadScript(scriptUrl, scriptId, onload);
      }
    }
  }

  private loadScript(scriptUrl: string, scriptId: string, onLoad: EventHandlerNonNull): void {
    const script = this.document.createElement('script');
    script.async = true;
    script.src = scriptUrl;
    script.onload = onLoad;
    script.id = scriptId;

    this.document.body.appendChild(script);
  }
}
