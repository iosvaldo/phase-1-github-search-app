document.addEventListener('DOMContentLoaded', init)

function init() {
  const form = document.querySelector('#github-form')

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let base_Url = 'http://api.github.com/search/users?q=octocat'
    const query = document.querySelector('#search').value

    fetch(`${base_Url}+${query}`)
      .then(res => res.json())
      .then(data => display(data))
  })
}

function display(gits) {
  const userList = document.querySelector('#user-list')
  gits.items.forEach(user => {
    let listcont = document.createElement('li')
    listcont.textContent = user.login
    userList.appendChild(listcont)
    let div = document.createElement('div')
    let listavatar = document.createElement('img')
    listavatar.src = user.avatar_url
    listavatar.style.width = '150px'
    let listrepo = document.createElement('p')
    listrepo.textContent = user.url
    div.append(listavatar, listrepo)
    listcont.append(div)
    listcont.addEventListener('click', () => {
      let clicktext = user.login;
      console.log(user.login)
      fetch(`https://api.github.com/users/${clicktext}/repos`)
        .then(res => res.json())
        .then(data => displayRepos(data))
    })
  })
}

function displayRepos(repos) {
  let repoContainer = document.querySelector('#repos-list')
  repos.forEach(repo => {
    let listItem = document.createElement('li')
    let anchor = document.createElement('a')
    anchor.href = repo.html_url
    anchor.innerText = repo.name
    listItem.appendChild(anchor)
    repoContainer.appendChild(listItem)
  })
}