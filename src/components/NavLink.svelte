<script>
  import { page } from '$app/stores';
  export let title;
  export let href;
</script>

<a {href} class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
  aria-current="page" class:active="{$page.url.pathname === href}">
  {title}
</a>

<style>
  a.active {
    background-color: rgb(17 24 39 / var(--tw-bg-opacity));
  }
</style>