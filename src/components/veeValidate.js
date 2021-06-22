import { required, integer, between, min } from '@vee-validate/rules'
import { defineRule, Form, Field, ErrorMessage } from 'vee-validate'

const rulse = {
  email: ['请输入正确邮箱', /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/],
  account: [
    '6-12个字符，使用数字和英文字母',
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
  ],
  password: ['6-12个字符，使用数字或英文字母', /^[0-9a-zA-Z]{6,12}$/],
  name: [
    '真实姓名不符合格式',
    /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/,
  ],
  phone: ['手机号码格式错误（仅支持中国大陆手机号码）', /^[0-9]{11,11}$/],
  agent: ['代理码错误', /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,7}$/],
  qq: ['请输入正确QQ号', /^[0-9]{5,13}$/],
  wechat: ['请输入正确微信号', /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/],
  chinese: ['仅限定输入中文', /^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$/],
  card: ['支付账号格式不符', /^[0-9]{13,19}$/],
  pwdConfirm: ['两次输入的密码必须一致', (value, [pwd]) => value === pwd],
  required: ['必填', required],
  integer: ['请输入整数金额', integer],
  between: ['输入金额已超出上下限', between],
  min: [(val, [len]) => `输入内容未满 ${len} 字元`, min],
}

_.each(rulse, ([msg, test], key) => {
  defineRule(key, (value, argAry) => {
    let res = false
    if (test instanceof RegExp) {
      res = test.test(value)
    } else if (test instanceof Function) {
      res = test(value, argAry)
    }
    let resMsg = msg
    if (msg instanceof Function) {
      resMsg = msg(value, argAry)
    }
    const allowEmpty = key.match(/^(required|pwdConfirm)$/) ? false : !value
    return allowEmpty || res || resMsg
  })
})

export default {
  install(app) {
    app.component('VeeForm', Form)
    app.component('Field', Field)
    app.component('ErrorMsg', ErrorMessage)
  },
}
