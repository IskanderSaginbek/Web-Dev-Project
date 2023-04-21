import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ShippingsComponent } from './shippings/shippings.component';
import { BasketComponent } from './basket/basket.component';
import { AboutComponent } from './footer_links/about/about.component';
import { HelpComponent } from './footer_links/help/help.component';
import { NewsComponent } from './footer_links/news/news.component';
import { SitemapComponent } from './footer_links/sitemap/sitemap.component';
import { PrivacyComponent } from './footer_links/privacy/privacy.component';
import { TermsComponent } from './footer_links/terms/terms.component';
import { CookiesComponent } from './footer_links/cookies/cookies.component';
import { ContactsComponent } from './footer_links/contacts/contacts.component';

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
    ShippingsComponent,
    BasketComponent,
    AboutComponent,
    HelpComponent,
    NewsComponent,
    SitemapComponent,
    PrivacyComponent,
    TermsComponent,
    CookiesComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
