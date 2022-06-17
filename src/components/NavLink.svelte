<script>
  import { page } from '$app/stores';
  export let title;
  export let href;
</script>

<a {href} class="link bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page"
  class:active="{$page.url.pathname.includes(href)}">
  {title}
</a>

<style>
  a.active {
    background-color: rgba(0, 0, 0, 0.24);
  }
</style>