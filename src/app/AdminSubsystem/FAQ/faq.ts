export class Faq {
    
    answer: string;
    faqId: number;
    question: string;
  
    constructor(
      answer: string,
      faqId: number,
      question: string
    ) {
      this.answer = answer;
      this.faqId = faqId;
      this.question = question;
    }
  }