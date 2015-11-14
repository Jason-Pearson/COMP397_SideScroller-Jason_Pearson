module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _ship: objects.Ship; // reference of type Ship class - holds Ship gameobject, along with class properties to control behaviour/user input
        private _barrel: objects.Barrel; // referene of type Barrel class - holds Barrel gameobject, along with class properties to control spawning and scoring
        private _barrel2: objects.Barrel; // referene of type Barrel class - holds Barrel gameobject, along with class properties to control spawning and scoring
        private _barrel3: objects.Barrel; // referene of type Barrel class - holds Barrel gameobject, along with class properties to control spawning and scoring
        private _clouds: objects.Enemy;
        private _enemies: objects.Enemy[] = []; // referene of type Enemy class - holds Enemy gameobject, along with class properties to control spawning, AI movement, player interaction
        private _ocean: objects.Ocean; // reference of type Ocean class - holds Ocean bitmap, along with class properties to control constant scrolling

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {

            //Add Ocean to Game Scene at Start
            this._ocean = new objects.Ocean();
            this.addChild(this._ocean);

            //Add Barrel to Game Scene at Start
            this._barrel = new objects.Barrel();
            this.addChild(this._barrel);

            //Add Second Barrel to Game Scene at Start
            this._barrel2 = new objects.Barrel();
            this.addChild(this._barrel2);

            //Add Third Barrel to Game Scene at Start
            this._barrel3 = new objects.Barrel();
            this.addChild(this._barrel3);

            //Add Ship to Game Scene at Start
            this._ship = new objects.Ship();
            this.addChild(this._ship);

            //Add Enemies to Game Scene at Start
            for (var enemy = 0; enemy < 4; enemy++)
            {
                this._enemies[enemy] = new objects.Enemy();
                this.addChild(this._enemies[enemy]);
            }

            stage.addChild(this);

            createjs.Sound.play("game", { loop: -1, volume: 0.5, delay: 100 }); // play game music at Start - infinite loop (-1)
        }

        //GAME SCENE UPDATE METHOD
        public update(): void {
            this._ocean.update(); // every frame, call the update method of Ocean class in order to scroll
            this._barrel.update(); // every frame, call the update method of Barrel class in order to spawn and scroll
            this._barrel2.update(); // every frame, call the update method of Barrel class in order to spawn and scroll
            this._barrel3.update(); // every frame, call the update method of Barrel class in order to spawn and scroll
            this._ship.update(); // every frame, call the update method of Ship class in order to move
            for (var enemy = 0; enemy < 4; enemy++) {// every frame, call the update method of Enemy class of All Enemies in order to spawn and drift
                this._enemies[enemy].update(); 
            }
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        
        //GAME OVER METHOD - Lives reach 0 - stop music, save score, change state

    }


} 