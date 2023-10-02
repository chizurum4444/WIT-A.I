// JavaScript function to replace the sample image
function replaceSampleImage() {
    const fileInput = document.getElementById('file-upload');
    const imagePreview = document.querySelector('.sample-image img');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}

// JavaScript function to detect and analyze the uploaded image
function detectAndAnalyzeImage() {
    const fileInput = document.getElementById("file-upload");
    const messageDiv = document.getElementById("image-upload-message");
    const analysisResultsTable = document.getElementById("analysis-results");

    // Check if an image is uploaded
    if (!fileInput.files || fileInput.files.length === 0) {
        messageDiv.innerText = "Please upload an image first";
        messageDiv.style.display = "block";
        return;
    }

    // Get the uploaded image file
    const imageFile = fileInput.files[0];

    // Create a binary data buffer from the image file
    const reader = new FileReader();

    reader.onload = function () {
        // Use the reader's result (binary data) to send to AWS Rekognition
        const binaryImage = reader.result;

        const awsConfig = {
            accessKeyId: 'AKIASTMBE5QO655D6GNX',
            secretAccessKey: 'hQPpGTHNgT6WObFBsF0ZCdPnLa/Zo8TBPPkQyItr',
            region: 'us-east-1', // Replace with your desired AWS region
        };

        AWS.config.update(awsConfig);
        const rekognition = new AWS.Rekognition();

        const params = {
            Image: {
                Bytes: binaryImage, // Use the binary image data here
            },
        };

        rekognition.detectLabels(params, (err, data) => {
            if (err) {
                if (err.code === "InvalidImageFormatException") {
                    messageDiv.innerText = "Invalid image format. Please upload a valid image.";
                } else {
                    console.error(err, err.stack);
                    messageDiv.innerText = `Error analyzing the image: ${err.message}`;
                }
                messageDiv.style.display = "block";
            } else {
                // Process the analysis results
                const labels = data.Labels;

                // Prepare the results for display in a table
                const resultsHTML = labels.map((label) => {
                    return `<tr><td>${label.Name}</td><td>${label.Confidence.toFixed(2)}%</td></tr>`;
                }).join("");


                // Save the results to sessionStorage for display on the results page
                sessionStorage.setItem("uploadedImageSrc", URL.createObjectURL(imageFile));
                sessionStorage.setItem("analysisResults", resultsHTML);

                // Redirect to the results page
                window.location.href = "results.html";
            }
        });
    };

    // Read the image file as a binary data buffer
    reader.readAsArrayBuffer(imageFile);
}



window.onload = checkLogin
function checkLogin(){
    console.log("Checking if logged in")
    console.log(sessionStorage.getItem("logged-in") == "true")
    if (sessionStorage.getItem("logged-in") == "true"){
        
        console.log(sessionStorage.getItem("customWallpaper"))
        if (sessionStorage.getItem("customWallpaper") == "true"){
            setWallpaper()
            console.log("Custom wp true!")
        }
        document.getElementById("login").style.visibility = "hidden"
        document.getElementById("customize-wallpaper").style.visibility = "visible"
        document.getElementById("signup/logout").href = "main.html"
        document.getElementById("signup/logout").innerText = "Log Out"
        document.getElementById("signup/logout").onclick = endSession
    }
}


function setWallpaper(){
    let wallpaper = sessionStorage.getItem("wallpaper")
    console.log(sessionStorage.getItem("wallpaper"))
    if (wallpaper) {
        let url1 = "url('"
        let url2 = "')"
        let wp = (url1.concat(wallpaper)).concat(url2)
        document.getElementById("background-img").style.backgroundImage = wp
    } else {
        setWallpaper()
    }
}

function endSession(){
    sessionStorage.removeItem("logged-in")
    sessionStorage.removeItem("customWallpaper")
    sessionStorage.removeItem("wallpaper")
    sessionStorage.removeItem("todo")
    sessionStorage.removeItem("latest-video")
}
