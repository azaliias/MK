const $arenas = document.querySelector('.arenas');
const $randomBtn = document.querySelector('.button');
const $form = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['gun'],
    changeHP,
    renderHP,
    elHP,
};

const player2 = {
    player: 2,
    name: 'KITANA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['sword'],
    changeHP,
    renderHP,
    elHP,
};

/**
 * Создаем HTMLElement
 * 
 * @param {string} tag 
 * @param {string} [className] 
 * @returns {HTMLElement}
 */
function createElement(tag, className){
    const $tag = document.createElement(tag);
    if(className){
        $tag.classList.add(className);
    }

    return $tag;
}

/**
 * Создаем игрока
 * 
 * @param {string} playerObject 
 * @returns {HTMLElement}
 */
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

/**
 * Наносим урон
 * 
 * @param {number} damage 
 */
function changeHP(damage){
    this.hp -= damage;
    
    if(this.hp <= 0){
        this.hp = 0;
    }
}

/**
 * Обновляем отображение жизни на странице
 */
function renderHP(){
    this.elHP().style.width = this.hp + '%';
}

/**
 * Находим HTMLElement, отображающий жизни на странице
 * 
 * @returns {HTMLElement}
 */
function elHP(){
    return document.querySelector('.player' + this.player + ' .life');
}

/**
 * Выводим результат боя (имя победителя при победе, DRAW, если ничья)
 * 
 * @param {string} [name] 
 * @returns {string}
 */
function playerWins(name){
    const $winTitle = createElement('div', 'winTitle');

    if(name){
        $winTitle.innerText = name + ' wins';
    } else {
        $winTitle.innerText = 'draw';
    }
    
    return $winTitle;
}

/**
 * Добавляем кнопку рестарта
 */
function createReloadButton(){
    const $reloadBtnDiv = createElement('div', 'reloadWrap');
    const $reloadBtn = createElement('button', 'button');
    $reloadBtn.innerText = 'Restart';

    $reloadBtnDiv.appendChild($reloadBtn);

    $reloadBtn.addEventListener('click', function(){
        window.location.reload();
    });

    $arenas.appendChild($reloadBtnDiv);
}

/**
 * Рандомное число от 1 до num
 * Если num = 0, вернется 20
 * 
 * @param {number} num 
 * @returns {number}
 */
function getRandom(num){
    return num ? Math.ceil(Math.random() * num) : 20;
}

// $randomBtn.addEventListener('click', function() {
//     player1.changeHP(getRandom(20));
//     player2.changeHP(getRandom(20));
//     player1.renderHP();
//     player2.renderHP();

//     if(player1.hp <= 0 || player2.hp <= 0){
//         $randomBtn.disabled = true;
//         createReloadButton();
//     }
    
//     if(player1.hp <= 0 && player1.hp < player2.hp){
//         $arenas.appendChild(playerWins(player2.name));
//     } else if(player2.hp <= 0 && player2.hp < player1.hp){
//         $arenas.appendChild(playerWins(player1.name));
//     } else if(player1.hp === 0 && player2.hp === 0){
//         $arenas.appendChild(playerWins());
//     }
// });

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

/**
 * Атака игрока
 * 
 * @param {HTMLElement} form 
 * @returns {{hit: string, defence: string, value: number}}}
 */
function playerAttack(form){
    const attack = {};

    for (let item of form){
        if(item.checked && item.name === 'hit'){
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if(item.checked && item.name === 'defence'){
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
}

/**
 * Атака противника
 * 
 * @param {HTMLElement} form 
 * @returns {{value: number, hit: string, defence: string}}}
 */
function enemyAttack(){
    const length = ATTACK.length; 
    const hit = ATTACK[getRandom(length) - 1];
    const defence = ATTACK[getRandom(length) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,    
    };
}

$form.addEventListener('submit', function(e){
    e.preventDefault();
    const player = playerAttack($form); //player1
    const enemy = enemyAttack(); //player2

    if(player.hit !== enemy.defence){
        player2.changeHP(player.value);
        player2.renderHP();
    }

    if(enemy.hit !== player.defence){
        player1.changeHP(enemy.value);
        player1.renderHP();
    }

    if(player1.hp <= 0 || player2.hp <= 0){
        $randomBtn.disabled = true;
        createReloadButton();
    }
    
    if(player1.hp <= 0 && player1.hp < player2.hp){
        $arenas.appendChild(playerWins(player2.name));
    } else if(player2.hp <= 0 && player2.hp < player1.hp){
        $arenas.appendChild(playerWins(player1.name));
    } else if(player1.hp === 0 && player2.hp === 0){
        $arenas.appendChild(playerWins());
    }
});