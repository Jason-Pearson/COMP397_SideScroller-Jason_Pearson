var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    // OVER CLASS
    var Over = (function (_super) {
        __extends(Over, _super);
        // CONSTRUCTOR
        function Over() {
            _super.call(this);
        }
        // PUBLIC METHODS
        Over.prototype.start = function () {
            //Add Ocean to Menu Scene at Start - for Aesthetics 
            this._ocean = new objects.Ocean();
            this.addChild(this._ocean);
            // level label
            this._gameOverLabel = new objects.Label("Expedition Failed", "150px " + config.FONT_FAMILY_DIANE, config.FONT_COLOR_RED, 305, 180, true);
            this.addChild(this._gameOverLabel); // add label to the stage
            //  plundered
            this._finalPlunderedLabel = new objects.Label("Plundered: " + scoreboard._barrels + "/20", "40px " + config.FONT_FAMILY_DOCK, config.FONT_COLOR_RED, 320, 240, true);
            this.addChild(this._finalPlunderedLabel); // add label to the stage
            // restart button
            this._restartButton = new objects.Button("RestartButton", 320, 400);
            this._restartButton.on("click", this._clickRestartButton, this); // event listener
            this.addChild(this._restartButton);
            stage.addChild(this);
            createjs.Sound.play("over", { loop: -1 }); // play game over music at Start - infinite loop (-1)
        };
        Over.prototype.update = function () {
            this._ocean.update();
            //this._gameOverLabel.rotation += 5;
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Back Button Click
        Over.prototype._clickRestartButton = function (event) {
            createjs.Sound.stop(); // stop game over music upon clicking the Restart Button
            changeState(config.MENU_STATE);
        };
        return Over;
    })(objects.Scene);
    states.Over = Over;
})(states || (states = {}));
//# sourceMappingURL=over.js.map