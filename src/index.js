import './style.css';

const path = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/mp0tDZUYbGGWwHhURdqQ/scores/'
const list = document.querySelector('.list');
const form = document.querySelector('.input');
const refresh = document.querySelector('.btn');
const getScores = async () => {
    const response = await fetch(path);
    const data = await response.json();
    return data;
};

const display = async () => {
    const data = await getScores();
    data.result.forEach((e) => {
        const listItem = document.createElement('li');
        listItem.className = 'listItem'
        const userName = document.createElement('h2');
        const points = document.createElement('h2');

        list.appendChild(listItem);
        listItem.appendChild(userName);
        listItem.appendChild(points);

        userName.textContent = e.user;
        points.textContent = e.score;
    });
};

const addNewScore = async (userName, points) => {
    await fetch(path,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: userName,
                score: points,
            }),
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data
        })
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const userName = document.querySelector('.name-input').value;
    const points = document.querySelector('.score-input').value;
    if (userName !== "" && points !== "") {
        addNewScore(userName, points);
        const addScore = document.createElement('h4');
        addScore.classList.add('addScore');
        addScore.textContent = 'Your score has been added! Click the refresh button to see it on the leader board';
        form.appendChild(addScore);
        setTimeout(() => {
            addScore.remove();
        }, 2000);
        form.reset();
    } else {
        const error = document.createElement('h4');
        error.classList.add('addScore');
        error.textContent = 'Fill in all the fields please!';
        form.appendChild(error);
        setTimeout(() => {
            error.remove();
        }, 3000);
    }
});

refresh.addEventListener('click', () => {
    list.innerHTML = '';
    display();
});

display();