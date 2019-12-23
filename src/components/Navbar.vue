<template>
<div>
    <nav class="cyan darken-1">
      <div class="nav-wrapper">
        <router-link to="/" exact class="brand-logo"><i class="material-icons">cloud</i>Tasks</router-link>
        <a href="#" data-target="mobile-links" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <router-link tag="li" to="/create" active-class="active">
            <a href="#">{{ $l('create') }}</a>
          </router-link>
          <router-link tag="li" to="/list" active-class="active">
            <a href="#">{{ $l('list') }}</a>
          </router-link>
        </ul>
      </div>
    </nav>
    <ul class="sidenav sidenav-close" ref="sidenav" id="mobile-links">
        <router-link tag="li" to="/create" active-class="active">
          <a href="#">{{ $l('create') }}</a>
        </router-link>
        <router-link tag="li" to="/list" active-class="active">
          <a href="#">{{ $l('list') }}</a>
        </router-link>
    </ul>
    <div class="switch">
      <label>
        English
        <input type="checkbox" v-model="isRuLocale">
        <span class="lever"></span>
        Русский
      </label>
    </div>
</div>
</template>

<style lang="scss" scoped>
nav {
  padding-left: 1rem;
}
</style>

<script>
import { mapState } from 'vuex'
export default {
  mounted() {
    window.M.Sidenav.init(this.$refs.sidenav, {})
  },
  data() {
    return {
      isRuLocale: this.$store.state.locale === 'ru-RU'
    }
  },
  watch: {
    isRuLocale(val) {
      const locale = val ? 'ru-RU' : 'en-US'
      this.$store.dispatch('setLocale', locale)
    }
  }
}
</script>