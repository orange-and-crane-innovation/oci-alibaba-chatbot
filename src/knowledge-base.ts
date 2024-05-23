const buttonLabel = "Piliin";
// level 3
const q5 = {
  question: `Customer Support Form`,
  answer: "https://google.com",
  type: "web_url",
  options: null,
  buttonLabel,
};
const q6 = {
  question: `Blue Card Hotline`,
  answer: "09171283746",
  type: "postback",
  options: null,
  buttonLabel,
};
const q7 = {
  question: `U-Store Locations`,
  answer: "https://google.com",
  type: "web_url",
  options: null,
  buttonLabel,
};
const q8 = {
  question: `Dahilan bakit hindi nakatanggap ng ayuda`,
  answer: "https://google.com",
  type: "web_url",
  options: null,
  buttonLabel,
};
const q9 = {
  question: `USCC Branches`,
  answer: "https://google.com",
  type: "web_url",
  options: null,
  buttonLabel,
};
const q10 = {
  question: `Frequently Asked Questions`,
  answer: "https://google.com",
  type: "web_url",
  options: null,
  buttonLabel,
};
const q11 = {
  question: `Caravan Schedule`,
  answer: "https://google.com",
  type: "web_url",
  options: null,
  buttonLabel,
};

//level 2

// level 1
const back = {
  type: "postback",
  question: "Bumalik sa unang pilian",
  answer: "",
  buttonLabel: "< Bumalik",
};

const q1 = {
  type: "postback",
  question: "Concern sa Text Messages at Phone Numbers",
  answer: `CONCERN SA TEXT MESSAGES AT PHONE NUMBERS
  
Siguraduhing tama at updated ang iyong registered mobile number sa aming system. Maaring mag pa update ng iyong registered number alin man sa dalawang paraan ng USSC:

Tumawag sa USSC (02) 8928-USSC (8772) Pumunta sa pinakamalapit na U-Store
Kung sa tingin mo ay tama at updated ang iyong number, bisitahin at sagutan ang aming customer support form:`,
  options: [q5, q6, q7, back],
  buttonLabel,
};
const q2 = {
  type: "postback",
  question: `Concern sa Ayuda                                          `,
  answer: `CONCERN SA AYUDA

Para sa mga bagong release na Blue Card ay wala pa pong laman ang mga ito. Gawing maghintay ng anunsiyo para sa unang ayuda na matatanggap ngayong 2024.

Maaaring pumunta sa alin mang ATM machines para alamin kung may laman na ito, subalit may karampatang bayad para dito. Kung gusto mag-balance inquiry na hindi nababawasan ang laman ng inyong blue card ay magpunta sa branches ng USSC. 

Para malaman kung ano ang mga maaring dahilan kaya hindi nakatanggap ng ayuda i-click ang link.`,
  options: [q8, q6, q9, back],
  buttonLabel,
};
const q3 = {
  type: "postback",
  question: `Nawala, Nasira, o defective ang Blue Card  `,
  answer: `NAWALA, NASIRA, O DEFECTIVE ANG BLUE CARD

Magandang araw . Para sa pagpapalit ng Blue Card gawin ang mga sumusunod na hakbang.
1. I report kaagad ang pagkawala ng blue card sa alin mang branches ng USSC store.
2. Maghanda at magsumite ng affidavit of loss sa alin mang USSC store branches (kung nasira o defective ang card ay kailangang isurrender ito)
3. Magbayad ng replacement fee. Ang proseso ng pagpalit ng card ay tatagal ng 15 working days.
4. Mag antay ng tawag mula sa USCC kung pwede na makuha ang bagong card.`,
  options: [q9, q10, q6, back],
  buttonLabel,
};
const q4 = {
  type: "postback",
  question: "Concern sa mga Schedule",
  answer: `CONCERN SA MGA SCHEDULES
  
Para sa Registration: Sa ngayon po ay wala pang schedule para sa registration. Hintayin lamang po ang anunsiyo kung kailan po ulit magkakaroon.

Para sa Card Distribution: Para po sa schedule ng card distribution ay paki click lamang ang link. Kung sakaling hindi nakapunta sa inyong schedule ay pwede po kayong pumunta sa alin mang naka schedule na caravan distribution
site.

Para sa karagdagaang kaalaman tungkol sa Ahon Malabon Blue Card, bisitahin lamang ang aming Frequently Asked Questions.`,
  options: [q11, q10, q6, back],
  buttonLabel,
};

// level 1
const q0 = {
  type: "postback",
  question: "",
  answer: `Magandang araw!
Anong maipaglilingkod namin sa iyo?
Maaaring pumili ng isang na akma sa iyong katanungan:
`,
  options: [q1, q2, q3],
};

export const knowledge = [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11];
