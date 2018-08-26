import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Root
import { AppComponent } from './app.component';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Feature Modules
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';

// Shared Services
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { httpInterceptorProviders } from './core/http-interceptors';

// import localeDe from '@angular/common/locales/de';
// import { registerLocaleData } from '@angular/common';

// // the second parameter 'de' is optional
// registerLocaleData(localeDe, 'de');

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    ProductsModule,
    CustomersModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    httpInterceptorProviders,
    // { provide: LOCALE_ID, useValue: 'de' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

