class Body {
    constructor(x, y, width, dir) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._dir = dir;
        this._offset = 1;
        this._bodyimg = new Image();
    }

    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get bodyimg() {
        return this._bodyimg;
    }
    get dir() {
        return this._dir;
    }

    set x(updated_x) {
        this._x = updated_x;
    }
    set y(updated_y) {
        this._y = updated_y;
    }
    set dir(updated_dir){
        this._dir = updated_dir;
    }

    draw(color='rgb(170, 40, 0)', newimg=true) {
        const canvas = document.querySelector('.background');
        const ctx = canvas.getContext('2d');
        let awidth = this._width;
        this._bodyimg = new Image();
        this._bodyimg.src = 'http://localhost:8000/snake/body.png';
        let ax = this._x;
        let ay = this._y;
        if (newimg) {
            this._bodyimg.onload = function() {
                ctx.drawImage(this, ax, ay-9/10, awidth+2, awidth+2);
            };
        }
        //ctx.fillStyle = color;
        //ctx.fillRect(this._coords[0]+this._offset, this._coords[1]+this._offset, this._width, this._width);
    }
    
    hide() {
        const canvas = document.querySelector('.background');
        const ctx = canvas.getContext('2d');

        let awidth = this._width;
        let bgimage = new Image();
        bgimage.src = 'http://localhost:8000/snake/bg.png';
        let ax = this._x;
        let ay = this._y;
        bgimage.onload = function() {
                ctx.drawImage(this, ax+1, ay+1, awidth, awidth);
        };
    }

    move() {
        let newimg;
        this.draw(newimg=false);
    }
}

class Apple extends Body {
    constructor(x, y, width) {
        super(x, y, width);
    }

    drawApple() {
        const canvas = document.querySelector('.background');
        const ctx = canvas.getContext('2d');
        let appleimage = new Image();
        appleimage.src = 'http://localhost:8000/snake/apple.png';
        var ax = this._x;
        var ay = this._y;
        var aoffset = this._offset;
        var awidth = this._width;
        appleimage.onload = function() {
            ctx.drawImage(this, ax+aoffset, ay+aoffset, awidth, awidth);
        };
        return appleimage;
    }
}

export { Body, Apple };