const $arenas = document.querySelector('.arenas');
const $randomBtn = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['gun'],
    attack: function(){
        console.log(this.name + ' Fight...');
    }
};

const player2 = {
    player: 2,
    name: 'KITANA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['sword'],
    attack: function(){
        console.log(this.name + ' Fight...');
    }
};

function createElement(tag, className){
    const $tag = document.createElement(tag);
    if(className){
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(playerObject){
    const $player = createElement('div', 'player' + playerObject.player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');
    
    $life.style.width = playerObject.hp + '%';
    $name.innerText = playerObject.name;
    $img.src = playerObject.img;
    
    $player.appendChild($progressbar);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
    $player.appendChild($character);
    
    return $player;
}

function changeHP(player){
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= Math.ceil(Math.random() * 20);
    $playerLife.style.width = player.hp + '%';

    if(player.hp <= 0){
        player.hp = 0;
        $playerLife.style.width = player.hp + '%';
        let winner = player.player === 1 ? player2 : player1;
        
        $arenas.appendChild(playerWin(winner.name));
    }
}

function playerWin(name){
    const $winTitle = createElement('div', 'winTitle');
    $winTitle.innerText = name + ' win';
    $randomBtn.disabled = true
    return $winTitle;
}

$randomBtn.addEventListener('click', function() {
    changeHP(player1);
    if(player1.hp > 0){
        changeHP(player2);
    }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));