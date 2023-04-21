import {Component, OnInit} from '@angular/core';
import { user, cart_item, history_item, mfr, comment, category, shipment, product} from '../interfaces';
import {Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private router: Router) {
  }
  title = 'ww_front';
  ngOnInit() {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0)
        }
      }
      );
  }
}

export class Constants {
  private static d = new Date("2023-01-01");
  public static u : user = { //later will be replaced with actual user data
    email : "example@user.com",
    username : "string",
    password : "string",
    fname : "string",
    lname : "string",
    phone : "string",
    card_num : "string",
    exp_date : this.d,
    ver_num : "string",
    address : "string",
    img : "string",
    allow_news : true,
    pref_cat : [0,1],
    pref_price : [100,1000],
    only_available : false,
  }
  public static cats : category[] = [ //ditto
    {
      name : "Resistors",
      descr : "Various types of resistive elements including carbon film resistors, wirewound resistors, variable potentiometers, trimpots, SMD resistors, etc.",
      descr_short : "Carbon-film, high-power resistors, potentiometers.",
      image : "../assets/cat_thumbnails/437341603_37753bc6b2_b.jpg",
    },
    {
      name : "Capacitors",
      descr : "Different types of capacitors, such as ceramic disc, plastic film, electrolytic, etc. of various capacitance values ranging from a few pico-farads to a few dozens micro-farads.",
      descr_short : "Ceramic disc, plastic film, tantalum, glass, aluminum capacitors.",
      image : "../assets/cat_thumbnails/Capacitors_(7189597135).jpg",
    },
    {
      name : "Inductors",
      descr : "Coils, chokes, axial, SMD, sintered ferrite, and other types of inductors. Available in different inductance values.",
      descr_short : "Coils, chokes, axial, SMD, sintered ferrite inductors.",
      image : "../assets/cat_thumbnails/current-inductance-circuit-pcb-electronics-coil.jpg",
    },
    {
      name : "Transistors",
      descr : "Discrete semiconductor devices that can be used as electronic switches and/or amplifiers. Both BJT and FET transistors are available in various packaging.",
      descr_short : "NPN&PNP BJTs, P-Channel&N-Channel FETs.",
      image : "../assets/cat_thumbnails/MOSFET_transistors.jpg",
    },
    {
      name : "IC's",
      descr : "At Wired World you can find Integrated Circuits of different families including mostly lower power Schottky TTL but also High power CMOS IC's.",
      descr_short : "54/74 series semiconductor integrated circuits of different specifications.",
      image : "../assets/cat_thumbnails/Microchips.jpg",
    },
    {
      name : "LEDs&diodes",
      descr : "Various types of both SMD and through-hole diodes, including Zener diodes, Schottky diodes and a plethora of different LEDs of various wavelengths.",
      descr_short : "Diodes, Zener diodes, Schottky diodes, LEDs.",
      image : "../assets/cat_thumbnails/437341293_be6c2f3190_b.jpg",
    },
    {
      name : "Wires&Cables",
      descr : "All kinds of solid and stranded wires for different purposes. Cables of popular standards including HDMI, VGA, USB, Ethernet cables.",
      descr_short : "Coaxial, opto-fibre, jumper wires, HDMI, VGA, USB, Ethernet cables.",
      image : "../assets/cat_thumbnails/network-cables-line-network-connector-cable.jpg",
    },
    {
      name : "Connectors",
      descr : "Numerous connectors are present including but not limited to I/O connectors, Audio&Video connectors and USB connectors.",
      descr_short : "I/O connectors, Audio&Video connectors, USB connectors.",
      image : "../assets/cat_thumbnails/Audio_Video_connectors.jpg",
    },
    {
      name : "Power",
      descr : "Power related components like transformers, batteries, solar cells, AC to DC converters, etc.",
      descr_short : "Transformers, batteries and other power components.",
      image : "../assets/cat_thumbnails/Philips_N4422_-_power_supply_transformer-2098.jpg",
    },
    {
      name : "Memory",
      descr : "A variety of memory devices such as PROM, EPROM, EEPROM IC's as well as SSD and HDD devices.",
      descr_short : "ROM and secondary storage devices.",
      image : "../assets/cat_thumbnails/Super_Talent_2.5in_SATA_SSD_SAM64GM25S.jpg",
    },
  ]
}
