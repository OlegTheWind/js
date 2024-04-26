
const searchInput = document.getElementById('searchInput');
const autocomplete = document.getElementById('autocomplete');
const repositoryList = document.getElementById('repositoryList');

searchInput.addEventListener('input', debounce(handleSearch, 500));

function handleSearch() {
    autocomplete.innerHTML = '';
    if (searchInput.value.trim() !== '') {
        fetch(`https://api.github.com/search/repositories?q=${searchInput.value}`)
            .then(response => response.json())
            .then(data => {
                data.items.slice(0, 5).forEach(item => {
                    const repoItem = document.createElement('div');
                    repoItem.textContent = item.full_name;
                    repoItem.addEventListener('click', () => {
                        addRepositoryToList(item);
                        searchInput.value = '';
                        autocomplete.innerHTML = '';
                    });
                    autocomplete.appendChild(repoItem);
                });
            });
    }
}

function addRepositoryToList(repo) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `Репозиторий: ${repo.full_name}, Пользователь: ${repo.owner.login}, Звезд: ${repo.stargazers_count}`;
    const urlItem = document.createElement('a')
    urlItem.href = repo.owner.html_url
    urlItem.innerHTML = `${repo.owner.html_url}`
    urlItem.target = '_blank';
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', () => {
        repositoryList.removeChild(listItem);
        repositoryList.removeChild(urlItem);
        repositoryList.removeChild(deleteButton);
    });
    repositoryList.appendChild(listItem);
    repositoryList.appendChild(urlItem);
    repositoryList.appendChild(deleteButton);
}

function debounce(func, timeout) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(func, timeout);
    };
}