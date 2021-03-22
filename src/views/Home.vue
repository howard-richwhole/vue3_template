<template>
  <div class="home">
    <h1 @click="modalShow = true" />
    <Modal v-model="modalShow">
      <VeeForm v-slot="{ submitForm }">
        <Field name="password" rules="min:3" />
        <ErrorMsg name="password" />
        <button @click="submitForm">submit</button>
      </VeeForm>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      modalShow: false,
    }
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50%;
  h1 {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: yellowgreen;
  }
}

form {
  width: 100%;
  > * {
    width: 100%;
    display: block;
  }
  button {
    margin-top: 50px;
    background: green;
    color: white;
    padding: 10px;
    &:hover {
      filter: brightness(120%);
    }
  }
}
</style>
