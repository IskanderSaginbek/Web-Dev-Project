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
import {MfrsComponent} from "./mfrs/mfrs.component";
import {MfrComponent} from "./mfr/mfr.component";
import {CategoryComponent} from "./category/category.component";
import {ProductComponent} from "./product/product.component";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {SignupMfrComponent} from "./signup-mfr/signup-mfr.component";
import {LoginMfrComponent} from "./login-mfr/login-mfr.component";
import {BasketComponent} from "./basket/basket.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {MfrProfileComponent} from "./mfr-profile/mfr-profile.component";

const routes: Routes = [
  {path : 'home', component: HomeComponent},
  {path : 'about', component: AboutComponent},
  {path : 'help', component: HelpComponent},
  {path : 'news', component: NewsComponent},
  {path : 'sitemap', component: SitemapComponent},
  {path : 'privacy', component: PrivacyComponent},
  {path : 'terms', component: TermsComponent},
  {path : 'cookies', component: CookiesComponent},
  {path : 'contacts', component: ContactsComponent},
  {path : 'manufacturers', component: MfrsComponent},
  {path : 'manufacturers/:mfrId', component: MfrComponent},
  {path : 'categories', component: CategoriesComponent},
  {path : 'categories/:catId', component: CategoryComponent},
  {path : 'categories/:catId/:prodId', component: ProductComponent},
  {path : 'signup', component: SignupComponent},
  {path : 'login', component: LoginComponent},
  {path : 'signup-mfr', component: SignupMfrComponent},
  {path : 'login-mfr', component: LoginMfrComponent},
  {path : 'basket', component: BasketComponent},
  {path : 'profile', component: UserProfileComponent},
  {path : 'profile-mfr', component: MfrProfileComponent},
  {path : '', redirectTo: 'home', pathMatch : "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
