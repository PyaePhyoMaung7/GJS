<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <form
            class="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search"
          >
            <div class="input-group">
              <input
                type="text"
                class="form-control bg-light border border-primary small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
      <div class="d-sm-flex">
        <div
          class="btn-group-sm btn-group-toggle mr-3 border rounded border-primary"
          data-toggle="buttons"
        >
          <label id="ascBtn" class="btn btn-white">
            <input
              type="radio"
              name="options"
              id="option1"
              autocomplete="off"
              @click="ascClicked"
            />
            ASC
          </label>
          <label id="descBtn" class="btn btn-primary">
            <input
              type="radio"
              name="options"
              id="option2"
              autocomplete="off"
              @click="descClicked"
            />
            DESC
          </label>
        </div>
        <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          ><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a
        >
      </div>
    </div>

    <div v-if="loading" class="text-center text-primary">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="shadow" v-else>
      <table class="table table-hover" v-if="reverseOrders">
        <thead class="bg-primary text-white">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Code</th>
            <th scope="col">User</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
          </tr>
        </thead>

        <tbody v-if="order == 'asc'">
          <tr v-for="(order, index) in orders" :key="index">
            <td scope="col">{{ order.id }}</td>
            <td scope="col">{{ order.order_code }}</td>
            <td scope="col">{{ order.name }}</td>
            <td scope="col">{{ order.total_price }}</td>
            <td v-if="order.status == 0" scope="col">Pending</td>
            <td v-if="order.status == 1" scope="col">Accepted</td>
            <td v-if="order.status == 2" scope="col">Rejected</td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr v-for="(order, index) in reverseOrders.data" :key="index">
            <td scope="col">{{ order.id }}</td>
            <td scope="col">{{ order.order_code }}</td>
            <td scope="col">{{ order.name }}</td>
            <td scope="col">{{ order.total_price }}</td>
            <td v-if="order.status == 0" scope="col">Pending</td>
            <td v-if="order.status == 1" scope="col">Accepted</td>
            <td v-if="order.status == 2" scope="col">Rejected</td>
          </tr>
        </tbody>
      </table>

      <div  v-if="reverseOrders.data.length == 0">
          <div class="text-center py-5 h3 font-weight-bold ">There is no order with {{ searchKey }}</div>
      </div>

      <div class="float-right">
        <Bootstrap5Pagination
          :limit="2"
          :data="reverseOrders"
          @pagination-change-page="getOrderData"
        />
      </div>

      <!-- pagination to stay on the same page after updating a record -->
      <!-- <Pagination :data="laravelData" :limit="1" @pagination-change-page="page => getResults(page, per_page, orderColumn, orderDirection)"></Pagination> -->
    </div>
  </div>
</template>

<script src="../../js/admin/orderList.js"></script>
