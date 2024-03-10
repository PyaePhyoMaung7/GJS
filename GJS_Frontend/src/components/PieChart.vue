<template>
  <div class="card shadow mb-4">
    <!-- Card Header - Dropdown -->
    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
      <h6 class="m-0 font-weight-bold text-primary">Order Status</h6>
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
      <div class="chart-pie pt-4 pb-2">
        <div
          v-if="!$store.getters.getStatusDataLoaded"
          class="d-flex z-2 h-100 justify-content-center align-items-center"
        >
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <canvas v-show="$store.getters.getSalesDataLoaded" class="" id="myPieChart"></canvas>
      </div>
      <div class="mt-4 text-center small">
        <span class="mr-2"> <i class="fas fa-circle text-primary"></i> Pending </span>
        <span class="mr-2"> <i class="fas fa-circle text-success"></i> Accepted </span>
        <span class="mr-2"> <i class="fas fa-circle text-info"></i> Rejected </span>
      </div>
    </div>
  </div>
</template>

<script src="../js/admin/chart-pie.js"></script>
