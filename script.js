const usernameInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const profileCard = document.getElementById("profileCard");

const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const bio = document.getElementById("bio");
const login = document.getElementById("login");
const joinDate = document.getElementById("joinDate");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");
const portfolio = document.getElementById("portfolio");

const repoSection = document.getElementById("repoSection");
const repoList = document.getElementById("repoList");

function formatDate(date) {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

async function searchUser() {

    const username = usernameInput.value.trim();

    if (username === "") {
        alert("Please enter a GitHub username.");
        return;
    }

    loading.classList.remove("hidden");
    error.classList.add("hidden");
    profileCard.classList.add("hidden");
    repoSection.classList.add("hidden");
    repoList.innerHTML = "";

    try {

        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error("User not found");
        }

        const user = await response.json();

        avatar.src = user.avatar_url;
        avatar.alt = `${user.login} Avatar`;

        name.textContent = user.name || "No Name";

        bio.textContent = user.bio || "Bio not available";

        login.textContent = user.login;

        joinDate.textContent = formatDate(user.created_at);

        followers.textContent = user.followers;

        following.textContent = user.following;

        repos.textContent = user.public_repos;

        if (user.blog) {

            portfolio.href = user.blog.startsWith("http")
                ? user.blog
                : "https://" + user.blog;

            portfolio.textContent = "Visit Website";

        } else {

            portfolio.removeAttribute("href");
            portfolio.textContent = "Not Available";

        }

        profileCard.classList.remove("hidden");

        loadRepositories(user.repos_url);

    } catch (err) {

        error.classList.remove("hidden");

    } finally {

        loading.classList.add("hidden");

    }

}

searchBtn.addEventListener("click", searchUser);

usernameInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchUser();
    }

});
async function loadRepositories(repoUrl) {

    repoList.innerHTML = "";

    try {

        const response = await fetch(repoUrl);

        if (!response.ok) {
            throw new Error("Repositories not found");
        }

        const repositories = await response.json();

        repositories
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5)
            .forEach(repo => {

                const li = document.createElement("li");

                const link = document.createElement("a");

                link.href = repo.html_url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.textContent = repo.name;

                li.appendChild(link);

                repoList.appendChild(li);

            });

        if (repositories.length === 0) {

            const li = document.createElement("li");
            li.textContent = "No public repositories found.";
            repoList.appendChild(li);

        }

        repoSection.classList.remove("hidden");

    } catch (err) {

        repoSection.classList.add("hidden");

    }

}
const userOne = document.getElementById("userOne");
const userTwo = document.getElementById("userTwo");
const battleBtn = document.getElementById("battleBtn");
const battleResult = document.getElementById("battleResult");

async function getUserStars(username) {

    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
        throw new Error("User not found");
    }

    const user = await response.json();

    const repoResponse = await fetch(user.repos_url);
    const repositories = await repoResponse.json();

    const totalStars = repositories.reduce((sum, repo) => {
        return sum + repo.stargazers_count;
    }, 0);

    return {
        username: user.login,
        avatar: user.avatar_url,
        stars: totalStars,
        profile: user.html_url
    };

}

async function compareUsers() {

    const firstUser = userOne.value.trim();
    const secondUser = userTwo.value.trim();

    if (firstUser === "" || secondUser === "") {
        alert("Please enter both GitHub usernames.");
        return;
    }

    battleResult.innerHTML = "<p>Comparing users...</p>";

    try {

        const [userA, userB] = await Promise.all([
            getUserStars(firstUser),
            getUserStars(secondUser)
        ]);

        if (userA.stars > userB.stars) {

            battleResult.innerHTML = `
                <h3>🏆 Winner: ${userA.username}</h3>
                <p>Total Stars: ${userA.stars}</p>

                <h3 style="margin-top:20px;">❌ Loser: ${userB.username}</h3>
                <p>Total Stars: ${userB.stars}</p>
            `;

        } else if (userB.stars > userA.stars) {

            battleResult.innerHTML = `
                <h3>🏆 Winner: ${userB.username}</h3>
                <p>Total Stars: ${userB.stars}</p>

                <h3 style="margin-top:20px;">❌ Loser: ${userA.username}</h3>
                <p>Total Stars: ${userA.stars}</p>
            `;

        } else {

            battleResult.innerHTML = `
                <h3>🤝 It's a Tie!</h3>

                <p>${userA.username}: ${userA.stars} ⭐</p>

                <p>${userB.username}: ${userB.stars} ⭐</p>
            `;

        }

    } catch (error) {

        battleResult.innerHTML = `
            <p style="color:red;">
                Invalid GitHub username. Please try again.
            </p>
        `;

    }

}

battleBtn.addEventListener("click", compareUsers);

userOne.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        compareUsers();
    }
});

userTwo.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        compareUsers();
    }
});