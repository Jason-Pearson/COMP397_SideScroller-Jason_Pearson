var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    // GAME CLASS
    var Game = (function (_super) {
        __extends(Game, _super);
        // CONSTRUCTOR
        function Game() {
            _super.call(this);
            this._barrels = []; // referene of type Barrel class - holds Barrel gameobject, along with class properties to control spawning and scoring
            this._enemies = []; // referene of type Enemy class - holds Enemy gameobject, along with class properties to control spawning, AI movement, player interaction
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
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
            for (var enemy = 0; enemy < 1; enemy++) {
                this._enemies[enemy] = new objects.Enemy();
                //this._enemies[enemy]._tagName = "Enemy#" + enemy;
                //this._enemies[enemy].setName(this._enemies[enemy]._tagName);
                this.addChild(this._enemies[enemy]);
            }
            stage.addChild(this);
            createjs.Sound.play("game", { loop: -1, volume: 0.5, delay: 100 }); // play game music at Start - infinite loop (-1)
        };
        //GAME SCENE UPDATE METHOD
        Game.prototype.update = function () {
            this._ocean.update(); // every frame, call the update method of Ocean class in order to scroll
            for (var barrel = 0; barrel < 1; barrel++) {
                this._barrels[barrel].update();
                this._checkCollision(this._barrels[barrel]); // every frame, check collision between Ship and each barrel
            }
            this._ship.update(); // every frame, call the update method of Ship class in order to move
            for (var enemy = 0; enemy < 1; enemy++) {
                this._enemies[enemy].update();
                this._checkCollision(this._enemies[enemy]); // every frame, check collision between Ship and each barrel
            }
        };
        // PRIVATE UTILITY METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Private Utility Method - Check Collision - checks the collision between Ship and any other gameobjects
         */
        Game.prototype._checkCollision = function (object) {
            // if the (distance between ship and other gameobject) is less than (half the height of the Ship + half the height of the other game object) = Collision
            if (this._distance(this._ship.getPosition(), object.getPosition()) <
                (this._ship.getHalfHeight() + object.getHalfHeight())) {
                //Check if Ship is not ALREADY colliding - when it first enters collision (registers a hit), it is set to true only ONCE - the distance will be rechecked every frame, but not this collision when it is already true 
                if (!object.getIsColliding()) {
                    switch (object.getName()) {
                        case "Barrel":
                            console.log("Hit Barrel");
                            break;
                        case "Leviathan":
                            console.log("Hit Leviathan");
                            break;
                    }
                    object.setIsColliding(true); // if it is currently colliding, then IsColliding is set and remains True
                }
                else {
                    object.setIsColliding(false); // if it is not currently colliding, then IsColliding is set and remains False
                }
            }
        };
        /**
         * Private Utility Method - Distance - returns distance between two points in pixels in an integer - FOR COLLISION DETECTION
         * √((x2 - x1)^2) + ((y2 - y1)^2) = Distance (integer via Math.floor)
         */
        Game.prototype._distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map