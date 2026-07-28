export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Cécile had the whole room quiet by the second song. You do not see that happen on a Friday night in Thornbury.",
    author: "Marcus Reid",
    role: "Booker, The Workers Club",
  },
  {
    id: "t2",
    quote:
      "Warm, honest songwriting with a voice that carries the back of the room without a microphone.",
    author: "Anneke Visser",
    role: "De Jongens, Groningen",
  },
  {
    id: "t3",
    quote:
      "She opened for us in Chicago and half the crowd left holding her record. That says everything.",
    author: "Dana Holloway",
    role: "Touring musician",
  },
  {
    id: "t4",
    quote:
      "Professional from load-in to last call. Turned up early, played longer than we asked, everyone stayed.",
    author: "Sam Whitlock",
    role: "Park Hotel, Maryborough",
  },
  {
    id: "t5",
    quote:
      "Her set at Tamworth was the one people were still talking about at breakfast the next morning.",
    author: "Rhonda Pierce",
    role: "Festival programmer",
  },
  {
    id: "t6",
    quote:
      "Real country songwriting — no costume, no act. Just the stories and the guitar.",
    author: "Tom Beaumont",
    role: "Sunday Country Review",
  },
  {
    id: "t7",
    quote:
      "We rebooked her for three nights before she had finished packing up her gear.",
    author: "Lien de Vries",
    role: "Singelier, Groningen",
  },
  {
    id: "t8",
    quote:
      "Every song landed. I have run this room eight years and rarely see a debut go like that.",
    author: "Jules Fontaine",
    role: "Pause Bar, Melbourne",
  },
  {
    id: "t9",
    quote:
      "Cécile writes the kind of lyric you catch yourself repeating a week later.",
    author: "Erin Cavanagh",
    role: "Phyllis, Chicago",
  },
];
