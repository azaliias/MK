import { HIT, ATTACK, player1, player2, changeHP, renderHP, playerWins, playerAttack, enemyAttack } from './player.js';
import { createElement, showResult, getLogs } from './utils.js';

const $arenas = document.querySelector('.arenas');
const $form = document.querySelector('.control');

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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

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

getLogs('start', player1, player2);