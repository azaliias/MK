const $arenas = document.querySelector('.arenas');
const $randomBtn = document.querySelector('.button');
const $form = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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

/**
 * Результат боя
 */
function showResult(){
    if(player1.hp <= 0 || player2.hp <= 0){
        $randomBtn.disabled = true;
        createReloadButton();
    }
    
    if(player1.hp <= 0 && player1.hp < player2.hp){
        $arenas.appendChild(playerWins(player2.name));
        getLogs('end', player2, player1);
    } else if(player2.hp <= 0 && player2.hp < player1.hp){
        $arenas.appendChild(playerWins(player1.name));
        getLogs('end', player1, player2);
    } else if(player1.hp === 0 && player2.hp === 0){
        $arenas.appendChild(playerWins());
        getLogs('draw');
    }
}

$form.addEventListener('submit', function(e){
    e.preventDefault();
    const player = playerAttack($form); //player1
    const enemy = enemyAttack(); //player2

    if(player.hit !== enemy.defence){
        player2.changeHP(player.value);
        player2.renderHP();
        getLogs('hit', player1, player2, player.value);
    }

    if(enemy.hit !== player.defence){
        player1.changeHP(enemy.value);
        player1.renderHP();
        getLogs('hit', player2, player1, enemy.value);
    }

    if(enemy.hit === player.defence){
        getLogs('defence', player2, player1);
    }

    if(player.hit === enemy.defence){
        getLogs('defence', player1, player2);
    }

    showResult();
});

/**
 * Возвращает текущее время в формате HH:MM
 * 
 * @returns {string}
 */
function getTime(){
    const hours = new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours();
    const minutes = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes();
    const seconds = new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : new Date().getSeconds();

    return `${hours}:${minutes}:${seconds}`;
}

/**
 * Вывод лога боя
 * 
 * @param {string} type Тип лога
 * @param {string} [player_1] Игрок или нападающего игрок или победитель
 * @param {string} [player_2] Противник или защищающийся или проигравший
 * @param {string} [damage] Наносимый урон
 */
function getLogs(type, player_1, player_2, damage){
    const formattedTime = getTime();
    switch(type) {
        case 'start':
            const startText = logs['start']
                .replace('[time]', formattedTime)
                .replace('[player1]', player_1.name)
                .replace('[player2]', player_2.name);
            $chat.insertAdjacentHTML('afterbegin', `<p>${startText}</p>`);
            break;
        case 'end':
            const endText = logs['end'][getRandom(logs['end'].length) - 1]
                .replace('[playerWins]', player_1.name)
                .replace('[playerLose]', player_2.name);
            $chat.insertAdjacentHTML('afterbegin', `<p>${endText}</p>`);
            break;
        case 'hit':
            const length = logs[type].length;
            const hitText = logs[type][getRandom(length) - 1]
                .replace('[playerKick]', player_1.name)
                .replace('[playerDefence]', player_2.name);
            const el = `<p>${formattedTime} - ${hitText} -${damage} [${player_2.hp}/100]</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            break;
        case 'defence':
            const defenceText = logs['defence'][getRandom(logs['defence'].length) - 1]
                .replace('[playerKick]', player_1.name)
                .replace('[playerDefence]', player_2.name);
            $chat.insertAdjacentHTML('afterbegin', `<p>${defenceText} [${player_1.hp}/100]</p>`);
            break;    
        case 'draw':
            $chat.insertAdjacentHTML('afterbegin', `<p>${logs['draw']}</p>`);
            break;
        default:
            break;
      }
}

getLogs('start', player1, player2);