  // import bot from './assets_codex/assets/bot.svg';
  // import user from './assets_codex/assets/user.svg';
  // const form=document.querySelector('form');
  // const chatContainer=document.querySelector('#chat_container');
  // let loadInterval;
  // function loader(element){
  //   element.textContent='';
  //   loadInterval=setInterval(()=>{
  //     element.textContent+='.';
  //     if(element.textContent==='....')
  //     {
  //       element.textContent='';
  //     }

  //   },300)
  // }
  // function typeText(element,text){
  //   let index=0;
  //   let interval=setInterval(()=>{
  //     if(index<text.length)
  //     {
  //       element.innerHTML+=text.charAt(index);
  //       index++;
  //     }
  //     else{
  //       clearInterval(interval);
  //     }
  //   },20)
  // }
  // function generateuniqueid()
  // {
  //   const timestamp=Date.now();
  //   const randomNumber=Math.random();
  //   const hexadecimalString=randomNumber.toString(16);
  //   return `id-${timestamp}-${hexadecimalString}`;
  // } 
  // function chatStripe(isai,value,uniqueid){
  //   return(
  //     `
  //     <div class="wrapper ${isai && 'ai'}">
  //     <div class="chat">
  //     <div class="profile">
  //     <img 
  //     src="${isai ? bot : user}" 
  //     alt="${isai ? 'bot':'user'}"
  //     />

  // </div>
  //     <div class="message" id="${uniqueid}">
  //     ${value}
  //     </div>
  //     </div>
  //     </div>
  //     `
  //   )
  // }
  // const handlesubmit=async(e)=>{
  //   e.preventDefault();
  //   const data=new FormData(form);
  //   // console.log(prompt);
  //   chatContainer.innerHTML+=chatStripe(false,data.get('prompt'));
  //   form.reset();
  //   const uniqueid=generateuniqueid();
  //   chatContainer.innerHTML+=chatStripe(true," ",uniqueid);
  //   chatContainer.scrollTop=chatContainer.scrollHeight;
  //   const messageDiv=document.getElementById(uniqueid);
  //   loader(messageDiv);
  //   const response=await fetch('http://localhost:5000',{
  //     method:'POST',
  //     headers:{
  //       'Content-Type':'application/json',
  //     },
  //     body:JSON.stringify({
  //       prompt:data.get('prompt')
  //     })
  //   })
  //   clearInterval(loadInterval);
  //   messageDiv.innerHTML="";
  //   if(response.ok)
  //   {
  //     const data=await response.json();
  //     const parsedData=data.bot.trim();
  //     // console.log({parsedData});
  //     typeText(messageDiv,parsedData);
  //   }
  //   else{
  //     const err=await response.text();
  //     messageDiv.innerHTML="Something went Wrong";
  //     alert(err);
  //   }
  // }
  // form.addEventListener('submit',handlesubmit);
  // form.addEventListener('keyup',(e)=>{
  //   if(e.keyCode===13){
  //     handlesubmit(e);
  //   }
  // })



  import bot from './assets_codex/assets/bot.svg';
  import user from './assets_codex/assets/user.svg';
  
  const form = document.querySelector('form');
  const chatContainer = document.querySelector('#chat_container');
  let loadInterval;
  
  function loader(element) {
    element.textContent = '';
    loadInterval = setInterval(() => {
      element.textContent += '.';
      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300);
  }
  
  function typeText(element, text) {
    let index = 0;
    let interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  }
  
  function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
  }
  
  function chatStripe(isAI, value, uniqueId) {
    return `
      <div class="wrapper ${isAI && 'ai'}">
        <div class="chat">
          <div class="profile">
            <img src="${isAI ? bot : user}" alt="${isAI ? 'bot' : 'user'}" />
          </div>
          <div class="message" id="${uniqueId}">${value}</div>
        </div>
      </div>
    `;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'), generateUniqueId());
    form.reset();
    
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    const messageDiv = document.getElementById(uniqueId);
    loader(messageDiv);
  
    try {
      const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: data.get('prompt'),
        }),
      });
  
      clearInterval(loadInterval);
      messageDiv.innerHTML = "";
  
      if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim();  // Ensure the response from the bot is trimmed
        typeText(messageDiv, parsedData);
      } else {
        const err = await response.text();
        messageDiv.innerHTML = "Something went wrong";
        alert(err);  // Display detailed error
      }
    } catch (error) {
      clearInterval(loadInterval);
      messageDiv.innerHTML = "Something went wrong";
      alert(error.message);
    }
  };
  
  form.addEventListener('submit', handleSubmit);
  form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  });
  




  