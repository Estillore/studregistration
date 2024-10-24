export const updateAvatar = async (display, form) => {
  display.innerHTML += `
    <div class="container d-flex flex-column align-items-center" style="height: 300px;">
        <div class="border" style="width:250px; height:250px;">
          <img id="imagePreview" style="width:250px; height:250px;" />
        </div>
        <input type="file" class="form-control m-3" id="inputGroupFile02" name="imageUpload" style="width:250px;">
        <canvas class="position-absolute" id="overlay" width="300" height="300" style="display: none;"></canvas>
        <div id="statusMessage" style="color: red; margin-top: 10px;"></div>
    </div>
  `;

  const canvas = document.getElementById("overlay");
  const context = canvas.getContext("2d");
  const statusMessage = document.getElementById("statusMessage");
  const imageUpload = document.getElementById("inputGroupFile02");
  const imagePreview = document.getElementById("imagePreview");

  const loadModels = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(
        "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights/tiny_face_detector_model-weights_manifest.json"
      ),
      faceapi.nets.faceLandmark68Net.loadFromUri(
        "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights/face_landmark_68_model-weights_manifest.json"
      ),
      faceapi.nets.faceRecognitionNet.loadFromUri(
        "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights/face_recognition_model-weights_manifest.json"
      ),
      faceapi.nets.faceExpressionNet.loadFromUri(
        "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights/face_expression_model-weights_manifest.json"
      )
    ]);
    console.log("Face-api models loaded.");
  };

  imageUpload.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
      };

      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        try {
          const detections = await faceapi
            .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();

          const resizedDetections = faceapi.resizeResults(detections, {
            width: canvas.width,
            height: canvas.height
          });

          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

          if (resizedDetections.length > 0) {
            const landmarks = resizedDetections[0].landmarks.positions;
            const nose = landmarks[30];
            const leftEye = landmarks[36];
            const rightEye = landmarks[45];

            const eyeCenterX = (leftEye.x + rightEye.x) / 2;
            const isLookingStraight = Math.abs(nose.x - eyeCenterX) < 30;
            const isInProfile = nose.x < leftEye.x || nose.x > rightEye.x;

            if (isLookingStraight && !isInProfile) {
              statusMessage.textContent = "Face Approved!";
              statusMessage.style.color = "green";

              // Upload the image after face approval
              await uploadImage(file, form);
              saved_progress();
            } else {
              statusMessage.textContent = "Face Not Valid!";
              statusMessage.style.color = "red";
            }
          } else {
            statusMessage.textContent = "No face detected!";
            statusMessage.style.color = "red";
          }
        } catch (error) {
          console.error("Face detection error:", error);
          statusMessage.textContent = "Error during detection!";
          statusMessage.style.color = "red";
        }
      };

      reader.readAsDataURL(file);
    }
  });

  loadModels();
};

const uploadImage = async (file, form) => {
  try {
    const session_data = localStorage.getItem("sessionData");

    let user_id = null;

    if (session_data) {
      const parsed_data = JSON.parse(session_data);
      const user_data = parsed_data.session;
      user_id = user_data.studid;
    }

    const myform = new FormData(form);

    myform.append("image", file);
    myform.append("user_id", user_id);

    const response = await fetch("/uploadimage", {
      method: "POST",
      body: myform
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Image uploaded successfully:", result);
    } else {
      console.error("Upload failed:", result);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

const saved_progress = () => {
  const bar = document.getElementById("progressBar");
  const display = document.getElementById("display");

  bar.style.width = "75%";
  bar.textContent = "Waiting for approval";

  display.innerHTML = "";
  display.innerHTML = "waiting for approval"; //make UI.
};
