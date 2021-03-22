/**
 * 轉千份位
 * @param {(Number|String)} value
 * @returns {String}
 */
export default value => {
  value += ''
  if (!isNaN(value) && value !== '') {
    value = Number(value).toFixed(2)
    value += ''
  }
  const arr = value.split('.')
  const re = /(\d{1,3})(?=(\d{3})+$)/g
  return arr[0].replace(re, '$1,') + (arr.length === 2 ? '.' + arr[1] : '')
}
