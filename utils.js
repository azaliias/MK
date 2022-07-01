import { player1, player2, playerWins } from './player.js';

const $arenas = document.querySelector('.arenas');
const $randomBtn = document.querySelector('.button');
const $chat = document.querySelector('.chat');

export const logs = {
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

/**
* Создаем HTMLElement
* 
* @param {string} tag 
* @param {string} [className] 
* @returns {HTMLElement}
*/
export function createElement(tag, className){
   const $tag = document.createElement(tag);
   if(className){
       $tag.classList.add(className);
   }

   return $tag;
}

/**
 * Добавляем кнопку рестарта
 */
export function createReloadButton(){
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
export function getRandom(num){
    return num ? Math.ceil(Math.random() * num) : 20;
}

/**
 * Результат боя
 */
export function showResult(){
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

/**
 * Возвращает текущее время в формате HH:MM
 * 
 * @returns {string}
 */
export function getTime(){
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
export function getLogs(type, player_1, player_2, damage){
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