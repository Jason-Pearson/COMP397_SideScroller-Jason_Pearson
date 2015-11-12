module objects {
    //Game Object Class - extends to createjs.Sprite class properties - to make sprites in the atlas a legit gameobject (object of this class) to use for coding
    export class GameObject extends createjs.Sprite {
        //PROTECTED INSTANCE VARIABLES - can pass them to subclasses
        protected _width: number; // To Hold the pixel by pixel dimensions of a gameobject 
        protected _height: number;

        //CONSTRUCTOR
        constructor(imageString: string) { // argument is a string variable for the name of the sprite object in the atlas
            super(atlas, imageString); // makes a super call to creatjs.Sprite class to the SpriteSheet object Atlus, plus the specific sprite object via imageString, and hold it in a reference variable of type GameObject

            //get the bounds of width and height from gameobject in contruction
            this._width = this.getBounds().width;
            this._height = this.getBounds().height;
            this.regX = this._width * 0.5;
            this.regY = this._height * 0.5;
        }
    }
}