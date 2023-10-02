
// MAX = 10000000000000

// import data from '../user/account_details.json' assert { type: 'JSON' };
// console.log(data)

// function loginAccount(){
//     username = document.getElementById("un").value
//     password = document.getElementById("pw").value
//     checkInput(username, password)
//     alert("You have logged-in successfully")
// }

//not working atm
function checkInput(username, password){
    $.getJSON("public/user/account_details.json", function(data){
        console.log(data)
    })

}

function setCustomizations(details, id){

    //dumb method of searching (best to implement some searching algorithm if users were to grow)
    console.log("Running!")
    for (let custom of details) {
        console.log(custom.todo)
        if (custom.id == id){
            sessionStorage.setItem("logged-in", true)
            sessionStorage.setItem("custom-wallpaper", custom.customWallpaper)
            sessionStorage.setItem("wallpaper", custom.wallpaper)
            sessionStorage.setItem("todo", custom.todo)
            sessionStorage.setItem("latest-video", custom.latestVideo)
            console.log("Custom details stored in session storage!\n")
            
            //change destination (video.html as current default)
            document.location.href = "video.html"
        }
        
    }

 }


//potential method of generating ids without installing uuid
//console.log(Math.round(Math.random() * (10000000000000)))


//JSON format

// {
//     "user": [
//         {
//             "id": "515611556847",
//             "username": "Test",
//             "password": "pass123"
//         },
//         {
//             "id": "6089445170230",
//             "username": "Bob",
//             "password": "The Builder"
//         }
       

//     ],
//     "details": [
//         {
//             "id": 515611556847,
//             "custom-wallpaper": true,
//             "wallpaper": "https://cdn.vox-cdn.com/thumbor/WR9hE8wvdM4hfHysXitls9_bCZI=/0x0:1192x795/1400x1400/filters:focal(596x398:597x399)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg",
//             "todo": [
//                 {
//                     "task": "Finish website",
//                     "due": "April 19, 2023"
//                 }
//             ],
//             "latest-video": "https://www.youtube.com/embed/7pO39Sh6THg"
//         }
//     ]
// }