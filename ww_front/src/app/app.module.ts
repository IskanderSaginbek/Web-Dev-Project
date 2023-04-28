import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { BasketComponent } from './basket/basket.component';
import { AboutComponent } from './footer_links/about/about.component';
import { HelpComponent } from './footer_links/help/help.component';
import { NewsComponent } from './footer_links/news/news.component';
import { SitemapComponent } from './footer_links/sitemap/sitemap.component';
import { PrivacyComponent } from './footer_links/privacy/privacy.component';
import { TermsComponent } from './footer_links/terms/terms.component';
import { CookiesComponent } from './footer_links/cookies/cookies.component';
import { ContactsComponent } from './footer_links/contacts/contacts.component';
import { MfrsComponent } from './mfrs/mfrs.component';
import { MfrComponent } from './mfr/mfr.component';
import { MfrProfileComponent } from './mfr-profile/mfr-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPrefComponent } from './user-pref/user-pref.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { MfrPrefComponent } from './mfr-pref/mfr-pref.component';
import { MfrHistoryComponent } from './mfr-history/mfr-history.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AlterProductComponent } from './alter-product/alter-product.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { SignupMfrComponent } from './signup-mfr/signup-mfr.component';
import { LoginComponent } from './login/login.component';
import { LoginMfrComponent } from './login-mfr/login-mfr.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    CategoriesComponent,
    CategoryComponent,
    ProductComponent,
    BasketComponent,
    AboutComponent,
    HelpComponent,
    NewsComponent,
    SitemapComponent,
    PrivacyComponent,
    TermsComponent,
    CookiesComponent,
    ContactsComponent,
    MfrsComponent,
    MfrComponent,
    MfrProfileComponent,
    UserProfileComponent,
    UserPrefComponent,
    UserHistoryComponent,
    MfrPrefComponent,
    MfrHistoryComponent,
    AddProductComponent,
    AlterProductComponent,
    SearchComponent,
    SignupComponent,
    SignupMfrComponent,
    LoginComponent,
    LoginMfrComponent,
    NotfoundComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
