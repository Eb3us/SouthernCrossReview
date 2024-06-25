const SendMail = (event) => {
  event.preventDefault();
  const params = {
    name: document.querySelector("#name").value,
    email_id: document.querySelector("#email_id").value,
    message: document.querySelector("#message").value,
  };
  emailjs.send("service_knatlt4", "template_vayz2gi", params).then((res) => {
    alert("You are now successfully unsubscribed!");
  });
};
document.querySelector("#unsubscribe_form").addEventListener("submit", SendMail, true)
