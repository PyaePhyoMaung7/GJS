<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <form v-on:submit.prevent="onSubmit"
            class="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search"
          >
            <div class="input-group">
              <input
                type="text"
                v-model="searchKey"
                class="form-control bg-light border border-primary small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
                @keyup.enter="getUserData"
              />
              <div class="input-group-append">
                <button @click="getUserData" class="btn btn-primary" type="button">
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

    <div v-else>
      <table class="table table-hover" v-if="reverseUsers">
        <thead class="bg-primary text-white">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
        </thead>

        <tbody v-if="order == 'asc'">
          <tr v-for="(user, index) in users" :key="index">
            <td scope="col" class="align-middle">{{ user.id }}</td>
            <td scope="col" class="align-middle">{{ user.name }}</td>
            <td scope="col" class="align-middle">{{ user.email }}</td>
            <td scope="col" class="align-middle">
              <select v-model="user.role" :id="user.id" @change="roleChange" class="form-select form-control" aria-label="Default select example">
                <option :disabled="currentUserId == user.id" value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr v-for="(user, index) in reverseUsers.data" :key="index">
            <td scope="col" class="align-middle">{{ user.id }}</td>
            <td scope="col" class="align-middle">{{ user.name }}</td>
            <td scope="col" class="align-middle">{{ user.email }}</td>
            <td scope="col" class="align-middle">
              <select v-model="user.role" :id="user.id" @change="roleChange" class="form-select form-control" aria-label="Default select example">
                <option :disabled="currentUserId == user.id" value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <div  v-if="reverseUsers.data.length == 0">
          <div class="text-center py-5 h3 font-weight-bold ">There is no user with {{ searchKey }}</div>
      </div>

      <div class="float-right">
        <Bootstrap5Pagination
          :limit="2"
          :data="reverseUsers"
          @pagination-change-page="getUserData"
        />
      </div>
    </div>
  </div>
</template>

<script src="../../js/admin/userList.js"></script>
