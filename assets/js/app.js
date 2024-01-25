const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const userContainer = document.querySelector('.card-container');
const noUserFound = document.querySelector('.error');

searchForm.addEventListener('submit',function(e){
    e.preventDefault();
    let searchValue = searchInput.value;
    fetchGithub(searchValue)
})

async function fetchGithub(person){
    const response = await fetch(`https://api.github.com/users/${person}`);
    const data = await response.json();
    console.log(data)
    if(response.ok == false){
        noUserFound.style.display = "block";
    }else{
        noUserFound.style.display = "none";
        getPerson(data);
        searchInput.value = "";
    }
}

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

async function getPerson(person){
    const date = new Date(person.created_at);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    userContainer.innerHTML = 
    `
    <img src=${person.avatar_url} alt="" class="profile-pic">
    <div class="profile-container">
        <div class="profile-top">
            <div class="user-infos">
                <h2 class="user-name">${person.name}</h2>
                <p class="user-address">@${person.login}</p>
            </div>
            <p class="join-date">Joined ${day} ${month} ${year}</p>
        </div>
        <p class="bio">${person.bio ? person.bio : "No bio information"}</p>
        <div class="github-infos-container">
            <div class="github-infos">
                <span class="github-infos-title">Repos</span>
                <span class="github-infos-content">${person.public_repos}</span>
            </div>
            <div class="github-infos">
                <span class="github-infos-title">Followers</span>
                <span class="github-infos-content">${person.followers}</span>
            </div>
            <div class="github-infos">
                <span class="github-infos-title">Following</span>
                <span class="github-infos-content">${person.following}</span>
            </div>
        </div>
        <div class="other-infos-container">
            <div class="other-infos ">
                <img src="assets/img/pin.svg" alt="">
                <p class="location other-infos-content">${person.location ? person.location : "No location information"}</p>
            </div>
            <div class="other-infos ">
                <img src="assets/img/twitter.svg" alt="">
                ${person.twitter_username ? `<a href="https://twitter.com/${person.twitter_username}" target="_blank">${person.twitter_username}</a>`
                :"<p class='twitter'>Not Available</p>"}
            </div>
            <div class="other-infos ">
                <img src="assets/img/url.svg" alt="">
                <a href="${person.html_url}" class="blog other-infos-content">${person.login}</a>
            </div>
            <div class="other-infos ">
                <img src="assets/img/building.svg" alt="">
                <a class="company other-infos-content">${person.company ? person.company : "Not Available"}</a>
            </div>
        </div>
    </div>
    `;
    

} 