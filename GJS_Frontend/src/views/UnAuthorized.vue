<style>
  @import '../../public/assets/css/sb-admin-2.min.css';
</style>


<template>
  <!-- 404 Error Text -->
  <div class="d-flex flex-column align-items-center justify-content-center vh-100">
    <div class="error" data-text="403">403</div>
    <h3 class="text-gray-800 my-5 font-weight-bold">Permission Denied</h3>
    <p class="text-gray-600 text-lg mb-5">You don't have permission to access this page.</p>
    <button @click="$router.back()" class="btn btn-primary">Go Back</button>
    <!-- <button onclick="history.back()" class="btn btn-primary">Go Back</button> -->
  </div>
</template>

<script src="../js/unauthorized.js"></script>

