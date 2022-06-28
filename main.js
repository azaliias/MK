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
    },
    changeHP: changeHP,
    renderHP: renderHP,
    elHP: elHP,
};

const player2 = {
    player: 2,
    name: 'KITANA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['sword'],
    attack: function(){
        console.log(this.name + ' Fight...');
    },
    changeHP: changeHP,
    renderHP: renderHP,
    elHP: elHP,
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

function changeHP(damage){
    this.hp -= damage;
    
    if(this.hp <= 0){
        this.hp = 0;
    }
}

function renderHP(){
    return this.elHP().style.width = this.hp + '%';
}

function elHP(){
    return document.querySelector('.player' + this.player + ' .life');
}

function playerWins(name){
    const $winTitle = createElement('div', 'winTitle');

    if(name){
        $winTitle.innerText = name + ' wins';
    } else {
        $winTitle.innerText = 'draw';
    }
    
    return $winTitle;
}

function createReloadButton(){
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadBtn = createElement('button', 'button');
    $reloadBtn.innerText = 'Restart';

    $reloadWrap.appendChild($reloadBtn)
    return $reloadWrap;
}

function getRandom(num){
    return Math.ceil(Math.random() * num);
}

$randomBtn.addEventListener('click', function() {
    player1.changeHP(getRandom(20));
    player2.changeHP(getRandom(20));
    player1.renderHP();
    player2.renderHP();

    if(player1.hp <= 0 || player2.hp <= 0){
        $randomBtn.disabled = true;
        const $reloadBtn = createReloadButton();

        $reloadBtn.addEventListener('click', function(){
            window.location.reload();
        });

        $arenas.appendChild($reloadBtn);
    }
    
    if(player1.hp <= 0 && player1.hp < player2.hp){
        $arenas.appendChild(playerWins(player2.name));
    } else if(player2.hp <= 0 && player2.hp < player1.hp){
        $arenas.appendChild(playerWins(player1.name));
    } else if(player1.hp === 0 && player2.hp === 0){
        $arenas.appendChild(playerWins());
    }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));