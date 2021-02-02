Page({
  data: {
    // 导航栏
    showCalcuType: false,
    calcuType: [
        { text: '标准', type: 'warn', value: 1 },
        { text: '科学', value: 2 },
        { text: '程序员', value: 3 }
    ],
    calcuText: {
      text: '标准'
    },

    showLangType: false,
    langType: [
      { text: '中文', type: 'warn', value: 1 },
      { text: 'English', value: 2 },
      { text: '한국어', value: 3 },
      { text: 'ランゲージ', value: 4 }
    ],
    langText: {
      text: '中文'
    },

    showRd: false,
    rdMsg: '123',

    // 显示屏
    screenNum: '0',  // 输入值
    operator: '+-×÷',   // 运算符
    result: null,
    status: 0,
  },

  // 导航栏处理函数
  ctsHandle : function () {
    this.setData({
      showCalcuType: true
    })
  },
  calcuTypeSelect(e) {
    console.log(e.detail)
    let calcuType = this.data.calcuType[e.detail.index]
    this.ctsClose()
    this.setData({
      calcuText: calcuType
    })
  },
  ctsClose: function () {
    this.setData({
      showCalcuType: false,
    })
  },

  ltsHandle : function () {
    this.setData({
      showLangType: true
    })
  },
  langTypeSelect(e) {
    console.log(e.detail)
    let langType = this.data.langType[e.detail.index]
    this.ltsClose()
    this.setData({
      langText: langType
    })
  },
  ltsClose: function () {
    this.setData({
      showLangType: false
    })
  },

  rdHandle: function () {
    this.setData({
      showRd: true
    })
  },

  // 键盘处理函数
  btnHandle: function (e) {
    var btn = e.currentTarget.dataset.value;
    console.log(btn);
    // 清屏
    if ( btn == 12 ) {
      this.setData({
        screenNum: 0,
        operator: '',
        result: 0,
        status: 0
      })
      return;
    // 退格
    } if ( btn == 21 ) {
      var screenNum = this.data.screenNum;
      var screenNum = screenNum.charAt(0) === '-' ?
      screenNum.slice(1) : '-'+screenNum
      this.setData({
        screenNum: screenNum
      })
      return;
    } if ( btn == 13 ) {
      var screenNum = this.data.screenNum;
      var screenNum = screenNum.substr(0, screenNum.length - 1);
      var screenNum = screenNum ? screenNum : 0 ;
      this.setData({
        screenNum: screenNum
      })
    } else {
      switch( this.data.status ) {
        case 0:
          if ( btn < 10 ) {
            screenNum = btn + '';
            this.setData({
              screenNum: screenNum,
              status: 1
            })
          } else {
            return;
          }
          break;
        case 1:
          if ( btn < 10 ) {
            screenNum = btn;
          } else {
            screenNum += '';
          }
          this.setData({
            screenNum: this.data.screenNum + screenNum,
            status: 1
          })
          break;
        case 2:
          if ( btn == 20 ) {
            screenNum = this.data.screenNum +
            this.setData({

            })
          }
        }
      }
  },

//   result: null, // 赋值给data中的num
//   isClear: false,  // 为true时替换当前结果，false时新数字插入尾部
//   digitBtn: function (e) {
//     var newNum = e.currentTarget.dataset.val; // 获取点击数字键盘上的值
//     if (this.data.num === '0' || this.isClear) {
//       this.setData({
//         num: newNum
//       })
//       this.isClear = false;
//     } else {
//       this.setData({ num: this.data.num + newNum })
//       console.log(newNum);
//     }
//   },
//   opBtnHandle (e) {
//     const op = this.data.op
//     const num = Number(this.data.num)  // 格式化字符串才能计算
//     this.setData({ 
//       op: e.currentTarget.dataset.val // 先记录点击数字键盘上的运算符
//     })
//     if(this.isClear) return;
//     this.isClear = true;
//     if (op === '+') {
//       this.result = this.data.num + num
//     } else if (op === '-') {
//       this.result = this.data.num - num
//     } else if (op === '×') {
//       this.result = this.data.num * num
//     } else if (op === '÷') {
//       this.result = this.data.num / num
//     } else if (op === '%') {
//       this.result = this.data.num % num
//     }

//     this.setData({
//       num: this.result + ''  // 隐式转换为字符串呈现
//     })
//   }
 })
