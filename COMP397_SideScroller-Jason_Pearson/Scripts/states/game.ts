module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _ship: objects.Ship; // reference of type Ship class - holds Ship gameobject, along with class properties to control behaviour
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

            //Add Ship to Game Scene at Start
            this._ship = new objects.Ship();
            this.addChild(this._ship);

            stage.addChild(this);

            createjs.Sound.play("game", {loop:-1}); // play game music at Start - infinite loop (-1)
        }

        //GAME SCENE UPDATE METHOD
        public update(): void {
            this._ocean.update(); // every frame, call the update method of Ocean class in order to scroll
            this._ship.update(); // every frame, call the update method of Ship class in order to move
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        
        //GAME OVER METHOD - Lives reach 0 - stop music, save score, change state

    }


} 