export interface product {
  id : number;
  cat_id : number; //category id
  mfr_id : number; //manufacturer id
  image : string; //list of image addresses (1st one is the thumbnail)
  datasheet? : string; //link to datasheet
  name : string;
  descr? : string; //on the page of a product
  descr_short : string; //on the search page
  sub_cat : string; //subcategory
  price : number;
  amount : number;
  rating: number; //added rating
  ratings_num : number;
  date : Date;
}
export interface category {
  id : number;
  name : string;
  descr : string;
  descr_short : string;
  image : string;
}
export interface comment {
  img? : string;
  username : string;
  id : number;
  user_id : number;
  prod_id : number;
  text : string;
  date : Date;
}
export interface cart_item {
  id : number;
  prod_id : number;
  cat_id : number;
  name : string;
  thumbnail : string;
  quantity : number;
  available : number;
  price : number;
}
export interface history_item {
  id : number;
  user_id : number;
  prod_id : number;
  ship_id : number;
  quantity : number;
  price : number;
  date : Date;
  status : number;
}
export interface shipment {
  id : number;
  name : string;
  descr : string;
  days : number;
  price : number;
}
export interface user {
  id : number;
  email : string;
  username : string;
  password : string;
  fname : string;
  lname : string;
  phone : string;
  card_num : string;
  exp_date : Date;
  ver_num : string;
  address : string;
  img : string;
  allow_news : boolean;
  pref_cat? : number; //cat_id
  only_available : boolean;
}
export interface mfr {
  id : number;
  email : string;
  name : string;
  password : string;
  descr : string;
  phone : string;
  card_num : string;
  exp_date : Date;
  ver_num : string;
  address : string;
  img : string;
  allow_news : boolean;
}
