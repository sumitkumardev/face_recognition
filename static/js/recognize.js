const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snapBtn = document.getElementById("snap");
const resultP = document.getElementById("result");

// navigator.mediaDevices.getUserMedia({ video: true })
//     .then(stream => video.srcObject = stream)
//     .catch(e => alert("Error accessing webcam"));
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(error => {
    console.error("Error accessing webcam:", error);
  });

snapBtn.onclick = () => {
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL("image/jpeg");

    fetch("/recognize_face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageDataURL })
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                resultP.innerText = `Welcome ${data.name}, Age: ${data.age}, Gender: ${data.gender}, Phone: ${data.number}, Address: ${data.address}, State: ${data.state}, City: ${data.city}, Country: ${data.country}, PIN: ${data.postal}, College: ${data.college.name}, Branch: ${data.college.branch}`;
            } else {
                resultP.innerText = data.message || "Face not recognized";
            }
        })
        .catch(() => {
            resultP.innerText = "Recognition error";
        });
};
// add 10 ms to allow the button to start