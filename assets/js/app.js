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
        <p class="bio">${person.bio ? person.bio : "This profile has no bio"}</p>
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
            <div class="other-infos location">
                <img src="assets/img/pin.svg" alt="">
                <p class=" other-infos-content">${person.location ? person.location : "Not Available"}</p>
            </div>
            <div class="other-infos twitter">
                <img src="assets/img/twitter.svg" alt="">
                ${person.twitter_username ? `<a href="https://twitter.com/${person.twitter_username}" target="_blank">${person.twitter_username}</a>`
                :"<p class='other-infos-content'>Not Available</p>"}
            </div>
            <div class="other-infos blog">
                <img src="assets/img/url.svg" alt="">
                <a href="${person.html_url}" class=" other-infos-content">${person.login}</a>
            </div>
            <div class="other-infos company">
                <img src="assets/img/building.svg" alt="">
                <p class=" other-infos-content">${person.company ? person.company : "Not Available"}</p>
            </div>
        </div>
    </div>
    `;

    if(!person.location){
        console.log('person')
        document.querySelector('.location').style.opacity = '0.5';
    }
    if(!person.company){
        console.log('company')
        document.querySelector('.company').style.opacity = '0.5';
    }
    if(!person.html_url){
        console.log('blog')
        document.querySelector('.blog').style.opacity = '0.5';
    }
    if(!person.bio){
        console.log('bio');
        document.querySelector('.bio').style.opacity = '0.5';
    }
    if(!person.twitter_username){
        document.querySelector('.twitter').style.opacity = '0.5';
    }

} 