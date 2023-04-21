import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CategoriesComponent} from "./categories/categories.component";
import {SitemapComponent} from "./footer_links/sitemap/sitemap.component";
import {HelpComponent} from "./footer_links/help/help.component";
import {TermsComponent} from "./footer_links/terms/terms.component";
import {ContactsComponent} from "./footer_links/contacts/contacts.component";
import {NewsComponent} from "./footer_links/news/news.component";
import {PrivacyComponent} from "./footer_links/privacy/privacy.component";
import {CookiesComponent} from "./footer_links/cookies/cookies.component";
import {AboutComponent} from "./footer_links/about/about.component";

const routes: Routes = [
  {path : 'home', component: HomeComponent},
  {path : 'categories', component: CategoriesComponent},
  {path : 'about', component: AboutComponent},
  {path : 'help', component: HelpComponent},
  {path : 'news', component: NewsComponent},
  {path : 'sitemap', component: SitemapComponent},
  {path : 'privacy', component: PrivacyComponent},
  {path : 'terms', component: TermsComponent},
  {path : 'cookies', component: CookiesComponent},
  {path : 'contacts', component: ContactsComponent},
  {path : '', redirectTo: 'home', pathMatch : "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
