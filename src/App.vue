<template lang="pug">
router-view
Modal(v-model="modalShow")
  VeeForm(v-slot="{ submitForm }")
    button(@click="changeMin") click
    Field(name="password" :rules="`min:${min}`")
    ErrorMsg(name="password")
    button(@click="submitForm") submit
</template>

<script>
import { test } from '@/api/home'
import { timeAdd } from '@/utils/time'
export default {
  data() {
    return {
      modalShow: true,
      min: 3,
      d_test: d(test),
      testTime: timeAdd('2021-04-12', 1, {
        unit: 'd',
        formatOutput: 'MM-DD HH:mm',
        endUnit: 'd',
      }),
    }
  },
  mounted() {
    // console.log(test)
    this.d_test({ sone: 'ss' })
  },
  methods: {
    changeMin() {
      this.min += 1
    },
    test,
  },
}
</script>

<style lang="sass" scoped>
form
  input
    display: block
  button
      display: block
      border: 1px solid #000
      padding: 5px
      &:hover
        background: #ccc
        color: white
  span
    &+button
      background: red
</style>
