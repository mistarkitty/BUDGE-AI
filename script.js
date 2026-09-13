const input = document.getElementById("messageInput");
const sendButton = document.querySelector(".send-button");
const messages = document.querySelector(".messages");

const BUDGE_WORKER_URL =
    "https://budge-ai-worker.mistarkitty.workers.dev/chat";

function addMessage(name, text, type) {
    const message = document.createElement("div");

    message.className = `message ${type}-message`;

    message.innerHTML = `
        <div class="message-header">
            <span class="message-name">${name}</span>
            <span class="message-time">NOW</span>
        </div>

        <div class="message-content"></div>
    `;

    message.querySelector(".message-content").textContent = text;

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;

    return message;
}

async function sendMessage() {
    const text = input.value.trim();

    if (!text) {
        return;
    }

    addMessage("YOU", text, "user");

    input.value = "";
    input.disabled = true;
    sendButton.disabled = true;

    const budgeMessage = addMessage(
        "BUDGE",
        "Thinking...",
        "budge"
    );

    try {
        const response = await fetch(BUDGE_WORKER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        if (!response.ok) {
            throw new Error(`Worker returned ${response.status}`);
        }

        const data = await response.json();

        budgeMessage.querySelector(".message-content").textContent =
            data.response;

    } catch (error) {
        console.error(error);

        budgeMessage.querySelector(".message-content").textContent =
            "BUDGE can't reach the brain right now.";
    }

    input.disabled = false;
    sendButton.disabled = false;
    input.focus();
}

sendButton.addEventListener("click", sendMessage);

const newChatButton = document.querySelector(".new-chat");

newChatButton.addEventListener("click", () => {
    messages.innerHTML = "";
    input.value = "";
    input.disabled = false;
    sendButton.disabled = false;
    input.focus();
});

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});
