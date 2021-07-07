<template>
  <div class="wrapper">
      <div class="v-select">
      <p class="title"
        @click.self.stop="areOptionsVisible =! areOptionsVisible"
        v-on:click="sortIt"
        >{{selected}}</p>
      <div class="options" v-if="areOptionsVisible">
        <p
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
        >
          {{ option.name}}
        </p>
      </div>
    </div>

  </div>
    
</template>

<script>
export default {
  name: "v-select",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    selected: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      areOptionsVisible: false,
      sortParam: '',
    };
  },
  methods: {
    selectOption(option) {
      this.$emit("select", option);
      this.areOptionsVisible = false;
    },
    hideSelect() {
      this.areOptionsVisible = false;
    },
    sortIt() {
      this.sortParam = this.options.sort(function (a, b){
        return a.name.localeCompare(b.name);
      });
    }
  },
  mounted() {
    document.addEventListener("click", this.hideSelect);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSelect);
  }
}
</script>

<style>
.v-select {
  position: absolute;
  top: 80px;
  left: 10px;
  width: 200px;
  cursor: pointer;
}
.title {
  border: 1px solid #aeaeae;
}
.v-select p {
  margin: 0;
}
.options {
  border: 1px solid #aeaeae;
  position: absolute;
  top: 30px;
  right: 0;
  width: 100%;
}
.options p:hover {
  background: rgba(206, 156, 221, 0.377);
}
</style>