module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _ship: objects.Ship; // reference of type Ship class - holds Ship gameobject, along with class properties to control behaviour/user input
        private _barrels: objects.Barrel[] =[]; // referene of type Barrel class - holds Barrel gameobject, along with class properties to control spawning and scoring
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

            //Add Barrels to Game Scene at Start
            for (var barrel = 0; barrel < 1; barrel++) {
                this._barrels[barrel] = new objects.Barrel();
                //this._barrels[barrel]._tagName = "Barrel#" + barrel;
                //this._barrels[barrel].setName(this._barrels[barrel]._tagName);
                this.addChild(this._barrels[barrel]);
            }

            //Add Ship to Game Scene at Start
            this._ship = new objects.Ship();
            this.addChild(this._ship);

            //Add Enemies to Game Scene at Start
            for (var enemy = 0; enemy < 1; enemy++)
            {
                this._enemies[enemy] = new objects.Enemy();
                //this._enemies[enemy]._tagName = "Enemy#" + enemy;
                //this._enemies[enemy].setName(this._enemies[enemy]._tagName);
                this.addChild(this._enemies[enemy]);
            }

            stage.addChild(this);

            createjs.Sound.play("game", { loop: -1, volume: 0.5, delay: 100 }); // play game music at Start - infinite loop (-1)
        }
        // PRIVATE UTILITY METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        

        /**
         * Private Utility Method - Distance - returns distance between two points in pixels in an integer - FOR COLLISION DETECTION
         * √((x2 - x1)^2) + ((y2 - y1)^2) = Distance (integer via Math.floor)
         */
        private _distance(p1:createjs.Point, p2:createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }
        //GAME OVER METHOD - Lives reach 0 - stop music, save score, change state

        /**
         * Private Utility Method - Check Collision - checks the collision between Ship and any other gameobjects   
         */
        private _checkCollision(object: objects.GameObject): void {
            // if the (distance between ship and other gameobject) is less than (half the height of the Ship + half the height of the other game object) = Collision
            if (this._distance(this._ship.getPosition(), object.getPosition()) <
                (this._ship.getHalfHeight() + object.getHalfHeight())) {
                    
                    
                //Check if Ship is not ALREADY colliding - when it first enters collision (registers a hit), it is set to true only ONCE - the distance will be rechecked every frame, but not this collision when it is already true 
                if (!object.getIsColliding()) {
                    switch (object.getName()) {
                        case "Barrel":
                            console.log("Hit Barrel");
                            createjs.Sound.play("pickup1"); // play game music at Start - infinite loop (-1)
                            break;
                        case "Leviathan":
                            console.log("Hit Leviathan");
                            createjs.Sound.play("damage"); // play game music at Start - infinite loop (-1)
                            break;
                    }
                    object.setIsColliding(true); // if it is currently colliding, then IsColliding is set and remains True
                }
            }//THIS EXTRA BRACKET IS MAKES THE IF STATEMENT FOR !OBJECT.GETISCOLLIDING NOT ACTIVATED WHILE DISTANCT CHECK = TRUE --> SINCE SETISCOLLIDING(TRUE) AFTER THE VERY FIRST CHECK!!!
                else { //otherwise, until the distance check is not true...
                    object.setIsColliding(false);// if it is not currently colliding, then IsColliding is set and remains False
                }


            }

        //GAME SCENE UPDATE METHOD
        public update(): void {
            this._ocean.update(); // every frame, call the update method of Ocean class in order to scroll
            for (var barrel = 0; barrel < 1; barrel++) {// every frame, call the update method of Enemy class of All Enemies in order to spawn and drift
                this._barrels[barrel].update();
                this._checkCollision(this._barrels[barrel]); // every frame, check collision between Ship and each barrel
            }
            this._ship.update(); // every frame, call the update method of Ship class in order to move
            for (var enemy = 0; enemy < 1; enemy++) {// every frame, call the update method of Enemy class of All Enemies in order to spawn and drift
                this._enemies[enemy].update();
                this._checkCollision(this._enemies[enemy]); // every frame, check collision between Ship and each barrel
            }



        }
    }


} 