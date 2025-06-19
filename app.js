// selectors
let userInput = document.querySelector("input");
let searchBtn = document.querySelector("#search");
let infoBox = document.querySelector(".container .info-box");
let theme = document.querySelector("#theme");
const main = document.querySelector("main");
console.log(main)

// get data 
let getData = () => {
    let username = userInput.value.trim();

    if (username === "") {
        infoBox.innerHTML = "<p>Please enter a username</p>";
        return;
    }

    infoBox.innerHTML = 
    `<div class="loader">
    <span class="loader-text">loading</span>
      <span class="load"></span>
  </div>
`

    const url = `https://api.github.com/users/${username}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data && !data.message) {
                infoBox.innerHTML = `
                <div class="userDetails">
                <div class="userimage">
                <img src="${data.avatar_url}" width="150" />
                </div>
                <div class="more">
                 <h3>Name - ${data.name || "No name available"}</h3>
                        <p><strong>Username:</strong> ${data.login}</p>
                        <p><strong>Public Repos:</strong> ${data.public_repos}</p>
                        <p><strong>Followers:</strong> ${data.followers}</p>
                        <a href="${data.html_url}" target="_blank">Visit Profile</a>
                </div>
                    </div>`;
            } else {
                infoBox.innerHTML = "<p>User not found</p>";
            }
        })
        .catch((err) => {
            infoBox.innerHTML = "<p>Error fetching data</p>";
            console.error(err);
        });
};

// search button event
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
       getData();
       infoBox.style.opacity = "10"
});

// theme button event 

main.style.backgroundImage = " linear-gradient(60deg, #29323c 0%, #485563 100%)";

infoBox.style.backgroundImage = "linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)"

let isDarkMode = true;

theme.addEventListener("click", () => {
    if (isDarkMode) {
        main.style.backgroundImage = "linear-gradient(-225deg, #7DE2FC 0%, #B9B6E5 100%)";
        infoBox.style.backgroundImage = "linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%)";
        
    } else {
        main.style.backgroundImage = "linear-gradient(60deg, #29323c 0%, #485563 100%)";
        infoBox.style.backgroundImage = "linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)"
    }
    isDarkMode = !isDarkMode;
});
