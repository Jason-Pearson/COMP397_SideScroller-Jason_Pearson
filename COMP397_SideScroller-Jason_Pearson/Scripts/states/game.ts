﻿module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _ship: objects.Ship; // reference of type Ship class - holds Ship gameobject, along with class properties to control behaviour/user input
        private _barrels: objects.Barrel[] =[]; // referene of type Barrel class - holds Barrel gameobject, along with class properties to control spawning and scoring
        private _enemies: objects.Enemy[] = []; // referene of type Enemy class - holds Enemy gameobject, along with class properties to control spawning, AI movement, player interaction
        private _ocean: objects.Ocean; // reference of type Ocean class - holds Ocean bitmap, along with class properties to control constant scrolling
        private _collision: managers.Collision;
        private _plunderedLabel: objects.Label;
        private _livesLabel: objects.Label;

        public finalBarrels: number;
        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {

            scoreboard.setLives(5);
            scoreboard.setBarrels(0);
            console.log(scoreboard.getLives());
            console.log(scoreboard.getBarrels());

            //Add Ocean to Game Scene at Start
            this._ocean = new objects.Ocean();
            this.addChild(this._ocean);

            //Add Barrels to Game Scene at Start
            for (var barrel = 0; barrel < 3; barrel++) {
                this._barrels[barrel] = new objects.Barrel();
                //this._barrels[barrel]._tagName = "Barrel#" + barrel;
                //this._barrels[barrel].setName(this._barrels[barrel]._tagName);
                this.addChild(this._barrels[barrel]);
            }

            //Add Ship to Game Scene at Start
            this._ship = new objects.Ship();
            this.addChild(this._ship);

            //Add Enemies to Game Scene at Start
            for (var enemy = 0; enemy < 5; enemy++)
            {
                this._enemies[enemy] = new objects.Enemy();
                //this._enemies[enemy]._tagName = "Enemy#" + enemy;
                //this._enemies[enemy].setName(this._enemies[enemy]._tagName);
                this.addChild(this._enemies[enemy]);
            }
            
            //Instantiating Collision Managers
            this._collision = new managers.Collision;

            // Plundered Label
            this._plunderedLabel = new objects.Label("Plundered: ", "40px " + config.FONT_FAMILY_DOCK, config.FONT_COLOR_YELLOW2, 5, 5, false);
            this.addChild(this._plunderedLabel);
            
            // Lives Label
            this._livesLabel = new objects.Label("Lives: ", "40px " + config.FONT_FAMILY_DOCK, config.FONT_COLOR_YELLOW2, 450, 5, false);
            this.addChild(this._livesLabel);


            stage.addChild(this);

            createjs.Sound.play("game", { loop: -1, volume: 0.5, delay: 100 }); // play game music at Start - infinite loop (-1)
        }        
        //GAME OVER METHOD - Lives reach 0 - stop music, save score, change state

        //GAME SCENE UPDATE METHOD
        public update(): void {
            this._ocean.update(); // every frame, call the update method of Ocean class in order to scroll
            for (var barrel = 0; barrel < 3; barrel++) {// every frame, call the update method of Enemy class of All Enemies in order to spawn and drift
                this._barrels[barrel].update();
                this._collision.update(this._ship, this._barrels[barrel], barrel)// every frame, check collision between Ship and each Barrel
            }
            this._ship.update(); // every frame, call the update method of Ship class in order to move
            for (var enemy = 0; enemy < 5; enemy++) {// every frame, call the update method of Enemy class of All Enemies in order to spawn and drift
                this._enemies[enemy].update();
                this._collision.update(this._ship, this._enemies[enemy], enemy)// every frame, check collision between Ship and each Enemy
            }

            this._updateLabels();
            this._win();
            this._gameOver();

        }

        private _updateLabels(): void {
            this._plunderedLabel.text = "Plundered: " + scoreboard.getBarrels();
            this._livesLabel.text = "Lives: " + scoreboard.getLives();
        }

        private _gameOver(): void {
            if (scoreboard.getLives() == 0) {
                createjs.Sound.stop(); // stop game music upon losing all lives
                changeState(config.OVER_STATE);
            }
        }

        private _win(): void {
            if (scoreboard.getBarrels() >= 20) {
                createjs.Sound.stop(); // stop game music upon getting 20 barrels
                changeState(config.WIN_STATE);
            }
            /*if (scoreboard._barrels / 5 == 1) {
                scoreboard.addLives(1);
            }*/
        }

        public _barrelReset(barrel:number): void{
            this._barrels[barrel]._reset();
        }
        public _enemyReset(enemy: number): void {
            this._enemies[enemy]._reset();
        }
    }


} 