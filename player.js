import { createElement, getRandom } from './utils.js';

export const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

export const ATTACK = ['head', 'body', 'foot'];

export const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['gun'],
    changeHP,
    renderHP,
    elHP,
};

export const player2 = {
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
 * Наносим урон
 * 
 * @param {number} damage 
 */
export function changeHP(damage){
    this.hp -= damage;
    
    if(this.hp <= 0){
        this.hp = 0;
    }
};

/**
 * Обновляем отображение жизни на странице
 */
export function renderHP(){
    this.elHP().style.width = this.hp + '%';
};

/**
 * Находим HTMLElement, отображающий жизни на странице
 * 
 * @returns {HTMLElement}
 */
function elHP(){
    return document.querySelector('.player' + this.player + ' .life');
};

/**
 * Выводим результат боя (имя победителя при победе, DRAW, если ничья)
 * 
 * @param {string} [name] 
 * @returns {string}
 */
export function playerWins(name){
    const $winTitle = createElement('div', 'winTitle');

    if(name){
        $winTitle.innerText = name + ' wins';
    } else {
        $winTitle.innerText = 'draw';
    }
    
    return $winTitle;
};

/**
 * Атака игрока
 * 
 * @param {HTMLElement} form 
 * @returns {{hit: string, defence: string, value: number}}}
 */
export function playerAttack(form){
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
};

/**
 * Атака противника
 * 
 * @param {HTMLElement} form 
 * @returns {{value: number, hit: string, defence: string}}}
 */
export function enemyAttack(){
    const length = ATTACK.length; 
    const hit = ATTACK[getRandom(length) - 1];
    const defence = ATTACK[getRandom(length) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,    
    };
};