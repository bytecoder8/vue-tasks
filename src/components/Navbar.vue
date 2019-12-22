<template>
  <nav class="cyan darken-1">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo"><i class="material-icons">cloud</i>Logo</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <router-link tag="li" to="/" exact active-class="active">
          <a href="#">Create</a>
        </router-link>
        <router-link tag="li" to="/list" active-class="active">
          <a href="#">List</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  padding-left: 1rem;
}
</style>