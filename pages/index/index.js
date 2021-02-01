Page({
  data: {
    num: '',  // 输入值
    op: '+-×÷',   // 运算符
    showCalcuType: false,
    calcuType: [
        { text: '标准', type: 'warn', value: 1 },
        { text: '科学', value: 2 },
        { text: '程序员', value: 3 }
    ],
    showLangType: false,
    langType: [
      { text: 'Chinese', type: 'warn', value: 1 },
      { text: 'English', value: 2 },
      { text: 'Japinses', value: 3 },
      { text: 'Korean', value: 4 }
    ],

    show: false,
    buttons: [
        {
            type: 'default',
            className: '',
            text: '辅助操作',
            value: 0
        },
        {
            type: 'primary',
            className: '',
            text: '主操作',
            value: 1
        }
    ]

  },
  ctsHandle : function () {
    this.setData({
      showCalcuType: true
    })
  },
  close: function () {
    this.setData({
      showCalcuType: false
    })
  },
  calcuTypeSelect(e) {
      console.log(e.detail)
      this.close()
  },
  ltsHandle : function () {
    this.setData({
      showLangType: true
    })
  },
  close: function () {
    this.setData({
      showLangType: false
    })
  },
  langTypeSelect(e) {
      console.log(e.detail)
      this.close()
  },

open: function () {
  this.setData({
      show: true
  })
},
buttontap(e) {
  console.log(e.detail)
},


  result: null, // 赋值给data中的num
  isClear: false,  // 为true时替换当前结果，false时新数字插入尾部
  digitBtn: function (e) {
    var newNum = e.currentTarget.dataset.val; // 获取点击数字键盘上的值
    if (this.data.num === '0' || this.isClear) {
      this.setData({
        num: newNum
      })
      this.isClear = false;
    } else {
      this.setData({ num: this.data.num + newNum })
      console.log(newNum);
    }
  },
  opBtnHandle (e) {
    const op = this.data.op
    const num = Number(this.data.num)  // 格式化字符串才能计算
    this.setData({ 
      op: e.currentTarget.dataset.val // 先记录点击数字键盘上的运算符
    })
    if(this.isClear) return;
    this.isClear = true;
    if (op === '+') {
      this.result = this.data.num + num
    } else if (op === '-') {
      this.result = this.data.num - num
    } else if (op === '×') {
      this.result = this.data.num * num
    } else if (op === '÷') {
      this.result = this.data.num / num
    } else if (op === '%') {
      this.result = this.data.num % num
    }

    this.setData({
      num: this.result + ''  // 隐式转换为字符串呈现
    })
  }
})
