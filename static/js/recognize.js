// Version 1.0
// This script handles webcam access, image capture, and face recognition requests.
// const video = document.getElementById("video");
// const canvas = document.getElementById("canvas");
// const snapBtn = document.getElementById("snap");
// const resultP = document.getElementById("result");

// // navigator.mediaDevices.getUserMedia({ video: true })
// //     .then(stream => video.srcObject = stream)
// //     .catch(e => alert("Error accessing webcam"));
// navigator.mediaDevices.getUserMedia({ video: true })
//   .then(stream => {
//     video.srcObject = stream;
//     video.play();
//   })
//   .catch(error => {
//     console.error("Error accessing webcam:", error);
//   });

// snapBtn.onclick = () => {
//     const context = canvas.getContext("2d");
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const imageDataURL = canvas.toDataURL("image/jpeg");

//     fetch("/recognize_face", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ image: imageDataURL })
//     })
//         .then(res => res.json())
//         .then(data => {
//             if (data.status === "success") {
//                 resultP.innerText = `Welcome ${data.name}, Age: ${data.age}, Gender: ${data.gender}, Phone: ${data.number}, Address: ${data.address}, State: ${data.state}, City: ${data.city}, Email: ${data.email}, PIN: ${data.postal}, College: ${data.college.name}, Branch: ${data.college.branch}`;
//             } else {
//                 resultP.innerText = data.message || "Face not recognized";
//             }
//         })
//         .catch(() => {
//             resultP.innerText = "Recognition error";
//         });
// };
// // add 10 ms to allow the button to start

// version 2.0
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snapBtn = document.getElementById("snap");
const resultP = document.getElementById("result");

// Start webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(error => {
        console.error("Error accessing webcam:", error);
        resultP.innerText = "Unable to access webcam";
        resultP.style.display = "block";
    });

// Clear previous result
function clearResultFields() {
    resultP.innerHTML = "";
    resultP.style.display = "none";
}

// On Scan Button Click
snapBtn.onclick = () => {
    clearResultFields();

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
                resultP.innerHTML = `
                <table> <caption>Personal details</caption>
                    <tr class="name"><td>Full Name:</td><td><strong>${data.name}</strong></td></tr>
                    <tr class="age"><td>Age: </td><td>${data.age}</td></tr>
                    <tr class="gender"><td>Gender: </td><td>${data.gender}</td></tr>
                    <tr class="number"><td>Phone: </td><td>${data.number}</td></tr>
                    <tr class="address"><td>Address: </td><td>${data.address}</td></tr>
                    <tr class="state"><td>State: </td><td>${data.state}</td></tr>
                    <tr class="city"><td>City: </td><td>${data.city}</td></tr>
                    <tr class="email"><td>Email: </td><td>${data.email || "N/A"}</td></tr>
                    <tr class="postal"><td>PIN: </td><td>${data.postal}</td></tr>
                    <tr class="collegeName"><td>College: </td><td>${data.college.name || "N/A"}</td></tr>
                    <tr class="collegeBranch"><td>Branch: </td><td>${data.college.branch || "N/A"}</td></tr>  </table>
                `;
                resultP.style.display = "block";
            } else {
                resultP.innerText = data.message || "Face not recognized.";
                resultP.style.display = "block";
            }
        })
        .catch(err => {
            console.error("Recognition error:", err);
            resultP.innerText = "Recognition error";
            resultP.style.display = "block";
        });
};
