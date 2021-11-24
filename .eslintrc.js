module.exports = {
  root: true, // 此為最父層eslint
  env: {
    browser: true, // 瀏覽器全局變量
    node: true, // node全局變量
    es6: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/prettier',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    _: 'readonly',
    d: 'readonly',
  },
  rules: {
    // 0:off ；1:warn ；2:error
    // prettier
    'prettier/prettier': [
      2,
      {
        singleQuote: true, // 使用單引號 ；eslint => quotes
        semi: false, // 不使用尾部分號；eslint => semi
        trailingComma: 'all', // 禁止尾部逗號；eslint => comma-dangle
        jsxBracketSameLine: true, // html > 不單獨一列
        arrowParens: 'avoid', // 箭頭函式 argument 一個時不用括號；eslint => arrow-parens
        endOfLine: 'auto',
      },
    ],
    'vue/max-attributes-per-line': [
      // html attr 換行風格
      2,
      { singleline: 5, multiline: { max: 5, allowFirstLine: true } },
    ],
    'vue/singleline-html-element-content-newline': 0, // html 單一子元素換行 關閉
    'vue/no-v-html': 0, // 禁用v-html 關閉
    'vue/html-comment-content-newline': 2, // html 註解樣式
    'vue/html-comment-content-spacing': 2,
    'vue/html-comment-indent': 2,
    'vue/match-component-file-name': 2, // 元件名與檔名相同
    'vue/no-empty-component-block': 2, // 禁止script template style 內容為空
    'vue/no-multiple-objects-in-class': 2, // call 陣列內不允許兩個obj
    'vue/no-reserved-component-names': 2, // 組件名稱禁止出現html 保留字(div、span)
    'vue/padding-line-between-blocks': 2, // script template style 上下要加空格
    'vue/static-class-names-order': 2, // 強制class 照順序排列
    'vue/arrow-spacing': 2, // template 箭頭函式格式
    'vue/block-spacing': 2, // template {}括弧內開頭結尾需有空白
    'vue/brace-style': [
      2,
      '1tbs',
      {
        // template if else 等，括号风格
        allowSingleLine: true,
      },
    ],
    'vue/comma-dangle': [2, 'always-multiline'], // template 陣列、物件後面是否接逗號
    'vue/comma-spacing': 2, // template逗號風格
    'vue/comma-style': 2, //
    'vue/eqeqeq': [2, 'smart'], // template 用 ===
    'vue/key-spacing': [2, { align: 'colon' }], // template object 風格
    'vue/keyword-spacing': 2, // template if else class 等周圍空格
    // 'vue/max-len': 2, // template script 最大長度(不能自動修)
    'vue/no-empty-pattern': 2, // template 禁用空解構
    'vue/no-extra-parens': 2, // template 禁用不必要的括號()
    'vue/no-irregular-whitespace': 2, // template 禁用詭異的空格
    'vue/no-restricted-syntax': 2, // template禁用無法更新的使用方法，如{{abc()}}
    'vue/no-sparse-arrays': 2, // template禁用[,,]
    'vue/no-useless-concat': 2, // template禁用沒必要拼接 "你"+"我"
    'vue/operator-linebreak': [2, 'after'], // template + - * / 符號前不換行
    'vue/space-infix-ops': 2, // template +  - = 旁要空格
    'vue/space-unary-ops': [
      // template 一元操作符空格
      2,
      {
        words: true,
        nonwords: false,
      },
    ],
    'vue/template-curly-spacing': 2, // template 不允許${}括號旁內有空格
    // eslint
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
  },
}
