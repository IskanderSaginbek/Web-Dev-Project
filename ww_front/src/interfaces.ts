export interface product {
  imgs : string[]; //list of image addresses (1st one is the thumbnail)
  ds : string; //link to datasheet
  name : string;
  descr : string; //on the page of a product
  descr_short : string; //on the search page
  sub_cat : string; //subcategory
  price : number;
  amount : number;
  mfr_id : number; //manufacturer id
}

export interface resistor extends product {
  resistance : number;
  power : number;
  tolerance : number;
}

export interface capacitor extends product {
  capacitance : number;
  vdc : number; //voltage ratings: dc/ac
  vac : number;
}

export interface transistor extends product {
  tech : string; //technology
  package : string;
  voltage : number;
}

export interface inductor extends product {
  inductance : number;
  tolerance : number;
  current : number;
}

export interface diode extends product {
  color : string;
  lum : number; //luminous intensity
  vf : number; //forward voltage
}

export interface ic extends product {
  package : string;
  tech : string;
}

export interface wire extends product {
  length : number;
  voltage : number;
  package : string;
}

export interface connector extends product {
  standard : string;
  current : number;
}

export interface power extends product {
  voltage : number;
  capacity: number;
}

export interface memory extends product {
  size : number;
  int_type : string; //interface type
}
