const API_KEY = "sk-ws-H.IRHEPY.hSui.MEYCIQDiK2-tuF51VD1_O2uN6WudTu_AQK85sXR7Hqo6TVHzJgIhAKJ-3OhGD1TxKyXKjaMhSXSAT5hc629TbFfJul1MHimf";

const API_URL =
"https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions";

const MODEL = "qwen-plus";

async function typeWriter(element,text){

    element.innerHTML="";

    for(let i=0;i<text.length;i++){

        element.innerHTML+=text.charAt(i);

        chat.scrollTop=chat.scrollHeight;

        await new Promise(r=>setTimeout(r,15));

    }

}

async function sendMessage(){

    let input=document.getElementById("message");

    let text=input.value.trim();

    if(text=="") return;

    let chat=document.getElementById("chat");

    chat.innerHTML+=`
    <div class="user">
    ${text}
    </div>
    `;

    input.value="";

    chat.innerHTML+=`
    <div class="ai" id="loading">

    <div class="typing">
    <span></span>
    <span></span>
    <span></span>
    </div>

    </div>
    `;

    chat.scrollTop=chat.scrollHeight;

    try{

        let response=await fetch(API_URL,{

            method:"POST",

            headers:{

                "Content-Type":"application/json",

                "Authorization":"Bearer "+API_KEY

            },

            body:JSON.stringify({

                model:MODEL,

                messages:[

                    {
                        role:"system",
                        content:"You are HIA AI. Reply in Pashto when possible."
                    },

                    {
                        role:"user",
                        content:text
                    }

                ]

            })

        });

        let data=await response.json();

        document.getElementById("loading").remove();

        let answer=data.choices[0].message.content;

        let ai=document.createElement("div");

        ai.className="ai";

        chat.appendChild(ai);

        await typeWriter(ai,answer);

        ai.innerHTML=marked.parse(answer);

        chat.scrollTop=chat.scrollHeight;

    }

    catch(e){

        document.getElementById("loading").remove();

        chat.innerHTML+=`

        <div class="ai">

        Error :

        ${e.message}

        </div>

        `;

    }

}

document
.getElementById("message")
.addEventListener("keypress",function(e){

    if(e.key=="Enter"){

        sendMessage();

    }

});
