<template>
  <div>
    <div>reactive 物件{{ obj }}</div>
    <div>reactive 物件內的值，直接取用{{ objCount }}</div>
    <div>轉ref 後取用{{ refObjCount }}</div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { ref, reactive, toRefs } from 'vue'
export default {
  setup() {
    const text = ref('hi')
    text.value += ' you'
    const obj = reactive({ count: 0 })
    obj.count += 1
    const refObj = toRefs(obj)
    gsap.to(refObj.count, { duration: 10, value: 100 })
    // setTimeout(() => {
    //   refObj.count.value += 20
    // }, 2000)
    return { text, obj, objCount: obj.count, refObjCount: refObj.count }
  },
}
</script>
