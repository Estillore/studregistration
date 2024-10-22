export const updateAvatar = (display) => {
  display.innerHTML += `
    <div class="container d-flex justify-content-center align-items-center" style="height: 300px;">
      <div class="position-relative">
        <video id="camera" width="300" height="300" class="position-absolute" autoplay muted></video>
        <canvas id="overlay" width="300" height="300" class="position-absolute"></canvas>
      </div>
      <div id="statusMessage" style="color: red; margin-top: 10px;"></div>
    </div>
  `;

  const camera = document.getElementById("camera");
  const canvas = document.getElementById("overlay");
  const context = canvas.getContext("2d");
  const statusMessage = document.getElementById("statusMessage");

  const captureImage = () => {
    context.drawImage(camera, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    sendImageToServer(imageData);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        camera.srcObject = stream;
        camera.addEventListener("play", () => {
          const displaySize = { width: camera.width, height: camera.height };
          faceapi.matchDimensions(canvas, displaySize);

          const intervalId = setInterval(async () => {
            if (!camera.paused && !camera.ended) {
              try {
                const detections = await faceapi
                  .detectAllFaces(camera, new faceapi.TinyFaceDetectorOptions())
                  .withFaceLandmarks()
                  .withFaceExpressions();

                const resizedDetections = faceapi.resizeResults(
                  detections,
                  displaySize
                );

                context.clearRect(0, 0, canvas.width, canvas.height);

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

                    captureImage();
                  } else {
                    statusMessage.textContent = "Face Not Valid!";
                    statusMessage.style.color = "red";
                  }
                }
              } catch (error) {
                console.error("Face detection error:", error);
              }
            } else {
              clearInterval(intervalId);
            }
          }, 200);
        });
      })
      .catch((err) => console.error("Error accessing camera: ", err));
  };

  Promise.all([
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
  ]).then(startVideo);

  const sendImageToServer = (imageData) => {
    console.log(imageData);
  };
};
