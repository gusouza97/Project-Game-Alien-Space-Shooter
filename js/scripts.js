(function readyJS(win, doc) {
    "use strict";

    // VARIABLES
    let timer;
    let player;
    let shoot;
    let enemy;
    let timerDisparo;
    let disparo = false;

    // SELECTORS
    let btnStart = document.querySelector(".btnStart")
    let panelStartGame = document.querySelector(".start-game")
    let mainGame = document.querySelector(".mainGame")

    // LISTENERS
    btnStart.addEventListener("click", () => {
        Start();
    }, false)

    window.addEventListener("keypress", (e) => {
        MovePlayer(e);
        Disparar(e);
    }, false)


    // FUNCTIONS
    // Function -> Inicia Game
    function Start() {
        panelStartGame.style.display = 'none'
        mainGame.classList.remove("flex-menu")
        LoopGame();
    }

    // Function -> Game Over
    function GameOver() {
        alert("Fim de Jogo");

        clearInterval(timerDisparo)
        clearInterval(timer)

        player.remove();

        enemy.remove();

        if (shoot) {
            shoot.remove();
        }

        location.reload();
    }

    // Function -> LoopGame
    function LoopGame() {

        // SETTIMER
        timer = setInterval(() => {

            // Movendo Background
            MoveBackground();

            // Verifica se o Player foi criado
            if (!player) {
                CreatePlayer();
            }

            // Verifica se ha inimigo na tela
            if (!enemy) {
                CreateEnemy();
            }

            // Checa Colisao
            CheckColision();

            // Checa Game Over
        }, 10)


        // FIMTIMER -> GameOver == true
    }

    // Function -> Gerar Player
    function CreatePlayer() {
        // Criando Player
        player = document.createElement("img")
        player.src = "img/hero.png"
        player.classList.add("player")

        // Inserindo no Mapa
        mainGame.appendChild(player);

        // Listerner
        player = document.querySelector(".player")
    }

    // Function -> Move Background
    function MoveBackground() {
        let posicaoBackground = parseInt(getComputedStyle(mainGame).backgroundPosition)
        mainGame.style.backgroundPosition = posicaoBackground - 1 + "px";
    }

    // Function -> Move jogador
    function MovePlayer(e) {
        // Condicional qual botao foi apertado
        if (e.key == "8" || e.key == "w") {
            MoveUp(player);
        }

        if (e.key == "2" || e.key == "s") {
            MoveDown(player);
        }
    }

    // Function -> Move Jogador Cima
    function MoveUp(player) {
        let posicaoY = parseInt(getComputedStyle(player).top)
        player.style.top = posicaoY - 10 + "px"
    }

    // Function -> Move jogador Baixo
    function MoveDown(player) {
        let posicaoY = parseInt(getComputedStyle(player).top)
        player.style.top = posicaoY + 10 + "px"
    }

    // Function -> Disparar
    function Disparar(e) {
        if (e.key == " ") {
            if (disparo == false) {
                CreateElementDisparo();
                disparo = true;
            }
        }
    }

    // Function -> Criar Elemento de Disparo
    function CreateElementDisparo() {
        // Pegando informacoes do Player
        let posicaoY = parseInt(getComputedStyle(player).top)

        // Criando Elemento
        shoot = document.createElement("img")
        shoot.classList.add("shoot")
        shoot.style.top = posicaoY + 13 + "px";
        shoot.src = "img/shoot.png"
        mainGame.appendChild(shoot);

        // Listener
        shoot = document.querySelector(".shoot")

        // Chamando Movimento do Disparo
        MoveElementDisparo();
    }

    // Function -> Move Elemento de Disparo
    function MoveElementDisparo() {
        timerDisparo = setInterval(() => {
            let posicaoX = parseInt(getComputedStyle(shoot).left)
            shoot.style.left = posicaoX + 5 + "px";
        }, 30)
    }

    // Function -> Criando inimigo
    function CreateEnemy() {

        const arrayEnemy = ['monster-1.png', 'monster-2.png', 'monster-3.png']
        const enemyNumber = GenerateRandomEnemy();

        const posicaoTop = Math.floor(Math.random() * 550);

        enemy = document.createElement("img");
        enemy.classList.add("enemy");
        enemy.style.top = posicaoTop + "px"
        enemy.src = "img/" + arrayEnemy[enemyNumber];

        mainGame.appendChild(enemy)

        // Listener
        enemy = document.querySelector(".enemy")

        // Movendo inimigo
        //MoveEnemy();
    }

    // Function -> Gerando inimigo randomizado no mapa
    function GenerateRandomEnemy() {

        const value = Math.floor(Math.random() * 3);
        return value;

    }

    // Function -> Move inimigo
    function MoveEnemy() {
        setInterval(() => {
            let posicaoX = parseInt(getComputedStyle(enemy).left)
            enemy.style.left = posicaoX - 2 + "px";
        }, 30)
    }

    // Function -> Checando Colisao
    function CheckColision() {
        // Colisao inimigo com Player
        ColisionEnemyPlayer();

        // Colisao Disparo com o Inimigo
        ColisionDisparoEnemy();

        // Colisao Disparo com o Fundo Mapa
        ColisionDisparoFinalMap();
    }

    // Function -> Colisao: Inimigo com Player
    function ColisionEnemyPlayer() {

        let posicaoX = parseInt(getComputedStyle(enemy).left)

        if (posicaoX <= 18) {
            GameOver();
        }
    }

    // Function -> Colisao: Elemento Disparo com Inimigo
    function ColisionDisparoEnemy() {

        if (shoot) {
            let enemyPositionY = parseInt(getComputedStyle(enemy).top)
            let enemyPositionX = parseInt(getComputedStyle(enemy).left)
            let shootPositionY = parseInt(getComputedStyle(shoot).top)
            let shootPositionX = parseInt(getComputedStyle(shoot).left)

            if (enemyPositionY <= shootPositionY && enemyPositionY - 75 >= shootPositionY) {
                console.log("bang")
            }
        }
    }

    // Function -> Colisao: Elemento Disparo com Fundo Mapa
    function ColisionDisparoFinalMap() {
        if (shoot) {
            let shootPositionX = parseInt(getComputedStyle(shoot).left)

            if (shootPositionX > 310) {
                shoot.remove();
                clearInterval(timerDisparo)
                disparo = false;
            }
        }
    }

})(window, document);