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
    rdMsg: [],

    // 显示屏
    screenNum: '0',  // 输入值
    operator: '',   // 运算符
    result: null,
    status: 0,
    isOpera: false, // 设置标志位
    arr: [],
    // 按钮
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    plus: '+',
    minu: '-',
    times: '*',
    divid: '/',
    percent: '%',
    dot: '.',
    equal: '=',
    zf: '-',
    frac: 'frac',
    pow: 'pow',
    root: 'root',
    clearPre: 'clearPre',
    clear: 'clear',
    back: 'back'
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
    // 获取页面数据
    var btn = e.currentTarget.id;
    var screenNum = this.data.screenNum;
    var str = null;
    // 退格
    if ( btn == this.data.back ) {
      screenNum = this.data.screenNum;
      var lastword = screenNum[screenNum.length-1];
      if ( lastword == this.data.plus || lastword == this.data.minu || lastword == this.data.times || lastword == this.data.divid) {
        this.setData({isOpera: false})
      }
      str = screenNum.slice(0, this.data.screenNum.length -1)
      this.setData({screenNum: str})
      this.data.arr.pop();

      // 清屏
    } else if ( btn == this.data.clear ) {
      this.setData({screenNum: 0})
      this.setData({ isOpera: false})
      this.data.arr = [];

      // 取正负
    } else if ( btn == this.data.zf ) {
      screenNum = this.data.screenNum
      var firstword = screenNum[0]
      if (isNaN(firstword)) {
        var str = screenNum.substring(1,screenNum.length)
        this.data.arr.shift();
      } else {
        var str = '-' + screenNum;
        this.data.arr.unshift('-');
      }
      this.setData({screenNum:str})

      // 等号
    } else if ( btn == this.data.equal ) {
      var newArr = [];
      var num = '';
      var arr = this.data.arr;

      for( var i in arr ) {
        if ( isNaN(arr[i]) == false || arr[i] == this.data.dot ){
          num+=arr[i];
        } else {
          newArr.push(num);
          newArr.push(arr[i]);
          num = '';
        }
      }
      newArr.push(num);
      var result = Number(newArr[0]);

      for(var i=1;i<=newArr.length;i++){
        if(newArr[i]==this.data.plus) {
          result += Number(newArr[i+1])
        } else if (newArr[i]==this.data.minu) {
          result -= Number(newArr[i+1])
        } else if (newArr[i]==this.data.times) {
          result *= Number(newArr[i+1])
        } else if (newArr[i]==this.data.divid) {
          result /= Number(newArr[i+1])
        }
      }
      this.data.rdMsg.push(this.data.screenNum + '=' + result);
      wx.setStorageSync('rdMsg', this.data.rdMsg)
      this.setData({screenNum: result})
      this.data.arr = [];
      this.data.arr.push(result);

      // console.log(newArr);
      console.log(result);
      console.log(this.data.rdMsg);

    } else {
            // 判断是否为符号
            if (btn == this.data.plus || btn == this.data.minu || btn == this.data.times || btn == this.data.divid) {
              if (this.data.isOpera == true) {
                return '';
              }
            }
            // 判断是否为零
            if ( screenNum == 0 ) {
              str = btn;
            } else {
              var str = screenNum + btn;
            }
          
            this.setData({isOpera: false});
          
            if (btn == this.data.plus || btn == this.data.minu || btn == this.data.times || btn == this.data.divid) {
              this.setData({isOpera: true});
            }

            // 重新渲染数据

            this.data.arr.push(btn);
            this.setData({screenNum: str});
            console.log(this.data.rdMsg);

            var rd = wx.getStorageSync('rdMsg')
            this.setData({rdMsg: rd})
    }


    // console.log(this.data.screenNum);
    // console.log(this.data.isOpera);

    // 清屏
    // if ( btn == 12 ) {
    //   this.setData({
    //     screenNum: 0,
    //     operator: '',
    //     result: 0,
    //     status: 0
    //   })
    //   return;
    // // 退格
    // } if ( btn == 21 ) {
    //   var screenNum = this.data.screenNum;
    //   var screenNum = screenNum.charAt(0) === '-' ?
    //   screenNum.slice(1) : '-'+screenNum
    //   this.setData({
    //     screenNum: screenNum
    //   })
    //   return;
    // } if ( btn == 13 ) {
    //   var screenNum = this.data.screenNum;
    //   var screenNum = screenNum.substr(0, screenNum.length - 1);
    //   var screenNum = screenNum ? screenNum : 0 ;
    //   this.setData({
    //     screenNum: screenNum
    //   })
    // } else {
    //   switch( this.data.status ) {
    //     case 0:
    //       if ( btn < 10 ) {
    //         screenNum = btn + '';
    //         this.setData({
    //           screenNum: screenNum,
    //           status: 1
    //         })
    //       } else {
    //         return;
    //       }
    //       break;
    //     case 1:
    //       if ( btn < 10 ) {
    //         screenNum = btn;
    //       } else {
    //         screenNum += '';
    //       }
    //       this.setData({
    //         screenNum: this.data.screenNum + screenNum,
    //         status: 1
    //       })
    //       break;
    //     case 2:
    //       if ( btn == 20 ) {
    //         screenNum = this.data.screenNum +
    //         this.setData({

    //         })
    //       }
    //     }
    //   }
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
