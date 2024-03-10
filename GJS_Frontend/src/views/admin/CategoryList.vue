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
                @keyup.enter="getCategoryData"
              />
              <div class="input-group-append">
                <button @click="getCategoryData" class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
      <div class="d-sm-flex">
        <button
          @click="createModalVisible = true"
          class="d-none d-sm-inline-block btn btn-sm rounded btn-primary shadow-sm mr-3"
          data-toggle="modal"
          data-target="#categoryCreate"
        >
          <i class="fas fa-plus-circle fa-lg text-whtie-50"></i> Add Category
        </button>

        <!-- Button trigger modal -->
        <!-- Category Createe Modal -->
        <teleport to="body">
          <div
            v-if="createModalVisible"
            id="categoryCreate"
            class="modal fade"
            data-backdrop="static"
            data-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h2 class="modal-title fs-5 text-center text-primary" id="staticBackdropLabel">
                    Create new category
                  </h2>
                  <button
                    @click="createModalVisible = false"
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
                <div class="modal-body">
                  <label for="addCategory" class="form-label text-dark">Category Title</label>
                  <input
                    type="text"
                    v-model="createForm.category"
                    class="form-control"
                    id="addCategory"
                    aria-describedby="addCategory"
                    placeholder="Enter Category Title"
                  />
                  <div class="text-danger mt-2" v-if="errors.category">
                    {{ errors.category[0] }}
                  </div>
                </div>
                <div class="d-flex justify-content-end p-3">
                  <button
                    type="button"
                    @click="createModalVisible = false"
                    class="btn btn-secondary mr-3"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button @click="createSave" type="button" class="btn btn-primary">Save</button>
                </div>
              </div>
            </div>
          </div>
        </teleport>

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
      <table class="table table-hover" v-if="reverseCategories">
        <thead class="bg-primary text-white">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col" class="col-2"></th>
          </tr>
        </thead>

        <tbody v-if="order == 'asc'">
          <tr v-for="(category, index) in categories" :key="index">
            <td scope="col" class="align-middle">{{ category.id }}</td>
            <td scope="col" class="align-middle">{{ category.name }}</td>

            <td class="d-flex justify-content-between">
              <button id="editBtn"
              @click="editClicked(category.id, category.name)"
                class="btn btn-sm btn-success mr-2"
                data-toggle="modal"
                data-target="#categoryEdit"
              >
                <i class="fa-solid fa-pen-to-square"></i> Edit
              </button>
              <teleport to="body">
                <div
                  v-if="editModalVisible"
                  id="categoryEdit"
                  class="modal fade"
                  data-backdrop="static"
                  data-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h2
                          class="modal-title fs-5 text-center text-primary"
                          id="staticBackdropLabel"
                        >
                          Edit category
                        </h2>
                        <button
                          @click="editModalVisible = false"
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          &times;
                        </button>
                      </div>
                      <div class="modal-body">
                        <label for="category" class="form-label text-dark">Category Title</label>
                        <input
                          type="text"
                          v-model="editForm.category"
                          class="form-control"
                          id="category"
                          aria-describedby="addCategory"
                          placeholder="Enter Category Title"
                        />
                        <div class="text-danger mt-2" v-if="errors.category">
                          {{ errors.category[0] }}
                        </div>
                      </div>
                      <div class="d-flex justify-content-end p-3">
                        <button
                          type="button"
                          @click="editModalVisible = false"
                          class="btn btn-secondary mr-3"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button @click="editSave" type="button" class="btn btn-primary">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </teleport>
              <button @click="deleteClicked(category.id)" class="btn btn-sm btn-danger">
                <i class="fa-solid fa-trash"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr v-for="(category, index) in reverseCategories.data" :key="index">
            <td scope="col" class="align-middle">{{ category.id }}</td>
            <td scope="col" class="align-middle">{{ category.name }}</td>
            <td class="d-flex justify-content-between">
              <button id="editBtn"
              @click="editClicked(category.id, category.name)"
                class="btn btn-sm btn-success mr-2"
                data-toggle="modal"
                data-target="#categoryEdit"
              >
                <i class="fa-solid fa-pen-to-square"></i> Edit
              </button>
              <teleport to="body">
                <div
                  v-if="editModalVisible"
                  id="categoryEdit"
                  class="modal fade"
                  data-backdrop="static"
                  data-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h2
                          class="modal-title fs-5 text-center text-primary"
                          id="staticBackdropLabel"
                        >
                          Edit category
                        </h2>
                        <button
                          @click="editModalVisible = false"
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          &times;
                        </button>
                      </div>
                      <div class="modal-body">
                        <label for="editCategory" class="form-label text-dark">Category Title</label>
                        <input
                          type="text"
                          v-model="editForm.category"
                          class="form-control"
                          id="editCategory"
                          aria-describedby="editCategory"
                          placeholder="Enter Category Title"
                        />
                        <div class="text-danger mt-2" v-if="errors.category">
                          {{ errors.category[0] }}
                        </div>
                      </div>
                      <div class="d-flex justify-content-end p-3">
                        <button
                          type="button"
                          @click="editModalVisible = false"
                          class="btn btn-secondary mr-3"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button @click="editSave" type="button" class="btn btn-primary">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </teleport>
              <button @click="deleteClicked(category.id)" class="btn btn-sm btn-danger">
                <i class="fa-solid fa-trash"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Category Edit Modal -->

      <div class="float-right">
        <Bootstrap5Pagination
          :limit="2"
          :data="reverseCategories"
          @pagination-change-page="getCategoryData"
        />
      </div>

      <!-- pagination to stay on the same page after updating a record -->
      <!-- <div class="float-right">
        <Bootstrap5Pagination :data="reverseCategories" :limit="2" @pagination-change-page="getCategoryData(currentPage)"></Bootstrap5Pagination>
      </div> -->
      
    </div>
  </div>
</template>

<script src="../../js/admin/categoryList.js"></script>
