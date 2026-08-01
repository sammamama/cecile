export type Language = "en" | "nl";

type Content = {
  label: string;
  /** Value for the `lang` attribute so screen readers pick the right voice. */
  htmlLang: string;
  heading: string;
  paragraphs: string[];
  signoff: string;
};

export const content: Record<Language, Content> = {
  en: {
    label: "EN",
    htmlLang: "en",
    heading: "About me",
    paragraphs: [
      "Hi there, I am Cécile and I am a country singer/songwriter originally from the Netherlands. I come from a small town called Bedum where I grew up around horses. My mom was a huge John Denver fan and played guitar so when I got my first guitar lessons in high school it was probably in my blood that it was since then that I never put the guitar down again.",
      "I loved country from a young age. And not just the music but the whole life style around it. While kids in school were wearing sweaters and shoes of expensive brands, I wore flannels and boots. After school I always went straight to the horses. I might have not been the most popular girl because of that but I think it all prepared me for my life which I have now.",
      "In 2019 I started singing while accompanying myself on the guitar. I have sung from a very young age but was always too afraid to show it. But when me and a friend signed up for the regional talent competition Hogeland's Got Talent this started to change. I was supposed to accompany my friend on guitar and would sing backing vocal while she would do the singing. However, she had to cancel the competition which left me in doubt. In the end I decided to just try it on my own and do the singing myself. I chose a country song which I loved which probably nobody knew and I won the competition.",
      "In 2020 I released my first song called 'The Northern Light' and after I travelled the world for a bit, I played my first gig in 2022. I kept on playing gigs from then on and in 2024 I moved to Australia for an exchange semester where I immediately took the opportunity to release my next two singles 'Living the Dream' and 'Called Country'.",
      "After seven months in Australia I went back home for seven months in which I got the opportunity to go to the USA for a couple of weeks where I was allowed to perform in the Windy City Chicago. Furthermore, I won the talent competition of the country festival Oirschot in The Netherlands.",
      "In September 2025 I returned back to Australia where I started my own band consisting of Riley Lobert and James McGrath, I released two new songs called 'We'll be alright' and 'The Man on the Tram', performed at the country festival in the country capital of Australia Tamworth, and got signed by the agency Ministry of DJs.",
      "In September 2026 I will return back to The Netherlands for a short stay, so I'll be able to come back and be ready for Australian summer at the end of 2026.",
      "I hope you follow along on my musical journey!",
    ],
    signoff: "X Cécile",
  },
  nl: {
    label: "NL",
    htmlLang: "nl",
    heading: "Over mij",
    paragraphs: [
      "Hoi! Ik ben Cécile, country singer-songwriter en oorspronkelijk afkomstig uit Nederland. Ik kom uit een klein dorp genaamd Bedum, waar ik opgroeide tussen de paarden. Mijn moeder was een groot fan van John Denver en speelde gitaar, dus toen ik op de middelbare school mijn eerste gitaarlessen kreeg, zat het waarschijnlijk al in mijn bloed — sindsdien heb ik de gitaar nooit meer weggelegd.",
      "Ik hield al van jongs af aan van country. En niet alleen van de muziek, maar van de hele levensstijl eromheen. Terwijl de kinderen op school truien en schoenen van dure merken droegen, droeg ik flanellen blouses en laarzen. Na school ging ik altijd meteen naar de paarden. Ik was daardoor misschien niet het populairste meisje, maar ik denk dat het me heeft voorbereid op het leven dat ik nu heb.",
      "In 2019 begon ik te zingen terwijl ik mezelf op gitaar begeleidde. Ik zong al van jongs af aan, maar was altijd te bang om het te laten horen. Toen een vriendin en ik ons inschreven voor de regionale talentenjacht Hogeland's Got Talent, begon dat te veranderen. Ik zou haar op gitaar begeleiden en achtergrondzang doen, terwijl zij zou zingen. Zij moest zich echter afmelden, waardoor ik begon te twijfelen. Uiteindelijk besloot ik het gewoon alleen te proberen en zelf te zingen. Ik koos een countrynummer waar ik van hield en dat waarschijnlijk niemand kende — en ik won de wedstrijd.",
      "In 2020 bracht ik mijn eerste nummer uit, 'The Northern Light', en nadat ik een tijdje de wereld had rondgereisd, speelde ik in 2022 mijn eerste optreden. Vanaf dat moment bleef ik optredens spelen en in 2024 verhuisde ik naar Australië voor een uitwisselingssemester, waar ik meteen de kans greep om mijn volgende twee singles uit te brengen: 'Living the Dream' en 'Called Country'.",
      "Na zeven maanden in Australië ging ik zeven maanden terug naar huis, waarin ik de kans kreeg om een paar weken naar de Verenigde Staten te gaan en te mogen optreden in the Windy City: Chicago. Daarnaast won ik de talentenjacht van countryfestival Oirschot in Nederland.",
      "In september 2025 keerde ik terug naar Australië, waar ik mijn eigen band begon met Riley Lobert en James McGrath. Ik bracht twee nieuwe nummers uit, 'We'll be alright' en 'The Man on the Tram', trad op tijdens het countryfestival in Tamworth, de countryhoofdstad van Australië, en werd gecontracteerd door het bureau Ministry of DJs.",
      "In september 2026 kom ik voor een korte periode terug naar Nederland, zodat ik daarna weer terug kan komen en klaar ben voor de Australische zomer aan het eind van 2026.",
      "Ik hoop dat je mijn muzikale reis blijft volgen!",
    ],
    signoff: "X Cécile",
  },
};
