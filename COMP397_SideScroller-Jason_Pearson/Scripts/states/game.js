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
            for (var enemy = 0; enemy < 5; enemy++) {
                this._enemies[enemy] = new objects.Enemy();
                //this._enemies[enemy]._tagName = "Enemy#" + enemy;
                //this._enemies[enemy].setName(this._enemies[enemy]._tagName);
                this.addChild(this._enemies[enemy]);
            }
            //Instantiating Collision Managers
            this._collision = new managers.Collision;
            stage.addChild(this);
            createjs.Sound.play("game", { loop: -1, volume: 0.5, delay: 100 }); // play game music at Start - infinite loop (-1)
        };
        //GAME OVER METHOD - Lives reach 0 - stop music, save score, change state
        //GAME SCENE UPDATE METHOD
        Game.prototype.update = function () {
            this._ocean.update(); // every frame, call the update method of Ocean class in order to scroll
            for (var barrel = 0; barrel < 3; barrel++) {
                this._barrels[barrel].update();
                this._collision.update(this._ship, this._barrels[barrel]); // every frame, check collision between Ship and each Barrel
            }
            this._ship.update(); // every frame, call the update method of Ship class in order to move
            for (var enemy = 0; enemy < 5; enemy++) {
                this._enemies[enemy].update();
                this._collision.update(this._ship, this._enemies[enemy]); // every frame, check collision between Ship and each Enemy
            }
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map