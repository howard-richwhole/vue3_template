<template>
  <teleport to="#app">
    <transition name="modal">
      <div
        v-if="modelValue"
        class="modal"
        :class="{ over }"
        @click.self="closeModal"
      >
        <div ref="box" class="modal-box">
          <header>
            <span>{{ title }}</span>
            <button @click="closeModal">╳</button>
          </header>
          <article>
            <slot />
          </article>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
// 共用遮罩
export default {
  props: {
    modelValue: {
      required: true,
      type: Boolean,
    },
    title: {
      type: String,
      default: '提示',
    },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const store = useStore()
    const closeModal = () => {
      context.emit('update:modelValue', false)
    }

    const box = ref(null) // https://composition-api.vuejs.org/zh/api.html#%E6%A8%A1%E6%9D%BF-refs
    const over = ref(null)
    const duration = ref('0.3s')
    const setFlexStyle = () => {
      if (box.value) {
        over.value = box.value.offsetHeight > innerHeight
      }
    }
    onMounted(setFlexStyle)
    watch(() => store.state.web.size, setFlexStyle)
    watch(
      () => props.modelValue,
      ni => {
        if (ni) setTimeout(setFlexStyle, 300)
      },
    )
    return { closeModal, box, over, duration }
  },
}
</script>

<style lang="scss" scoped>
.modal {
  background: rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &.over {
    align-items: flex-start;
  }
  .modal-box {
    border-radius: 10px;
    min-width: 500px;
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
    position: relative;
    > header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      > button {
        position: absolute;
        right: 0;
      }
    }
    > article {
      padding: 20px;
      display: flex;
    }
  }
}
</style>

<style lang="scss" scoped>
$t: 0.3s;
.modal {
  /deep/.modal-box {
    animation: rebound $t;
    > * > * {
      transition: transform $t * 1.1 ease $t/2, opacity $t * 1.1 ease $t/2;
    }
  }
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity $t;
  /deep/.modal-box {
    transition: transform $t;
  }
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  /deep/.modal-box {
    transform: scale(0.9);
    > * > * {
      transform: translate(0, 10px);
      opacity: 0;
    }
  }
}

@keyframes rebound {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}
</style>
