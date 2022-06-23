const player1 = {
    name: 'SCORPION',
    hp: 95,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['gun'],
    attack: function(){
        console.log(this.name + ' Fight...');
    }
};

const player2 = {
    name: 'KITANA',
    hp: 98,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['sword'],
    attack: function(){
        console.log(this.name + ' Fight...');
    }
};

function createPlayer(className, player){
    const $arenas = document.querySelector('.arena1');
    const $player = document.createElement('div');
    $player.classList.add(className);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');
    $player.appendChild($progressbar);

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = player.hp + '%';
    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = player.name;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    const $character = document.createElement('div');
    $character.classList.add('character');
    $img = document.createElement('img');
    $img.src = player.img;
    $character.appendChild($img);
    $player.appendChild($character);
    
    $arenas.appendChild($player);
}

createPlayer('player1', player1);
createPlayer('player2', player2);