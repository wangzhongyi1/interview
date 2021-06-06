var VerifyCode = /** @class */ (function () {
    function VerifyCode(config) {
        this.ele = document.querySelector(config.ele);
        this.W = config.W;
        this.H = config.H;
        this.selectW = this.W / 4; // 每个字所占的宽度
    }
    /**
     * 1. 随机生成4位数字加字母
     * 2. 随机生成背景颜色
     * 3. 随机生成4条干扰线
     * 4. 随机生成50个干扰小球
     */
    VerifyCode.prototype.run = function () {
        this.draw();
    };
    VerifyCode.prototype.draw = function () {
        var ctx = this.ele.getContext('2d');
        ctx.save();
        ctx.fillStyle = this.rc();
        ctx.fillRect(0, 0, this.W, this.H);
        ctx.restore();
        for (var i = 0; i < 4; i++) {
            ctx.save();
            ctx.translate(i * this.selectW + this.selectW / 2, this.H / 2);
            ctx.font = this.r(30, 50) + "px arial";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.rNumberAndLetter(), 0, 0);
            ctx.stroke();
            ctx.restore();
        }
        this.interfereLine(ctx);
        this.interfereBall(ctx);
    };
    // 随机生成 [min,max] 的整数
    VerifyCode.prototype.r = function (min, max) {
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        return random;
    };
    // 随机生成颜色
    VerifyCode.prototype.rc = function () {
        var str = 'rgb(';
        for (var i = 0; i < 3; i++) {
            str = str + this.r(0, 255) + ',';
        }
        str = str.slice(0, -1);
        str += ')';
        return str;
    };
    // 随机生成 1 位数字或者字母
    VerifyCode.prototype.rNumberAndLetter = function () {
        var str = '0123456789';
        for (var i = 65; i < 122; i++) {
            if (i > 90 && i < 97)
                continue;
            str += String.fromCharCode(i);
        }
        var result = str[this.r(0, str.length - 1)];
        return result;
    };
    // 随机生成 干扰线
    VerifyCode.prototype.interfereLine = function (ctx) {
        for (var i = 0; i < 8; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.r(0, this.W), this.r(0, this.H));
            ctx.lineTo(this.r(0, this.W), this.r(0, this.H));
            ctx.strokeStyle = this.rc();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    };
    // 随机生成 干扰球
    VerifyCode.prototype.interfereBall = function (ctx) {
        for (var i = 0; i < 50; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.r(0, this.W), this.r(0, this.H), this.r(1, 20), 0, 2 * Math.PI);
            ctx.strokeStyle = this.rc();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    };
    return VerifyCode;
}());
new VerifyCode({ ele: '#canvas', W: 400, H: 100 }).run();
