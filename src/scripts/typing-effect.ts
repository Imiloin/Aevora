// ES6 Class
class TypeWriter {
  txtElement: HTMLElement;
  words: string[];
  txt: string;
  wordIndex: number;
  wait: number;
  isDeleting: boolean;

  constructor(txtElement: HTMLElement, words: string[], wait: number = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = wait;
    this.type();
    this.isDeleting = false;
  }

  type(): void {
    // Current index of word
    const current: number = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt: string = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed: number = 150;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

init();

// Init App
function init(): void {
  const txtElement = document.querySelector('.txt-type') as HTMLElement | null;
  if (!txtElement) return;
  const wordsAttr = txtElement.getAttribute('data-words');
  if (!wordsAttr) return;
  const words: string[] = JSON.parse(wordsAttr);
  const wait = txtElement.getAttribute('data-wait');
  new TypeWriter(txtElement, words, wait ? parseInt(wait, 10) : 3000);
}
