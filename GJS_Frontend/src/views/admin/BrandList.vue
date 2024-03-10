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
                @keyup.enter="getBrandData"
              />
              <div class="input-group-append">
                <button @click="getBrandData" class="btn btn-primary" type="button">
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
          data-target="#brandCreate"
        >
          <i class="fas fa-plus-circle fa-lg text-whtie-50"></i> Add Brand
        </button>

        <!-- Brand Createe Modal -->
        <teleport to="body">
          <div
            v-if="createModalVisible"
            id="brandCreate"
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
                    Create new brand
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
                  <label for="addBrand" class="form-label text-dark">Brand Name</label>
                  <input
                    type="text"
                    v-model="createForm.brand"
                    class="form-control"
                    id="addBrand"
                    aria-describedby="addBrand"
                    placeholder="Enter Brand Name"
                  />
                  <div class="text-danger mt-2" v-if="errors.brand">
                    {{ errors.brand[0] }}
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
  
      <div class="shadow" v-else>
        <table class="table table-hover" v-if="reverseBrands">
          <thead class="bg-primary text-white">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col" class="col-2"></th>
            </tr>
          </thead>
  
          <tbody v-if="order == 'asc'">
            <tr v-for="(brand, index) in brands" :key="index">
              <td scope="col" class="align-middle">{{ brand.id }}</td>
              <td scope="col" class="align-middle">{{ brand.name }}</td>
              <td class="d-flex justify-content-between">
              <button id="editBtn"
              @click="editClicked(brand.id, brand.name)"
                class="btn btn-sm btn-success mr-2"
                data-toggle="modal"
                data-target="#brandEdit"
              >
                <i class="fa-solid fa-pen-to-square"></i> Edit
              </button>
              <teleport to="body">
                <div
                  v-if="editModalVisible"
                  id="brandEdit"
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
                          Edit Brand
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
                        <label for="editBrand" class="form-label text-dark">Brand Name</label>
                        <input
                          type="text"
                          v-model="editForm.brand"
                          class="form-control"
                          id="editBrand"
                          aria-describedby="editBrand"
                          placeholder="Enter Brand Name"
                        />
                        <div class="text-danger mt-2" v-if="errors.brand">
                          {{ errors.brand[0] }}
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
              <button @click="deleteClicked(brand.id)" class="btn btn-sm btn-danger">
                <i class="fa-solid fa-trash"></i> Delete
              </button>
            </td>
            </tr>
          </tbody>
  
          <tbody v-else>
            <tr v-for="(brand, index) in reverseBrands.data" :key="index">
              <td scope="col" class="align-middle">{{ brand.id }}</td>
              <td scope="col" class="align-middle">{{ brand.name }}</td>
              <td class="d-flex justify-content-between">
              <button id="editBtn"
              @click="editClicked(brand.id, brand.name)"
                class="btn btn-sm btn-success mr-2"
                data-toggle="modal"
                data-target="#brandEdit"
              >
                <i class="fa-solid fa-pen-to-square"></i> Edit
              </button>
              <teleport to="body">
                <div
                  v-if="editModalVisible"
                  id="brandEdit"
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
                          Edit Brand
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
                        <label for="editBrand" class="form-label text-dark">Brand Name</label>
                        <input
                          type="text"
                          v-model="editForm.brand"
                          class="form-control"
                          id="editBrand"
                          aria-describedby="editBrand"
                          placeholder="Enter Brand Name"
                        />
                        <div class="text-danger mt-2" v-if="errors.brand">
                          {{ errors.brand[0] }}
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
              <button @click="deleteClicked(brand.id)" class="btn btn-sm btn-danger">
                <i class="fa-solid fa-trash"></i> Delete
              </button>
            </td>
            </tr>
          </tbody>
        </table>

        <div  v-if="reverseBrands.data.length == 0">
          <div class="text-center py-5 h3 font-weight-bold ">There is no brand with {{ searchKey }}</div>
      </div>
  
        <div class="float-right">
          <Bootstrap5Pagination
            :limit="2"
            :data="reverseBrands"
            @pagination-change-page="getBrandData"
          />
        </div>
  
        <!-- pagination to stay on the same page after updating a record -->
        <!-- <Pagination :data="laravelData" :limit="1" @pagination-change-page="page => getResults(page, per_page, orderColumn, orderDirection)"></Pagination> -->
      </div>
    </div>
  </template>
  
  <script src="../../js/admin/brandList.js"></script>
  