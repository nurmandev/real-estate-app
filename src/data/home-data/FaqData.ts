interface DataType {
  id: number;
  page: string;
  question: string;
  answer: string;
  showAnswer: boolean;
}

const faq_data: DataType[] = [
  {
    id: 1,
    page: "home_2_faq_1",
    question: "Advance Search",
    answer:
      "It only takes 5 minutes. Set-up is smooth & simple, with fully customisable filter to the right one.",
    showAnswer: false,
  },
  {
    id: 2,
    page: "home_2_faq_1",
    question: "Exert Agents for any help",
    answer:
      "It only takes 5 minutes. Set-up is smooth & simple, with fully customisable filter to the right one.",
    showAnswer: false,
  },
  {
    id: 3,
    page: "home_2_faq_1",
    question: "Protected payments, every time",
    answer:
      "It only takes 5 minutes. Set-up is smooth & simple, with fully customisable filter to the right one.",
    showAnswer: false,
  },

  // home_2_faq_2

  {
    id: 1,
    page: "home_2_faq_2",
    question: "What are the benefits of buying off-plan properties in Dubai?",
    answer:
      "Off-plan properties often come with attractive payment plans and a lower entry price compared to ready properties, offering significant capital appreciation potential upon completion.",
    showAnswer: false,
  },
  {
    id: 2,
    page: "home_2_faq_2",
    question: "Can international investors own property in Dubai?",
    answer:
      "Yes, Dubai offers designated 'freehold' areas where international investors can own 100% of the property and land, providing a secure investment environment.",
    showAnswer: false,
  },
  {
    id: 3,
    page: "home_2_faq_2",
    question: "How do I qualify for a Golden Visa through property investment?",
    answer:
      "Investors who purchase property valued at AED 2 million or more are typically eligible for a 10-year Golden Visa, subject to UAE government regulations.",
    showAnswer: false,
  },
  {
    id: 4,
    page: "home_2_faq_2",
    question: "What is the average ROI for rental properties in Dubai?",
    answer:
      "Dubai offers some of the highest rental yields globally, with many areas providing between 6% to 10% average annual ROI.",
    showAnswer: false,
  },

  // home_six

  {
    id: 1,
    page: "home_six",
    question: "Who we are?",
    answer:
      "OMNIS Properties LLC is a leading real estate agency in Dubai, dedicated to offering exclusive property investments.",
    showAnswer: false,
  },
  {
    id: 2,
    page: "home_six",
    question: "What’s our goal",
    answer:
      "Our goal is to connect international investors with premium off-plan, resale, and rental properties in the UAE.",
    showAnswer: false,
  },
  {
    id: 3,
    page: "home_six",
    question: "Our vision",
    answer:
      "To be the most trusted and innovative real estate partner in the Middle East, ensuring exceptional returns and client satisfaction.",
    showAnswer: false,
  },
];

export default faq_data;
