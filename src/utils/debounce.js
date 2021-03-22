/**
 *
 * @param {Function} cb
 * @param {Number} time 執行間隔時間
 * @returns {Function}
 */
const debounce_function = (cb, time = 1000) =>
  _.debounce(cb, time, {
    leading: true,
    trailing: false,
  })

export default debounce_function
