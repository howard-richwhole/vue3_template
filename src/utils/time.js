import moment from 'moment/min/moment.min'

/**
 * 時間文字格式轉換
 * @param {Moment | string | Date | number} time
 * @param {{formatOutput:?string,formatInput: ?string}} opts
 * @return {string}
 */
const timeFormat = (time, opts = {}) => {
  // https://momentjs.com/docs/#/displaying/format/
  // 年YYYY、月:MM(01)M(1)、日:DD(01)D(1)、時HH(01)H(1)、分mm(01)m(1)、秒ss(01)s(1)
  return moment(time, opts.formatInput).format(opts.formatOutput)
}

/**
 * 加五天 timeAdd('2000-01-01',5,''d) === 2000-01-06
 * @param {Moment | string | Date | number} time
 * @param {Number} dur 間格時間
 * @param {?unit:string,?endUnit:string,?startUnit:string,?formatInput:string,?formatOutput:string} opts
 *  {String} unit 單位
 *  {String} endUnit 結尾時間單位，不填則不使用； 'd' -> 2000-01-06 23:59:59
 *  {String} formatInput 輸入時間格式
 *  {String} formatOutput 輸出時間格式
 * @returns {string}
 */
const timeAdd = (time, dur, opts = {}) => {
  // https://momentjs.com/docs/#/manipulating/add/
  // years y、quarters Q、months M、weeks w、days d、hours h、minutes m、seconds s
  const momentTime = moment(time, opts.formatInput)
  if (!opts.unit) opts.unit = 'd'
  return momentTime
    .add(dur, opts.unit)
    .endOf(opts.endUnit)
    .startOf(opts.startUnit)
    .format(opts.formatOutput || momentTime._f)
}

/**
 *
 * @param {string} time1 目標時間1
 * @param {string} time2 目標時間2
 * @param {?floatResult:boolean,?unit:string,:formatInput:string} opts
 *  {Boolean} floatResult 是否有小數點
 *  {String} unit 單位
 *  {String} formatInput 時間輸入格式
 * @returns number
 */
const timeDiff = (time1, time2, opts = {}) => {
  if (!opts.unit) opts.unit = 'd'
  const time1_moment = moment(time1, opts.formatInput)
  const time2_moment = moment(time2, opts.formatInput)
  return time1_moment.diff(time2_moment, opts.unit, Boolean(opts.floatResult))
}
export { timeFormat, timeAdd, timeDiff }
