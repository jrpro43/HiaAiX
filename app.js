const API_KEY = "sk-ws-H.IRHEPY.hSui.MEYCIQDiK2-tuF51VD1_O2uN6WudTu_AQK85sXR7Hqo6TVHzJgIhAKJ-3OhGD1TxKyXKjaMhSXSAT5hc629TbFfJul1MHimf";

const API_URL =
"https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions";

const MODEL = "qwen-plus";

async function sendMessage(){

    let input = document.getElementById("message");
    let text = input.value.trim();

    if(text === "") return;

    let chat = document.getElementById("chat");

    chat.innerHTML += `
    <div class="user">
        ${text}
    </div>
    `;

    input.value = "";

    chat.innerHTML += `
    <div class="ai" id="loading">
        AI لیکي...
    </div>
    `;

    chat.scrollTop = chat.scrollHeight;

    try{

        let response = await fetch(API_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + API_KEY
            },
            body:JSON.stringify({
                model:MODEL,
                messages:[
                    {
                        role:"system",
                        content:"You are a helpful AI assistant. Reply in Pashto when possible."
                    },
                    {
                        role:"user",
                        content:text
                    }
                ]
            })
        });

        let data = await response.json();

        document.getElementById("loading").remove();

        let answer = data.choices[0].message.content;

        chat.innerHTML += `
        <div class="ai">
            ${answer}
        </div>
        `;

        chat.scrollTop = chat.scrollHeight;

    }catch(e){

        document.getElementById("loading").remove();

        chat.innerHTML += `
        <div class="ai">
            Error: ${e.message}
        </div>
        `;
    }
}

document
.getElementById("message")
.addEventListener("keypress",function(e){

    if(e.key === "Enter"){
        sendMessage();
    }

});
