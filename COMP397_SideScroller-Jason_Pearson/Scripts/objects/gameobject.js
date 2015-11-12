var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    //Game Object Class - extends to createjs.Sprite class properties - to make sprites in the atlas a legit gameobject (object of this class) to use for coding
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        //CONSTRUCTOR
        function GameObject(imageString) {
            _super.call(this, atlas, imageString); // makes a super call to creatjs.Sprite class to the SpriteSheet object Atlus, plus the specific sprite object via imageString, and hold it in a reference variable of type GameObject
            //get the bounds of width and height from gameobject in contruction
            this._width = this.getBounds().width;
            this._height = this.getBounds().height;
            this.regX = this._width * 0.5;
            this.regY = this._height * 0.5;
        }
        return GameObject;
    })(createjs.Sprite);
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map