<template>
  <div class="card shadow mb-4">
    <!-- Card Header - Dropdown -->
    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
      <h6 class="m-0 font-weight-bold text-primary">Earnings Overview</h6>

      <div class="dropdown no-arrow">
        <a
          class="dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
        </a>
        <div
          class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
          aria-labelledby="dropdownMenuLink"
        >
          <div class="dropdown-header">Dropdown Header:</div>
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
    </div>
    <!-- Card Body -->

    <div class="card-body">
      <div class="chart-area">
        <div
          v-if="!$store.getters.getSalesDataLoaded"
          class="d-flex h-100 justify-content-center align-items-center text-primary"
        >
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <canvas v-show="$store.getters.getSalesDataLoaded" id="myAreaChart"></canvas>
      </div>
    </div>
  </div>
  
</template>

<script src="../js/admin/chart-area.js"></script>

