function calculateWorth() {
  const username = document.getElementById('username').value;

  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('User not found.');
    })
    .then(data => {
      displayUserCard(data);
      calculateAndDisplayWorth(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      displayErrorMessage('Username does not exist.');
    });
}

function displayUserCard(user) {
  const userCard = document.getElementById('user-card');
  userCard.classList.remove('hidden');

  const avatar = document.getElementById('avatar');
  avatar.src = user.avatar_url;
  avatar.alt = `${user.name}'s Profile Image`;

  const userInfoDiv = document.getElementById('user-info');
  userInfoDiv.innerHTML = `
    <h2>${user.name}</h2>
    <p><i class="fas fa-user"></i> Username: ${user.login}</p>
    <p><i class="fas fa-users"></i> Followers: ${user.followers}</p>
    <p><i class="fas fa-book"></i> Repositories: ${user.public_repos}</p>
  `;
}

function calculateAndDisplayWorth(user) {
  const worth = user.followers * 2 + user.public_repos * 5; 
  document.getElementById('worth-value').innerText = `GitHub Worth: $${worth}`;
}

function displayErrorMessage(message) {
  const userCard = document.getElementById('user-card');
  userCard.classList.remove('hidden');

  const avatar = document.getElementById('avatar');
  avatar.src = '';
  avatar.alt = 'No Profile Image';

  const userInfoDiv = document.getElementById('user-info');
  userInfoDiv.innerHTML = `<p>${message}</p>`;

  const worthValueDiv = document.getElementById('worth-value');
  worthValueDiv.innerText = '';
}
