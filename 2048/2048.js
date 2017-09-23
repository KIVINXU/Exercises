/**
 * Created by KIVIN on 2017/5/27.
 */
"use strict";
let button = document.getElementById('restart')
button.onclick = function () {
  game.start();
}

let game = {//保存游戏二维数组，总行数，总列数
  data: null,
  RN: 4,
  CN: 4,
  score: 0,
  state: 1,//保存游戏状态
  running: 1,//游戏运行中
  gameover: 0,//游戏结束
  start(){//游戏启动
    this.state = this.running;//重置游戏状态
    this.score = 0;
    this.data = [];
    for(let r=0; r<this.RN; r++) {
      this.data[r] = [];
      for(let c=0; c<this.CN; c++) {
        this.data[r][c]=0;
      }
    }
    this.randomNum();//随机生成一个新数
    this.randomNum();//随机生成一个新数
    this.updateView();//更新页面
    //键盘按下事件处理函数
    document.onkeydown = function (e) {
      let before = String(this.data);
      switch (e.keyCode) {
        case 37: //左移
          for(let r=0; r<this.RN; r++){//遍历所有行，移动第r行
            this.moveLeftInRow(r);//左移第r行
          }
          break;
        case 38: //上移
          for(let c=0; c<this.CN; c++){//遍历所有列，移动第c列
            this.moveUpInCol(c);//上移第c列
          }
          break;
        case 39: //右移
          for(let r=0; r<this.RN; r++){//遍历所有行，移动第r行
            this.moveRightInRow(r);//右移第r行
          }
          break;
        case 40: //下移
          for(let c=0; c<this.CN; c++){//遍历所有列，移动第c列
            this.moveDownInCol(c);//下移第c列
          }
          break;
      }
      let after = String(this.data);
      if(before !== after) {//如果前后不一致，即发生了移动
        this.randomNum();
        this.updateView();
      }
      if(this.isGameOver()){
        alert('游戏结束！分数为：'+this.score);
      }
    }.bind(this);
  },
  
  isGameOver(){
    //遍历data
    for(let r=0; r<this.RN; r++){
      for(let c=0; c<this.CN; c++){
        if(this.data[r][c] === 0){//如果当前元素是0，就返回false
          return false;
        }
        //如果c<CN-1且当前元素等于右侧元素时，就返回false
        if(c<this.CN-1 && this.data[r][c] === this.data[r][c+1]){
          return false;
        }
        //如果r<RN-1且当前元素等于下方元素时，就返回false
        if(r<this.RN-1 && this.data[r][c] === this.data[r+1][c]){
          return false;
        }
      }
    }
    return true;
  },
  
  moveLeftInRow(r){
    //c0开始到CN-1结束，遍历r行每一格
    for(let c=0;c<this.CN-1;c++) {
      //找出下一个不为0的数nextc
      let nextc = this.getNextInRow(r,c);
      //如果没找到 则退出循环
      if (nextc === -1) {
        break;
      } else if (this.data[r][c] === 0) {//如果c列的值为0
    
        this.data[r][c] = this.data[r][nextc];//将nextc列的值赋值给c列
        this.data[r][nextc] = 0;//将nextc列的值置为0
        c--;//c留在原地
      } else if (this.data[r][c] === this.data[r][nextc]) {//否则 如果c列值和nextc列相同，
        this.data[r][c] *= 2;//将c列的值*2，nextc列置为0
        this.score += this.data[r][c];
        document.getElementById('score').innerHTML = this.score;
        this.data[r][nextc] = 0;
      }
  
    }
  },
  
  getNextInRow(r,c){//查找r行c列下一个
    for(let i=c+1; i<this.CN; i++){
      //如果i 位置的值不为0，就返回i否则返回-1；
      if(this.data[r][i] !== 0){
        return i;
      }
    }
    return -1;
  },
  
  moveRightInRow(r){
    //CN-1开始到c1结束，遍历r行每一格
    for(let c=this.CN-1;c>0;c--) {
      //找出下一个不为0的数prevc
      let prevc = this.getPrevInRow(r,c);
      //如果没找到 则退出循环
      if (prevc === -1) {
        break;
      } else if (this.data[r][c] === 0) {//如果c列的值为0
      
        this.data[r][c] = this.data[r][prevc];//将prevc列的值赋值给c列
        this.data[r][prevc] = 0;//将prevc列的值置为0
        c++;//c留在原地
      } else if (this.data[r][c] === this.data[r][prevc]) {//否则 如果c列值和prevc列相同，
        this.data[r][c] *= 2;//将c列的值*2，prevc列置为0
        this.score += this.data[r][c];
        document.getElementById('score').innerHTML = this.score;
        this.data[r][prevc] = 0;
      }
    }
  },
  
  getPrevInRow(r,c){//查找r行c列前一个
    for(let i=c-1;i>=0;i--){
      //如果i 位置的值不为0，就返回i否则返回-1；
      if(this.data[r][i] !== 0){
        return i;
      }
    }
    return -1;
  },
  
  moveUpInCol(c){//移动第c列 从r0开始到RN-1，遍历c列
    for(let r=0;r<this.RN-1;r++) {
      //找出下一个不为0的数nextr
      let nextr = this.getNextInCol(r,c);
      //如果没找到 则退出循环
      if (nextr === -1) {
        break;
      } else if (this.data[r][c] === 0) {//如果r行的值为0
    
        this.data[r][c] = this.data[nextr][c];//将nextr行的值赋值给r行
        this.data[nextr][c] = 0;//将nextr行的值置为0
        r--;//r留在原地
      } else if (this.data[r][c] === this.data[nextr][c]) {//否则 如果r行值和nextr行相同，
        this.data[r][c] *= 2;//将r行的值*2，nextr行置为0
        this.score += this.data[r][c];
        document.getElementById('score').innerHTML = this.score;
        this.data[nextr][c] = 0;
      }
    }
  },
  
  getNextInCol(r,c){
    for(let i=r+1; i<this.RN; i++){//查找c列r行下一个
      if(this.data[i][c] !== 0){
        return i;
      }
    }
    return -1;
  },
  
  moveDownInCol(c){
    //RN-1开始到0结束，遍历r行每一格
    for(let r=this.RN-1;r>0;r--) {
      //找出下一个不为0的数prevr
      let prevr = this.getPrevInCol(r,c);
      //如果没找到 则退出循环
      if (prevr === -1) {
        break;
      } else if (this.data[r][c] === 0) {//如果r行的值为0
        
        this.data[r][c] = this.data[prevr][c];//将prevr行的值赋值给r
        this.data[prevr][c] = 0;//将prevr行的值置为0
        r++;//r留在原地
      } else if (this.data[r][c] === this.data[prevr][c]) {//否则 如果r行值和prevr行相同，
        this.data[r][c] *= 2;//将c列的值*2，prevr列置为0
        this.score += this.data[r][c];
        document.getElementById('score').innerHTML = this.score;
        this.data[prevr][c] = 0;
      }
    }
  },
  
  getPrevInCol(r,c){//查找r行c列前一个
    for(let i=r-1;i>=0;i--){
      //如果i 位置的值不为0，就返回i否则返回-1；
      if(this.data[i][c] !== 0){
        return i;
      }
    }
    return -1;
  },
  
  randomNum(){//在随机位置生成一个2或4
    while(true) {
      let r = Math.floor(Math.random()*this.RN);
      let c = Math.floor(Math.random()*this.CN);
      
      if(this.data[r][c] === 0) {
        this.data[r][c] = Math.random()<0.5?2:4;
        break;//跳出循环
      }
    }
  },
  
  updateView(){//将data数组中的数更新到每个div中
    for(let r=0; r<this.RN; r++) {//遍历二维数组
      for(let c=0; c<this.CN; c++) {
        let n = this.data[r][c];
        let div = document.getElementById('c' + r + c);
        if(n !== 0) {
          div.innerHTML = n;
          div.className = 'cell n' + n;
        }else {
          div.innerHTML = '';
          div.className = 'cell';
        }
      }
    }
  },
  
  
};
game.start();
