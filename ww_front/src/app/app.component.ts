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
    id : 0,
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
    img : "",
    allow_news : true,
    pref_cat : [0,1],
    pref_price : [100,1000],
    only_available : false,
  }
  public static cats : category[] = [ //ditto
    {
      id : 0,
      name : "Resistors",
      descr : "Various types of resistive elements including carbon film resistors, wirewound resistors, variable potentiometers, trimpots, SMD resistors, etc.",
      descr_short : "Carbon-film, high-power resistors, potentiometers.",
      image : "../assets/cat_thumbnails/437341603_37753bc6b2_b.jpg",
    },
    {
      id : 1,
      name : "Capacitors",
      descr : "Different types of capacitors, such as ceramic disc, plastic film, electrolytic, etc. of various capacitance values ranging from a few pico-farads to a few dozens micro-farads.",
      descr_short : "Ceramic disc, plastic film, tantalum, glass, aluminum capacitors.",
      image : "../assets/cat_thumbnails/Capacitors_(7189597135).jpg",
    },
    {
      id : 2,
      name : "Inductors",
      descr : "Coils, chokes, axial, SMD, sintered ferrite, and other types of inductors. Available in different inductance values.",
      descr_short : "Coils, chokes, axial, SMD, sintered ferrite inductors.",
      image : "../assets/cat_thumbnails/current-inductance-circuit-pcb-electronics-coil.jpg",
    },
    {
      id : 3,
      name : "Transistors",
      descr : "Discrete semiconductor devices that can be used as electronic switches and/or amplifiers. Both BJT and FET transistors are available in various packaging.",
      descr_short : "NPN&PNP BJTs, P-Channel&N-Channel FETs.",
      image : "../assets/cat_thumbnails/MOSFET_transistors.jpg",
    },
    {
      id : 4,
      name : "IC's",
      descr : "At Wired World you can find Integrated Circuits of different families including mostly lower power Schottky TTL but also High power CMOS IC's.",
      descr_short : "54/74 series semiconductor integrated circuits of different specifications.",
      image : "../assets/cat_thumbnails/Microchips.jpg",
    },
    {
      id : 5,
      name : "LEDs&diodes",
      descr : "Various types of both SMD and through-hole diodes, including Zener diodes, Schottky diodes and a plethora of different LEDs of various wavelengths.",
      descr_short : "Diodes, Zener diodes, Schottky diodes, LEDs.",
      image : "../assets/cat_thumbnails/437341293_be6c2f3190_b.jpg",
    },
    {
      id : 6,
      name : "Wires&Cables",
      descr : "All kinds of solid and stranded wires for different purposes. Cables of popular standards including HDMI, VGA, USB, Ethernet cables.",
      descr_short : "Coaxial, opto-fibre, jumper wires, HDMI, VGA, USB, Ethernet cables.",
      image : "../assets/cat_thumbnails/network-cables-line-network-connector-cable.jpg",
    },
    {
      id : 7,
      name : "Connectors",
      descr : "Numerous connectors are present including but not limited to I/O connectors, Audio&Video connectors and USB connectors.",
      descr_short : "I/O connectors, Audio&Video connectors, USB connectors.",
      image : "../assets/cat_thumbnails/Audio_Video_connectors.jpg",
    },
    {
      id : 8,
      name : "Power",
      descr : "Power related components like transformers, batteries, solar cells, AC to DC converters, etc.",
      descr_short : "Transformers, batteries and other power components.",
      image : "../assets/cat_thumbnails/Philips_N4422_-_power_supply_transformer-2098.jpg",
    },
    {
      id : 9,
      name : "Memory",
      descr : "A variety of memory devices such as PROM, EPROM, EEPROM IC's as well as SSD and HDD devices.",
      descr_short : "ROM and secondary storage devices.",
      image : "../assets/cat_thumbnails/Super_Talent_2.5in_SATA_SSD_SAM64GM25S.jpg",
    },
  ];
  public static mfrs : mfr[] = [{
    id : 0,
    email : "vishay@gmail.com",
    name : "Vishay BC Components",
    password : "12345",
    descr : "Vishay is one of the world’s most trusted manufacturers of electronic components." +
      "From discrete semiconductors to passive components and from the smallest diode to the most" +
      "powerful capacitor, Vishay’s breadth of products are the foundation that brings modern technology" +
      "to life. Vishay calls it The DNA of tech.™ This DNA is more than infrastructure for today’s most" +
      "vital electronic products, it’s a platform to enable growth. Vishay is well-positioned to propel" +
      "such timely macroeconomic growth drivers as sustainability, connectivity, and mobility. Vishay" +
      "generates the essential components that enable innovators to create the newest generation of" +
      "products in many sectors, including automotive, industrial, consumer, computer," +
      "telecommunications, military, aerospace, and medical.",
    phone : "+5 555 5555 5555",
    card_num : "0123456789abcdef",
    exp_date : new Date("1970-01-01"),
    ver_num : "1234",
    address : "Malvern, Pennsylvania",
    img : "../assets/mfrs/bccomponents.png",
    allow_news : true,
},
{
    id : 1,
    email : "bourns@gmail.com",
    name : "Bourns",
    password : "12345",
    descr : "Bourns is a leading manufacturer and supplier of automotive sensors," +
    "circuit protection solutions, magnetic products, microelectronic modules, trimming and" +
    "precision potentiometers, panel controls, encoders, and resistive products. Headquartered " +
    "in Riverside, CA, Bourns serves a broad range of markets, including telecommunications," +
    "computer, industrial, instrumentation, automotive, consumer, non-critical life support" +
    "medical, audio, and various other market segments. Bourns products are manufactured" +
    "according to ISO-9000 standards under Six Sigma quality programs. Bourns automotive products" +
    "are manufactured in accordance with IATF 16949",
    phone : "+5 555 5555 5554",
    card_num : "0123456789abcdef",
    exp_date : new Date("1970-01-01"),
    ver_num : "1234",
    address : "Riverside, CA",
    img : "../assets/mfrs/bourns.png",
    allow_news : true,
},
{
    id : 2,
    email : "gct@gmail.com",
    name : "Global Connector Technology",
    password : "12345",
    descr : "GCT (Global Connector Technology) is an established manufacturer of world-class" +
    "PCB connector and cable assembly solutions. With an extensive product range, companies trust GCT" +
    "to enable connectivity within their designs.",
    phone : "+5 555 5555 5553",
    card_num : "0123456789abcdef",
    exp_date : new Date("1970-01-01"),
    ver_num : "1234",
    address : "Garden City, New York",
    img : "../assets/mfrs/gct.png",
    allow_news : true,
},
{
    id : 3,
    email : "ti@gmail.com",
    name : "Texas Instruments",
    password : "12345",
    descr : "Texas Instruments Incorporated designs and manufactures analog technologies," +
    "digital signal processing (DSP) and microcontroller (MCU) semiconductors. TI is a leader in" +
    "semiconductor solutions for analog and digital embedded and applications processing. A global" +
    "semiconductor company, TI innovates through design, sales and manufacturing operations in more" +
    "than 30 countries.",
    phone : "+5 555 5555 5552",
    card_num : "0123456789abcdef",
    exp_date : new Date("1970-01-01"),
    ver_num : "1234",
    address : "Dallas, Texas",
    img : "../assets/mfrs/texas-instruments.png",
    allow_news : false,
},
{
    id : 4,
    email : "yageo@gmail.com",
    name : "YAGEO Group",
    password : "12345",
    descr : "YAGEO is a leading global electronic component company with capabilities on a" +
    "global scale, including 40 production site, 47 sales facilities, and 20 R&D centers across Asia," +
    "EMEA, and the Americas. YAGEO provides one-stop-shopping, offering a complete product portfolio" +
    "of resistors, capacitors, wireless, and circuit protection components to meet the diverse" +
    "requirements of customers.",
    phone : "+5 555 5555 5551",
    card_num : "0123456789abcdef",
    exp_date : new Date("1970-01-01"),
    ver_num : "1234",
    address : "New Taipei City, Taiwan",
    img : "../assets/mfrs/yageo.png",
    allow_news : true,
},
];
  public static mock_products : product[] = [{
    id : 0,
    cat_id : 0,
    mfr_id : 0,
    image : "../assets/products/51-kjBFDkYL._SL1001_.jpg",
    datasheet : "../assets/ds/cbb0207-1762180.pdf",
    name : "CBB0207001003GCT00",
    descr : "Vishay Classics Resistors feature a collection of electronic component technologies known for quality, reliability, and performance. A number of these products have been providing solutions to designers for decades, and these legacy products continue to be in demand in the marketplace. Vishay Classics Resistors include a variety of products, including film resistors, wirewound resistors, resistor networks, potentiometers and trimmers, and thermistors. Vishay continues to offer innovation, reliability, and technical performance to aid in designing and developing long-life end products.",
    descr_short : "Carbon Film Resistors - Through Hole 0.6W 100Kohms 2% 0207 Axial 350V",
    sub_cat : "carbon-film",
    price : 0.5,
    amount : 1000,
    rating : 4.5,
    date : new Date("1970-01-01"),
  },
    {
      id : 1,
      cat_id : 0,
      mfr_id : 0,
      image : "../assets/products/41-u7k8bJeL.jpg",
      datasheet : "../assets/ds/cbb0207-1762180.pdf",
      name : "CBB0207001202GC100",
      descr : "Vishay Classics Resistors feature a collection of electronic component technologies known for quality, reliability, and performance. A number of these products have been providing solutions to designers for decades, and these legacy products continue to be in demand in the marketplace. Vishay Classics Resistors include a variety of products, including film resistors, wirewound resistors, resistor networks, potentiometers and trimmers, and thermistors. Vishay continues to offer innovation, reliability, and technical performance to aid in designing and developing long-life end products.",
      descr_short : "Carbon Film Resistors - Through Hole 0.6W 12Kohms 2% 0207 Axial 350V",
      sub_cat : "carbon-film",
      price : 0.5,
      amount : 1100,
      rating : 4.6,
      date : new Date("1980-01-01"),
    },
    {
      id : 2,
      cat_id : 0,
      mfr_id : 0,
      image : "../assets/products/Resistor-4.7K-Ohm-5.jpg",
      datasheet : "../assets/ds/cbb0207-1762180.pdf",
      name : "CBB0207004701GC100",
      descr : "Vishay Classics Resistors feature a collection of electronic component technologies known for quality, reliability, and performance. A number of these products have been providing solutions to designers for decades, and these legacy products continue to be in demand in the marketplace. Vishay Classics Resistors include a variety of products, including film resistors, wirewound resistors, resistor networks, potentiometers and trimmers, and thermistors. Vishay continues to offer innovation, reliability, and technical performance to aid in designing and developing long-life end products.",
      descr_short : "Carbon Film Resistors - Through Hole 0.6W 4.7Kohms 2% 0207 Axial 350V",
      sub_cat : "carbon-film",
      price : 0.5,
      amount : 1000,
      rating : 4.7,
      date : new Date("1990-01-01"),
    },
    {
      id : 3,
      cat_id : 0,
      mfr_id : 0,
      image : "../assets/products/Resistor-47K-Ohm-5.jpg",
      datasheet : "../assets/ds/cbb0207-1762180.pdf",
      name : "CBB0207004702GC100",
      descr : "Vishay Classics Resistors feature a collection of electronic component technologies known for quality, reliability, and performance. A number of these products have been providing solutions to designers for decades, and these legacy products continue to be in demand in the marketplace. Vishay Classics Resistors include a variety of products, including film resistors, wirewound resistors, resistor networks, potentiometers and trimmers, and thermistors. Vishay continues to offer innovation, reliability, and technical performance to aid in designing and developing long-life end products.",
      descr_short : "Carbon Film Resistors - Through Hole 0.6W 47Kohms 2% 0207 Axial 350V",
      sub_cat : "carbon-film",
      price : 0.5,
      amount : 1000,
      rating : 4.8,
      date : new Date("2000-01-01"),
    },
    {
      id : 4,
      cat_id : 0,
      mfr_id : 4,
      image : "../assets/products/TUM_1-updated.jpg",
      datasheet : "../assets/ds/YAGEO_SQP_NSP_datasheet_2021v0-3003003.pdf",
      name : "SQP10AJB-39K",
      descr_short : "Wirewound Resistors - Through Hole",
      sub_cat : "wirewound",
      price : 0.7,
      amount : 0,
      rating : 5.0,
      date : new Date("2010-01-01"),
    },
    {
      id : 5,
      cat_id : 0,
      mfr_id : 1,
      image : "../assets/products/MFG_PCW1D-B24-BAB102L.webp",
      datasheet : "../assets/ds/slimline-778088.pdf",
      name : "PCW1J-C24-KAB103L",
      descr : "Bourns Potentiometers are used in the design and assembly of industrial rotary and linear actuators as well as human machine interface (HMI) devices used as user controls on industrial equipment panels. Potentiometers bring quality, reliability, and value to users. Ideal applications or markets include the industrial linear and rotary actuator industry, industrial panel-control industry, as well as the professional audio industry.",
      descr_short : "Potentiometers 10K 20% Sq 22mm Single Turn",
      sub_cat : "potentiometer",
      price : 6.5,
      amount : 1200,
      rating : 4.8,
      date : new Date("2020-01-01"),
    },

    {
      id : 6,
      cat_id : 1,
      mfr_id : 0,
      image : "../assets/products/ceramic-disc-cap-5.jpg",
      datasheet : "../assets/ds/564r565r-1762222.pdf",
      name : "564R30TSD33",
      descr_short : "Ceramic Disc Capacitors 3300pF 3Kvolts 10%",
      sub_cat : "ceramic",
      price : 1.8,
      amount : 5000,
      rating : 4.75,
      date : new Date("2015-01-01"),
    },
    {
      id : 7,
      cat_id : 1,
      mfr_id : 0,
      image : "../assets/products/100uF-25V-Radial-Electrolytic-Capacitor_843c0516-30b2-4352-b903-89ffab1ad966_1200x1200.webp",
      datasheet : "../assets/ds/048rml-1762424.pdf",
      name : "MAL204838102E3",
      descr_short : "Aluminium Electrolytic Capacitors - Radial Leaded 1000uF 63V 16x31mm 105 C 3000h",
      sub_cat : "electrolytic",
      price : 4.28,
      amount : 924,
      rating : 4.9,
      date : new Date("2023-01-01"),
    },
    {
      id : 8,
      cat_id : 1,
      mfr_id : 0,
      image : "../assets/products/31JWTxoijwL.jpg",
      datasheet : "../assets/ds/048rml-1762424.pdf",
      name : "MAL217250222E3",
      descr_short : "Aluminium Electrolytic Capacitors - Radial Leaded 35V 2200uF 16x25mm AEC-Q200 10000h 105C",
      sub_cat : "electrolytic",
      price : 4.22,
      amount : 813,
      rating : 4.8,
      date : new Date("2023-01-02"),
    },

    {
      id : 9,
      cat_id : 2,
      mfr_id : 1,
      image : "../assets/products/choke-coil-inductor-500x500.webp",
      datasheet : "../assets/ds/8100_series-777217.pdf",
      name : "8101-RC",
      descr : "Bourns offers components for linear and switch mode power supplies that provide high reliability performance in smaller, more compact designs. Bourns is continually achieving improvements in miniaturization and packaging with circuit protection, circuit conditioning, and position control products. Bourns delivers the standards-based solutions OEMs can rely on to fulfill ongoing technical demands.",
      descr_short : "Common Mode Chokes / Filters 4mH MIN",
      sub_cat : "choke",
      price : 6.0,
      amount : 500,
      rating : 4.2,
      date : new Date("2020-02-02"),
    },
    {
      id : 10,
      cat_id : 2,
      mfr_id : 1,
      image : "../assets/products/RU820-16-02_500x327.jpg",
      datasheet : "../assets/ds/8100_series-777217.pdf",
      name : "8120-RC",
      descr : "Bourns offers components for linear and switch mode power supplies that provide high reliability performance in smaller, more compact designs. Bourns is continually achieving improvements in miniaturization and packaging with circuit protection, circuit conditioning, and position control products. Bourns delivers the standards-based solutions OEMs can rely on to fulfill ongoing technical demands.",
      descr_short : "Common Mode Chokes / Filters 2.4 mH",
      sub_cat : "choke",
      price : 11.0,
      amount : 200,
      rating : 4.5,
      date : new Date("2020-02-05"),
    },

    {
      id : 11,
      cat_id : 3,
      mfr_id : 3,
      image : "../assets/products/kcs0003b.png",
      datasheet : "../assets/ds/csd18533kcs.pdf",
      name : "CSD18533KCS",
      descr : "Texas Instruments NexFET N-Channel Power MOSFETs are designed to minimize losses in power conversion applications. These N-channel devices feature ultra low Qg and Qd and low thermal resistance. These devices are avalanche rated and come in a SON 5mm x 6mm plastic package.",
      descr_short : "MOSFET 60V N-Chnl NxFT Pwr MSFT",
      sub_cat : "mosfet",
      price : 1.6,
      amount : 2000,
      rating : 4.9,
      date : new Date("2020-02-05"),
    },
    {
      id : 12,
      cat_id : 3,
      mfr_id : 3,
      image : "../assets/products/296~4204749~KCS~3.webp",
      datasheet : "../assets/ds/csd18533kcs.pdf",
      name : "CSD18504KCS",
      descr : "Texas Instruments NexFET N-Channel Power MOSFETs are designed to minimize losses in power conversion applications. These N-channel devices feature ultra low Qg and Qd and low thermal resistance. These devices are avalanche rated and come in a SON 5mm x 6mm plastic package.",
      descr_short : "MOSFET 40V N-Ch NexFET Pwr MOSFET",
      sub_cat : "mosfet",
      price : 1.45,
      amount : 3000,
      rating : 4.8,
      date : new Date("2020-02-03"),
    },
    {
      id : 13,
      cat_id : 3,
      mfr_id : 3,
      image : "../assets/products/lp0003a.png",
      datasheet : "../assets/ds/lp395.pdf",
      name : "LP395Z/NOPB",
      descr_short : "Bipolar Transistors - BJT ULTRA RELIABLE POWER TRANSISTOR",
      sub_cat : "bjt",
      price : 1.74,
      amount : 10000,
      rating : 4.9,
      date : new Date("2021-02-05"),
    },

    {
      id : 14,
      cat_id : 4,
      mfr_id : 3,
      image : "../assets/products/HTB1ikrjXznuK1RkSmFPq6AuzFXaX.jpg",
      datasheet : "https://www.ti.com/general/docs/suppproductinfo.tsp?distId=26&gotoUrl=https://www.ti.com/lit/gpn/sn74hcs00",
      name : "SN74HCS00DYYR",
      descr : "Texas Instruments SN74HCS00/SN74HCS00-Q1 2-Input NAND Gate contains four independent 2-input NAND Gates with Schmitt-trigger inputs. Each gate performs the Boolean function Y = A ● B in positive logic. The SN74HCS00-Q1 devices are AEC-Q100 qualified for automotive applications. The Texas Instruments SN74HCS00/SN74HCS00-Q1 2-Input NAND Gate is offered in TSSOP-14, SOIC-14, WQFN-14, and SOT-23-14 package types.",
      descr_short : "Logic Gates 4-ch, 2-input, 2-V to 6-V low power NAND gates with Schmitt-trigger inputs",
      sub_cat : "cmos",
      price : 0.461,
      amount : 300,
      rating : 5.0,
      date : new Date("2023-01-01"),
    },
    {
      id : 15,
      cat_id : 4,
      mfr_id : 3,
      image : "../assets/products/20200724_134158_976x700.webp",
      datasheet : "https://www.ti.com/general/docs/suppproductinfo.tsp?distId=26&gotoUrl=https://www.ti.com/lit/gpn/sn74hc27",
      name : "SN74HC27DR",
      descr_short : "Logic Gates Triple 3-Input Positive NOR Gates",
      sub_cat : "cmos",
      price : 0.461,
      amount : 350,
      rating : 5.0,
      date : new Date("2023-01-01"),
    },
    {
      id : 16,
      cat_id : 4,
      mfr_id : 3,
      image : "../assets/products/download.jpg",
      datasheet : "https://www.ti.com/general/docs/suppproductinfo.tsp?distId=26&gotoUrl=https://www.ti.com/lit/gpn/sn74hc14",
      name : "SN74HC14DRG3",
      descr_short : "Inverters Hex Schmitt-Trigger Inverters",
      sub_cat : "cmos",
      price : 0.461,
      amount : 1000,
      rating : 4.0,
      date : new Date("2022-01-01"),
    },
    {
      id : 17,
      cat_id : 4,
      mfr_id : 3,
      image : "../assets/products/n0020a.png",
      datasheet : "https://www.ti.com/general/docs/suppproductinfo.tsp?distId=26&gotoUrl=https://www.ti.com/lit/gpn/sn74hcs273",
      name : "SN74HCS273PWR",
      descr : "Texas Instruments SN74HCS273/SN74HCS273-Q1 Octal D-Type Flip-Flops are octal positive-edge-triggered D-type flip-flops with Schmitt-trigger inputs, shared direct active low clear (CLR) input, and clock (CLK). The Texas Instruments SN74HCS273-Q1 devices are AEC-Q100 qualified for automotive applications.",
      descr_short : "Flip-Flops Octal D-type flip-flops with clear with Schmitt-trigger inputs",
      sub_cat : "cmos",
      price : 0.61,
      amount : 500,
      rating : 5.0,
      date : new Date("2023-03-01"),
    },
    {
      id : 18,
      cat_id : 4,
      mfr_id : 3,
      image : "../assets/products/10-pcs-74HC74-SN74HC74-Flip-Flop-2-Element-D-Type-1-Bit-Positive-Edge-14-DIP.jpg_Q90.jpg_.webp",
      datasheet : "https://www.ti.com/general/docs/suppproductinfo.tsp?distId=26&gotoUrl=https://www.ti.com/lit/gpn/sn74hcs74-q1",
      name : "SN74HCS74QDRQ1",
      descr : "Texas Instruments SN74HCS74/SN74HCS74-Q1 D-Type Flip-Flops feature a wide operating range, low power consumption, and schmitt-trigger inputs allowing for slow or noisy input signals. A low level at the preset (PRE) input sets the output high, or at the clear (CLR) input resets the output low. The asynchronous preset and clear functions are not dependent on the levels of the other inputs. When PRE and CLR are inactive (high) on the device, data at the data (D) input meeting the setup time requirements is transferred to the outputs (Q, Q) on the positive-going edge of the clock (CLK) pulse. Clock triggering develops at a voltage level and is not directly related to the rise time of the input clock (CLK) signal. Data at the data (D) input can be changed without affecting the levels at the outputs (Q, Q), following the hold-time interval. The SN74HCS74-Q1 devices are AEC-Q100 qualified for automotive applications.",
      descr_short : "Flip-Flops Automotive Schmitt-trigger input dual D-type positive-edge-triggered flip-flops w/ clear and preset 14-SOIC -40 to 125",
      sub_cat : "cmos",
      price : 0.61,
      amount : 800,
      rating : 4.8,
      date : new Date("2021-01-01"),
    },
    {
      id : 19,
      cat_id : 4,
      mfr_id : 3,
      image : "../assets/products/74hc132-quad-2-input-nand-schmitt-trigger-1.jpg",
      datasheet : "https://www.ti.com/general/docs/suppproductinfo.tsp?distId=26&gotoUrl=https://www.ti.com/lit/gpn/sn54ls132",
      name : "SN74LS132DR",
      descr_short : "Logic Gates Quad 2-inp pos-NAND Schmitt triggers",
      sub_cat : "ttl",
      price : 0.8,
      amount : 500,
      rating : 4.8,
      date : new Date("2019-01-01"),
    },
    {
      id : 20,
      cat_id : 4,
      mfr_id : 3,
      image : "../assets/products/D_NQ_NP_830385-MLM43901194644_102020-W.jpg",
      datasheet : "https://www.ti.com/general/docs/suppproductinfo.tsp?distId=26&gotoUrl=https://www.ti.com/lit/gpn/sn54s10",
      name : "SN74LS10N",
      descr_short : "Logic Gates Triple 3-Input",
      sub_cat : "ttl",
      price : 0.92,
      amount : 10,
      rating : 3.5,
      date : new Date("2018-01-01"),
    },
    {
      id : 21,
      cat_id : 4,
      mfr_id : 3,
      image : "../assets/products/SN74LS04.jpg",
      datasheet : "https://www.ti.com/general/docs/suppproductinfo.tsp?distId=26&gotoUrl=https://www.ti.com/lit/gpn/sn74s04",
      name : "SN74LS04DR",
      descr_short : "Inverters HEX INVERTERS",
      sub_cat : "ttl",
      price : 0.78,
      amount : 5000,
      rating : 5.0,
      date : new Date("2010-01-01"),
    },
    {
      id : 22,
      cat_id : 4,
      mfr_id : 3,
      image : "../assets/products/HTB1mmJZXInrK1RkHFrdq6xCoFXaU.jpg",
      datasheet : "https://www.ti.com/general/docs/suppproductinfo.tsp?distId=26&gotoUrl=https://www.ti.com/lit/gpn/sn74ls32",
      name : "SN74LS32DR",
      descr_short : "Logic Gates Quad 2-input Positive-OR gates",
      sub_cat : "ttl",
      price : 0.65,
      amount : 1000,
      rating : 3.0,
      date : new Date("2023-01-01"),
    },
    {
      id : 23,
      cat_id : 4,
      mfr_id : 3,
      image : "../assets/products/s83-0538p01wl.jpg",
      datasheet : "https://www.ti.com/general/docs/suppproductinfo.tsp?distId=26&gotoUrl=https://www.ti.com/lit/gpn/sn54ls08-sp",
      name : "SN74LS08N",
      descr_short : "Logic Gates Quad 2-Input.",
      sub_cat : "ttl",
      price : 0.799,
      amount : 2000,
      rating : 2.5,
      date : new Date("2013-01-01"),
    },

    {
      id : 24,
      cat_id : 5,
      mfr_id : 0,
      image : "../assets/products/016-min.jpg",
      datasheet : "https://eu.mouser.com/datasheet/2/427/bav17-1767671.pdf",
      name : "BAV20-TR",
      descr : "Vishay Semiconductors BAV Series Diodes are high voltage small signal switching diodes for general-purpose applications. The silicon epitaxial planar diodes are AEC-Q101 qualified. The Vishay Semiconductors BAV Series includes BAV17, BAV18, BAV19, BAV20, and BAV21. The devices are available in a DO-35 (DO-204AH) package.",
      descr_short : "Diodes - General Purpose, Power, Switching 200V If/250mA T/R",
      sub_cat : "diode",
      price : 0.2,
      amount : 10000,
      rating : 4.0,
      date : new Date("2015-01-01"),
    },
    {
      id : 25,
      cat_id : 5,
      mfr_id : 0,
      image : "../assets/products/green-led-5mm-diffused-india-800x800.jpg",
      datasheet : "https://eu.mouser.com/datasheet/2/427/tlhg440-1766941.pdf",
      name : "TLHG4400-MS12",
      descr : "Vishay Semiconductors TLHG440x/TLHO440x/TLHR440x/TLHY440x High-Efficiency LEDs are housed in a Ø3mm T-1 tinted diffused package. The High-Efficiency LEDs feature a wide viewing angle that allows a high on-off contrast. The Vishay Semi TLHG440x/TLHO440x/TLHR440x/TLHY440x High Efficiency LEDs provide several selection types with different luminous intensities. The High-Efficiency LEDs are categorized in luminous intensity groups, while the green and yellow LEDs are categorized additionally in wavelength groups. This categorization permits the LEDs to be assembled with a uniform appearance. The TLHG440x/TLHO440x/TLHR440x/TLHY440x LEDs are developed for standard applications like general indicating and lighting purposes.",
      descr_short : "Standard LEDs - Through Hole Green 13mcd; 3mm 562-575nm; 2.4V Typ",
      sub_cat : "led",
      price : 0.6,
      amount : 1000,
      rating : 4.5,
      date : new Date("2014-01-01"),
    },
    {
      id : 26,
      cat_id : 5,
      mfr_id : 0,
      image : "../assets/products/R1278392-01.webp",
      datasheet : "https://eu.mouser.com/datasheet/2/427/tlhg440-1766941.pdf",
      name : "TLHR4400-AS12Z",
      descr : "Vishay Semiconductors TLHG440x/TLHO440x/TLHR440x/TLHY440x High-Efficiency LEDs are housed in a Ø3mm T-1 tinted diffused package. The High-Efficiency LEDs feature a wide viewing angle that allows a high on-off contrast. The Vishay Semi TLHG440x/TLHO440x/TLHR440x/TLHY440x High Efficiency LEDs provide several selection types with different luminous intensities. The High-Efficiency LEDs are categorized in luminous intensity groups, while the green and yellow LEDs are categorized additionally in wavelength groups. This categorization permits the LEDs to be assembled with a uniform appearance. The TLHG440x/TLHO440x/TLHR440x/TLHY440x LEDs are developed for standard applications like general indicating and lighting purposes.",
      descr_short : "Standard LEDs - Through Hole Red 13mcd; 3mm 612-625nm; 2V Typ",
      sub_cat : "led",
      price : 0.6,
      amount : 1000,
      rating : 4.5,
      date : new Date("2014-01-01"),
    },

    {
      id : 27,
      cat_id : 6,
      mfr_id : 0,
      image : "../assets/products/R0822901-01.webp",
      name : "Coaxial cable",
      descr_short : "Coaxial cable",
      sub_cat : "coaxial",
      price : 2.999,
      amount : 3,
      rating : 1.5,
      date : new Date("2003-01-01"),
    },
    {
      id : 28,
      cat_id : 6,
      mfr_id : 0,
      image : "../assets/products/fiber-optic.webp",
      name : "Fibre-optic cable",
      descr_short : "High quality fibre-optic cable",
      sub_cat : "fibre-optic",
      price : 3.999,
      amount : 5,
      rating : 4.5,
      date : new Date("2008-01-01"),
    },
    {
      id : 29,
      cat_id : 6,
      mfr_id : 0,
      image : "../assets/products/2762506-40.jpg",
      name : "Jumper wire",
      descr_short : "Jumper wire for use in breadboard projects",
      sub_cat : "jumper",
      price : 0.199,
      amount : 300,
      rating : 3.5,
      date : new Date("2005-01-01"),
    },

    {
      id : 30,
      cat_id : 7,
      mfr_id : 2,
      image : "../assets/products/MFG_USB4715-GF-A.webp",
      datasheet : "https://eu.mouser.com/datasheet/2/837/usb4715-3001302.pdf",
      name : "USB4715-GF-A",
      descr : "GCT (Global Connector Technology) USB4715 6-Pin USB Type-C™ Connector offers a 3A current rating, 6 contacts, 10,000 mating cycles, and a 4.21mm profile. The USB4715 connector is tested to an IP67 protection rating and features four through-hole shell stakes to ensure excellent PCB retention. The GCT SB4715 6-Pin USB Type-C Connector has a stainless steel shell and a UL 94V-0 plastic insulator. The SB4715 is ideal for charging applications.",
      descr_short : "USB Connectors USBC Rec GF 6P Horizontal MidMt SMT H 4.46mm IP67, Gasket Required Seperately",
      sub_cat : "usb",
      price : 1.499,
      amount : 1399,
      rating : 4.8,
      date : new Date("2023-01-01"),
    },
    {
      id : 31,
      cat_id : 7,
      mfr_id : 2,
      image : "../assets/products/USB4160-03-0230-C_SPL.webp",
      datasheet : "https://eu.mouser.com/datasheet/2/837/Global_Connector_Technology_USB4160-3106192.pdf",
      name : "USB4160-03-0230-C",
      descr : "GCT (Global Connector Technology) Vertical USB Type-C™ Charging Connectors are high-performance vertical USB connectors with a stable base and locating pegs. The USB Type-C Connectors offer three shell stake options (0.7mm, 1.7mm, and 2.3mm) for different PCB thicknesses. These connectors feature 6, 16, and 24 pins, 3A and 5A current ratings, and 20,000 mating cycles. GCT Vertical USB Type-C™ Charging Connectors are suitable for docking stations, electronic point of sale (EPoS), dental equipment, portable electronics, and audio equipment.",
      descr_short : "USB Connectors USB-C Rec 3u Vert 24P SMT 2.3mm TH stakes H7.46mm T+R+Cap",
      sub_cat : "usb",
      price : 1.199,
      amount : 1229,
      rating : 4.5,
      date : new Date("2022-01-01"),
    },
    {
      id : 32,
      cat_id : 7,
      mfr_id : 2,
      image : "../assets/products/MFG_HDMR-19-01-S-SM-TR.webp",
      datasheet : "https://eu.mouser.com/datasheet/2/527/hdmr-2942101.pdf",
      name : "HDMR-19-01-S-SM-TR",
      descr_short : "I/O Connectors High-Speed I/O Receptacle",
    sub_cat : "hdmi",
  price : 6.299,
  amount : 271,
  rating : 4.2,
  date : new Date("2021-01-01"),
},

{
  id : 33,
    cat_id : 8,
  mfr_id : 3,
  image : "../assets/products/yfp0020.png",
  datasheet : "https://www.ti.com/general/docs/suppproductinfo.tsp?distId=26&gotoUrl=https://www.ti.com/lit/gpn/bq25157",
  name : "BQ25157YFPR",
  descr : "Texas Instruments bq25157 1-Cell Linear Battery Charger is a highly integrated battery charge management IC that integrates the most common functions for wearable, portable, and small medical devices. These functions include a charger, a regulated output voltage rail for system power, ADC for battery and system monitoring, an LDO, and a push-button controller. The bq25157 has the Input Supply Over Voltage Threshold (VOVP) threshold set to 6.2V. The Texas Instruments bq25157 IC integrates a linear charger with Power Path that enables quick and accurate charging for small batteries while providing a regulated voltage to the system. The regulated system voltage (PMID) output may be configured through I2C based on the recommended operating condition of downstream IC’s and system loads for optimal system operation. The device supports charge current up to 500mA and supports termination current down to 0.5mA for maximum charge. The battery is charged using a standard Li-Ion charge profile with three phases: pre-charge, constant current, and constant voltage regulation.",
  descr_short : "Battery Chargers 500-mA 1-cell linear charger with 10-nA IQ, power path, regulated system voltage, 16-bit ADC and LDO 20-DSBGA -40 to 85",
  sub_cat : "charger",
  price : 2.799,
  amount : 300,
  rating : 4.9,
  date : new Date("2017-01-01"),
},
{
  id : 34,
    cat_id : 8,
  mfr_id : 0,
  image : "../assets/products/UGDT_series_DSL.webp",
  datasheet : "https://eu.mouser.com/datasheet/2/427/mtbaugdt-2897534.pdf",
  name : "MTBAUGDT250101-LF",
  descr : "Vishay / Dale UGDT Micro Gate Drive Transformers deliver MOSFET / IGBT gate power and timing signals simultaneously. The transformers offer direct drive high side MOSFET / IGBT on buses up to 200V. The series features excellent rise time, overshoot, and peak current characteristics. Vishay / Dale UGDT Micro Gate Drive Transformers have a frequency range of 125kHz to 750kHz.",
  descr_short : "Pulse Transformers FG, TRANSFORMER, GATE DRIVE 5MM, 250 KH",
  sub_cat : "transformer",
  price : 11.099,
  amount : 500,
  rating : 4.7,
  date : new Date("2012-01-01"),
},

{
  id : 35,
    cat_id : 9,
  mfr_id : 3,
  image : "../assets/products/56-TSSOP.webp",
  datasheet : "https://www.mouser.com/catalog/specsheets/txiis82535-1.pdf?_gl=1*8why71*_ga*NTM2MzQ2MTc2LjE2NzkxNDEyOTU.*_ga_15W4STQT4T*MTY4MjIzNzg4OS4yMy4xLjE2ODIyNDQ1NjkuMC4wLjA.*_ga_1KQLCYKRX3*MTY4MjIzNzg4OS4yMy4xLjE2ODIyNDQ1NjkuNDIuMC4w",
  name : "SN74ACT7804-20DL",
  descr_short : "FIFO 512 x 18 asynch FIFO Memory",
  sub_cat : "eprom",
  price : 10.799,
  amount : 30,
  rating : 4.9,
  date : new Date("2018-01-01"),
},
{
  id : 36,
    cat_id : 9,
  mfr_id : 3,
  image : "../assets/products/Y2528802-01.webp",
  datasheet : "https://www.ti.com/general/docs/suppproductinfo.tsp?distId=26&gotoUrl=https://www.ti.com/lit/gpn/bq2201",
  name : "BQ2201SN-N",
  descr_short : "Memory Controllers SRAM Nonvolatile Controller IC",
  sub_cat : "controller",
  price : 5.799,
  amount : 3,
  rating : 4.5,
  date : new Date("2018-01-01"),
},
];
}
