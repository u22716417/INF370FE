export class Faq {
    
    Answer: string;
    faqId: number;
    Question: string;
  
    constructor(
      Answer: string,
      faqId: number,
      Question: string
    ) {
      this.Answer = Answer;
      this.faqId = faqId;
      this.Question = Question;
    }
  }