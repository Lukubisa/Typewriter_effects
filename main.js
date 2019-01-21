const typeWriter =function(txtElement, words, wait =3000){
  this.txtElement= txtElement;
  this.words=words;
  this.txt='';
  this.wordsIndex=0;
  this.wait= parseInt(wait, 10);
  this.type();
 this.isDeleting= false;
}
//type writer method
typeWriter.prototype.type= function(){
  const index= this.wordsIndex % this.words.length;
  const currentWord= this.words[index];
  if(this.isDeleting){
    //Add letters one by one
    this.txt = currentWord.substring(0,this.txt.length -1); 
  }else{
    //delete letters one by one
    this.txt= currentWord.substring(0,this.txt.length +1);
  }
  this.txtElement.innerHTML=`<span class=txt>${this.txt}</span>`;

  //speed
  let speed =300;
  if(this.isDeleting){
    speed/=2;
  }

  if(!this.isDeleting && this.txt === currentWord){
    speed = this.wait;
    this.isDeleting =true;
  } else if(this.isDeleting && this.txt ===''){
     this.isDeleting = false;
     this.wordsIndex++;
  }
  

  
  setTimeout(() => this.type(),500);
   
}

document.addEventListener("DOMContentLoaded", init);

function init(){
  const txtElement = document.querySelector('.txt-type');
  const words =JSON.parse(txtElement.getAttribute('data-words'));
  const wait=txtElement.getAttribute('data-wait');
  new typeWriter(txtElement, words, wait);
}