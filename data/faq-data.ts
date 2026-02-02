export type IFaq =  {
  id: string;
  title: string;
  desc: string;
  isShow?: boolean;
}

const faq_data: IFaq[] = [
  {
    id: "One",
    title: "What is PayQwicker?",
    desc: "PayQwicker is a fast and secure financial app that offers a wide range of services such as airtime and data purchase, bill payments, money transfers, and more, all accessible through your smartphone.",
    isShow: true,
  },
  {
    id: "Two",
    title: "How do I download the PayQwicker app?",
    desc: "You can download the PayQwicker app for free from the Google Play Store or Apple App Store. Simply search for 'PayQwicker' and follow the prompts to install it on your device.",
  },
  {
    id: "Three",
    title: "Is PayQwicker safe to use?",
    desc: "Yes, PayQwicker prioritizes the security and privacy of its users. We employ advanced encryption technology and stringent security measures to protect your personal and financial information.",
  },
 
  {
    id: "Four",
    title: "Can I use PayQwicker to transfer money internationally?",
    desc: "Yes, PayQwicker allows you to transfer money both domestically and internationally. Our platform offers fast and secure money transfer services to various countries around the world.",
  },


  {
    id: "Five",
    title: "How do I convert airtime to cash with PayQwicker?",
    desc: "Converting airtime to cash with PayQwicker is simple. Just log in to the app, navigate to the airtime to cash feature, enter the necessary details, and follow the instructions to complete the transaction.",
  },


  {
    id: "Six",
    title: "What payment methods are accepted on PayQwicker?",
    desc: "PayQwicker accepts various payment methods, including bank transfers, debit/credit cards, and even cryptocurrencies for certain transactions.",
  },


  {
    id: "Seven",
    title: "What should I do if I encounter an issue with the PayQwicker app?",
    desc: "If you encounter any issues or have questions about the app, our 24/7 customer support team is here to help. You can reach out to us through the app's support feature, and we'll assist you promptly.",
  },


  {
    id: "Eight",
    title: "Can I pay my utility bills using PayQwicker?",
    desc: "Yes, PayQwicker allows you to pay your utility bills, including electricity, water, DSTV, GoTV and Startimes, conveniently through the app. Simply select the bill payment option, choose the utility provider, enter the bill details, and make the payment.",
  },


  {
    id: "Nine",
    title: "Is there a fee for using PayQwicker?",
    desc: "While downloading the app is free, certain transactions may incur fees depending on the nature of the transaction and the payment method used. However, we strive to keep our fees competitive and transparent for our users.",
  },


  {
    id: "Ten",
    title: "How can I contact PayQwicker for further assistance?",
    desc: "You can contact PayQwicker's customer support team anytime by using the in-app support feature (Click on the chat icon) or by emailing us at support@payqwicker.com. We're here to help you with any questions or concerns you may have.",
  },
];

export default faq_data;