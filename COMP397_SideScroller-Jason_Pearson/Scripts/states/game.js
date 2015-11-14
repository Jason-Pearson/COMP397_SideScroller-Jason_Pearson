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
            this._enemies = []; // referene of type Enemy class - holds Enemy gameobject, along with class properties to control spawning, AI movement, player interaction
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
            //Cursor for Game Scene
            stage.cursor = "crosshair";
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
            for (var enemy = 0; enemy < 1; enemy++) {
                this._enemies[enemy] = new objects.Enemy();
                this.addChild(this._enemies[enemy]);
            }
            stage.addChild(this);
            createjs.Sound.play("game", { loop: -1, volume: 0.5, delay: 100 }); // play game music at Start - infinite loop (-1)
        };
        //GAME SCENE UPDATE METHOD
        Game.prototype.update = function () {
            this._ocean.update(); // every frame, call the update method of Ocean class in order to scroll
            this._barrel.update(); // every frame, call the update method of Barrel class in order to spawn and scroll
            this._barrel2.update(); // every frame, call the update method of Barrel class in order to spawn and scroll
            this._barrel3.update(); // every frame, call the update method of Barrel class in order to spawn and scroll
            this._ship.update(); // every frame, call the update method of Ship class in order to move
            for (var enemy = 0; enemy < 1; enemy++) {
                this._enemies[enemy].update();
            }
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map