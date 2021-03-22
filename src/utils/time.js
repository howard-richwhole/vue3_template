import moment from 'moment/min/moment.min'

/**
 * 時間文字格式轉換
 * @param {(String|Number|Date|moment)} time
 * @param {String} formatOutput
 * @param {String} formatInput
 * @returns {String}
 */
const timeFormat = (time, formatOutput, formatInput) => {
  // https://momentjs.com/docs/#/displaying/format/
  // 年YYYY、月:MM(01)M(1)、日:DD(01)D(1)、時HH(01)H(1)、分mm(01)m(1)、秒ss(01)s(1)
  return moment(time, formatInput).format(formatOutput)
}

/**
 * 加五天 timeAdd('2000-01-01',5,''d) === 2000-01-06
 * @param {(String|Date|Number|moment)} time
 * @param {Number} dur 間格時間
 * @param {String} unit 單位
 * @param {String} endUnit 結尾時間單位，不填則不使用 'd' -> 2000-01-06 23:59:59
 * @param {String} formatInput 輸入時間格式
 * @param {String} formatOutput 輸出時間格式
 * @returns {String}
 */
const timeAdd = (time, dur, unit = 'd', endUnit, formatOutput, formatInput) => {
  // https://momentjs.com/docs/#/manipulating/add/
  // years y、quarters Q、months M、weeks w、days d、hours h、minutes m、seconds s
  const momentTime = moment(time, formatInput)
  return momentTime
    .add(dur, unit)
    .endOf(endUnit)
    .format(formatOutput || momentTime._f)
}

/**
 * 時間間距
 * @param {String} time1
 * @param {String} time2
 * @param {Boolean} floatResult 是否有小數點
 * @param {String} unit 單位
 * @param {String} formatInput 時間輸入格式
 * @returns {Number}
 */
const timeDiff = (
  time1,
  time2,
  floatResult = false,
  unit = 'd',
  formatInput,
) => {
  const time1_moment = moment(time1, formatInput)
  const time2_moment = moment(time2, formatInput)
  return time1_moment.diff(time2_moment, unit, floatResult)
}
export { timeFormat, timeAdd, timeDiff }
