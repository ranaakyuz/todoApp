class UI {
    constructor() {
        this.profilContentDiv = document.querySelector("#profilContentDiv");
        this.githubNameInput = document.querySelector("#githubName");
        this.tableContent = document.querySelector("#tableContent");
        this.table = document.querySelector("#table");
        this.searchedUserList = document.querySelector("#searchedUserList");
        this.isShowRepo = true;
    }
    addUserProfileToUI(user) {
        this.profilContentDiv.innerHTML = ``;
        this.profilContentDiv.innerHTML = `
            <div class="col-sm-12 col-md-4 col-lg-4">
                <div id="profilDiv">
                    <img id="profilimg" src="${user.avatar_url}" alt="">
                    <hr style="border: 1px solid lightgray; width: 100px;">
                    <span>${user.name}</span>
                </div>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-8">
                <div id="badgeDiv" class="mt-1">
                    <button type="button" class="btn btn-primary">
                        Takipçi <span class="badge badge-light">${user.followers}</span>
                    </button>
                    <button type="button" class="btn btn-success">
                        Takip Edilen <span class="badge badge-light">${user.following}</span>
                    </button>
                    <button type="button" class="btn btn-secondary">
                        Repolar <span class="badge badge-light">${user.public_repos}</span>
                    </button>
                </div>
                <div id="infoDİv" class="mt-3">
                    <div class="info">
                        <img src="images/user.png" width="40" height="40" alt="">
                        <span>${user.company == null ? "" : user.company}</span>
                    </div>
                    <div class="info">
                        <img src="images/location.png" width="40" height="40" alt="">
                        <span>${user.location == null ? "" : user.location}</span>
                    </div>
                    <div class="info">
                        <img src="images/mail.png" width="40" height="40" alt="">
                        <span>${user.email == null ? "" : user.email}</span>
                    </div>
                    <div class="info">
                        <a id="showRepo" href="#">Repoları Göster</a>
                    </div>
                </div>
            </div>`
    }

    fillSearchedUserToUIFromStorage() {
        const users = Storagex.getSearchUserFromStorage();
        if (users != null && users.length > 0) {
            users.forEach(user => {
                const li = document.createElement("li");
                li.className = "list-group-item";
                li.textContent = user;
                this.searchedUserList.appendChild(li);
            })
        }
    }

    addSearchedUserToUI(username) {
        //<li class="list-group-item">rana</li>
        if (Storagex.checkUser(username)) {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = username;
            this.searchedUserList.appendChild(li);
        }
    }

    changeMessage() {
        const showRepoLink = document.querySelector("#showRepo");
        if (this.isShowRepo) {
            showRepoLink.textContent = "Repoları Göster";
        } else {
            showRepoLink.textContent = "Repoları Kapat";
        }
    }

    showRepos(repos) {
        if (this.isShowRepo) {
            if (repos != null && repos.length > 0) {
                let sayac = 1;
                this.tableContent.innerHTML = "";
                repos.forEach(repo => {
                    this.tableContent.innerHTML += `
                    <tr>
                        <th scope="row">${sayac}</th>
                        <td>${repo.name}</td>
                        <td>${repo.created_at}</td>
                    </tr>
                `;
                    sayac++;
                })
            }
            this.isShowRepo = false;
            this.changeMessage();
        } else {
            this.isShowRepo = true;
            this.changeMessage();
            this.tableContent.innerHTML = "";
        }

    }
    
    clearSearchedUsers(){
        this.searchedUserList.innerHTML="";
    }

    clearInput() {
        this.githubNameInput.value = "";
        this.profilContentDiv.innerHTML = "";
        this.tableContent.innerHTML = "";
    }
}