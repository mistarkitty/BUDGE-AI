const input = document.getElementById("messageInput");
const sendButton = document.querySelector(".send-button");
const messages = document.querySelector(".messages");

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
}


function sendMessage() {
    const text = input.value.trim();

    if (!text) {
        return;
    }

    addMessage("YOU", text, "user");

    input.value = "";

    /*
     * Temporary response.
     * This will eventually be replaced with:
     *
     * fetch("/api/chat", ...)
     */

    setTimeout(() => {
        addMessage(
            "BUDGE",
            "I'm not connected to my brain yet. Give me a minute.",
            "budge"
        );
    }, 350);
}


sendButton.addEventListener("click", sendMessage);


input.addEventListener("keydown", (event) => {

    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }

});
