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
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
            //Add Ocean to Game Scene at Start
            this._ocean = new objects.Ocean();
            this.addChild(this._ocean);
            //Add Ship to Game Scene at Start
            this._ship = new objects.Ship();
            this.addChild(this._ship);
            stage.addChild(this);
            createjs.Sound.play("game", { loop: -1 }); // play game music at Start - infinite loop (-1)
        };
        //GAME SCENE UPDATE METHOD
        Game.prototype.update = function () {
            this._ocean.update(); // every frame, call the update method of Ocean class in order to scroll
            this._ship.update(); // every frame, call the update method of Ship class in order to move
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map