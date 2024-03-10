<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <form
        v-on:submit.prevent="onSubmit"
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
            @keyup.enter="getProductData"
          />
          <div class="input-group-append">
            <button @click="getProductData" class="btn btn-primary" type="button">
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
          data-target="#productCreate"
        >
          <i class="fas fa-plus-circle fa-lg text-whtie-50"></i> Add Product
        </button>
        <teleport to="body">
          <div
            v-if="createModalVisible"
            id="productCreate"
            class="modal fade"
            data-backdrop="static"
            data-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h2 class="modal-title fs-5 text-center text-primary" id="staticBackdropLabel">
                    Create new product
                  </h2>
                  <button
                    @click="modalCancel"
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
                <div class="modal-body">
                  <form action="">
                    <div class="d-sm-flex">
                      <div class="left-form col-sm-6 col-lg-5 col-">
                        <!-- image -->
                        <div class="form-group">
                          <label for="default-btn" class="form-label text-dark">Image</label>
                          <div class="container p-0">
                            <div class="wrapper" ref="wrapper">
                              <div class="image">
                                <img ref="productImage" src="" alt=" " />
                              </div>
                              <div class="content">
                                <div class="icon text-center">
                                  <i class="fas fa-cloud-upload-alt text-primary"></i>
                                </div>
                                <div class="text">No file chosen, yet</div>
                              </div>
                              <div @click="cancelBtnClicked" id="cancel-btn" ref="cancelBtn">
                                <i class="fas fa-times text-primary"></i>
                              </div>
                              <div class="file-name bg-primary text-center" ref="fileName">
                                File name here
                              </div>
                            </div>
                            <input
                              type="file"
                              id="default-btn"
                              ref="defaultBtn"
                              @change="fileSelected"
                              hidden
                            />
                            <button
                              class="btn btn-primary"
                              @click.prevent="$refs.defaultBtn.click()"
                              id="custom-btn"
                            >
                              Choose file
                            </button>
                          </div>

                          <div class="text-danger mt-2" v-if="errors.image">
                            {{ errors.image[0] }}
                          </div>
                        </div>
                      </div>
                      <div class="right-form col-sm-6 offset-lg-1">
                        <!-- title -->
                        <div class="form-group">
                          <label for="title" class="form-label text-dark">Product Title</label>
                          <input
                            type="text"
                            v-model="createForm.title"
                            class="form-control"
                            id="title"
                            placeholder="Enter product title"
                          />
                          <div class="text-danger mt-2" v-if="errors.title">
                            {{ errors.title[0] }}
                          </div>
                        </div>

                        <!-- descripton -->
                        <div class="form-group">
                          <label for="description" class="form-label text-dark">Description</label>
                          <textarea
                            v-model="createForm.description"
                            name=""
                            id="description"
                            class="form-control"
                            rows="3"
                            placeholder="Enter product description"
                          ></textarea>
                          <div class="text-danger mt-2" v-if="errors.description">
                            {{ errors.description[0] }}
                          </div>
                        </div>

                        <!-- category and brand -->
                        <div class="d-flex d-sm-block d-lg-flex justify-content-between">
                          <!-- category -->
                          <div class="form-group">
                            <label for="category" class="form-label text-dark">Category</label>
                            <select
                              v-model="createForm.category"
                              class="form-select form-control"
                              aria-label="Default select example"
                            >
                              <option :value="null" class="bg-white text-secondary">
                                Choose Category
                              </option>
                              <option
                                v-for="(category, index) in categories"
                                :key="index"
                                :value="category.id"
                              >
                                {{ category.name }}
                              </option>
                            </select>

                            <div class="text-danger mt-2" v-if="errors.category">
                              {{ errors.category[0] }}
                            </div>
                          </div>

                          <!-- brand -->
                          <div class="form-group">
                            <label for="brand" class="form-label text-dark">Brand</label>
                            <select
                              v-model="createForm.brand"
                              class="form-select form-control"
                              aria-label="Default select example"
                            >
                              <option :value="null" class="bg-white text-secondary">
                                Choose Brand
                              </option>
                              <option
                                v-for="(brand, index) in brands"
                                :key="index"
                                :value="brand.id"
                              >
                                {{ brand.name }}
                              </option>
                            </select>

                            <div class="text-danger mt-2" v-if="errors.brand">
                              {{ errors.brand[0] }}
                            </div>
                          </div>
                        </div>

                        <!-- price -->
                        <div class="form-group">
                          <label for="price" class="form-label text-dark">Price</label>
                          <input
                            type="number"
                            v-model="createForm.price"
                            class="form-control"
                            id="price"
                            placeholder="Enter product price"
                          />
                          <div class="text-danger mt-2" v-if="errors.price">
                            {{ errors.price[0] }}
                          </div>
                        </div>

                        <!-- instock -->
                        <div class="form-group">
                          <label for="instock" class="form-label text-dark">Instock</label>
                          <input
                            type="number"
                            v-model="createForm.instock"
                            class="form-control"
                            id="instock"
                            placeholder="Enter instock quantity"
                          />
                          <div class="text-danger mt-2" v-if="errors.instock">
                            {{ errors.instock[0] }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="d-flex justify-content-end p-3">
                  <button
                    type="button"
                    @click="modalCancel"
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
      <table class="table table-hover" v-if="reverseProducts">
        <thead class="bg-primary text-white text-center">
          <tr>
            <th scope="col">ID</th>
            <th scope="col" class="" width="150px">Name</th>
            <!-- <th scope="col">Category</th>
            <th scope="col">Brand</th> -->
            <th scope="col" class="col-2">Image</th>
            <th scope="col" class="">Price</th>
            <th scope="col">Instock</th>
            <th scope="col">Views</th>
            <th scope="col" class="" width="180px"></th>
          </tr>
        </thead>

        <tbody v-if="order == 'asc'" class="text-center">
          <tr v-for="(product, index) in products" :key="index">
            <td scope="col" class="align-middle">{{ product.id }}</td>
            <td scope="col" class="align-middle">{{ product.name }}</td>
            <td class="align-middle" scope="col">
              <div class="col-10 offset-1" style="height: 80px">
                <a :href="'http://localhost:8000/products/' + product.image" target="_blank">
                  <img
                    loading="lazy"
                    class="w-100 h-100 rounded"
                    :src="'http://localhost:8000/products/' + product.image"
                    alt=""
                    style="object-fit: cover"
                  />
                </a>
              </div>
            </td>
            <td scope="col" class="align-middle">{{ product.price }}</td>
            <td scope="col" class="align-middle">{{ product.instock }}</td>
            <td scope="col" class="align-middle">{{ product.view_count }}</td>
            <td class="align-middle">
              <div class="d-flex justify-content-between">
                <button
                  id="editBtn"
                  @click="editClicked(product.id, product.name, product.image, product.description, product.category_id, product.brand_id, product.price, product.instock)"
                  class="btn btn-sm btn-success mr-2"
                  data-toggle="modal"
                  data-target="#productEdit"
                >
                  <i class="fa-solid fa-pen-to-square"></i> Edit
                </button>
                <teleport to="body">
                  <div
                    v-if="editModalVisible"
                    id="productEdit"
                    class="modal fade"
                    data-backdrop="static"
                    data-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-lg">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h2
                            class="modal-title fs-5 text-center text-primary"
                            id="staticBackdropLabel"
                          >
                            Edit product
                          </h2>
                          <button
                            @click="modalCancel"
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            &times;
                          </button>
                        </div>
                        <div class="modal-body">
                          <form action="">
                            <div class="d-sm-flex">
                              <div class="left-form col-sm-6 col-lg-5 col-">
                                <!-- image -->
                                <div class="form-group">
                                  <label for="default-btn" class="form-label text-dark"
                                    >Image</label
                                  >
                                  <div class="container p-0">
                                    <div class="wrapper" id="editWrapper" ref="editWrapper">
                                      <div class="image">
                                        <img ref="ProductImage" id="editProductImage" :src="'http://localhost:8000/products/' + productImage" alt=" " />
                                      </div>
                                      <div class="content">
                                        <div class="icon text-center">
                                          <i class="fas fa-cloud-upload-alt text-primary"></i>
                                        </div>
                                        <div class="text">No file chosen, yet</div>
                                      </div>
                                      <div
                                        @click="editCancelBtnClicked"
                                        id="cancel-btn"
                                        ref="cancelBtn"
                                      >
                                        <i class="fas fa-times text-primary"></i>
                                      </div>
                                      <div class="file-name bg-primary text-center" id="edit-file-name">
                                        File name here
                                      </div>
                                    </div>
                                    <input
                                      type="file"
                                      id="edit-default-btn"
                                      ref="editDefaultBtn"
                                      @change="editFileSelected"
                                      hidden
                                   
                                    />
                                    <button
                                    type="button"
                                      class="btn btn-primary"
                                      @click="editDefaultBtnActivate"
                                      id="custom-btn"
                                    >
                                      Choose file
                                    </button>
                                  </div>

                                  <div class="text-danger mt-2" v-if="errors.image">
                                    {{ errors.image[0] }}
                                  </div>
                                </div>
                              </div>
                              <div class="right-form col-sm-6 offset-lg-1">
                                <!-- title -->
                                <div class="form-group">
                                  <label for="title" class="form-label text-dark"
                                    >Product Title</label
                                  >
                                  <input
                                    type="text"
                                    v-model="editForm.title"
                                    class="form-control"
                                    id="title"
                                    placeholder="Enter product title"
                                  />
                                  <div class="text-danger mt-2" v-if="errors.title">
                                    {{ errors.title[0] }}
                                  </div>
                                </div>

                                <!-- descripton -->
                                <div class="form-group">
                                  <label for="description" class="form-label text-dark"
                                    >Description</label
                                  >
                                  <textarea
                                    v-model="editForm.description"
                                    name=""
                                    id="description"
                                    class="form-control"
                                    rows="3"
                                    placeholder="Enter product description"
                                  ></textarea>
                                  <div class="text-danger mt-2" v-if="errors.description">
                                    {{ errors.description[0] }}
                                  </div>
                                </div>

                                <!-- category and brand -->
                                <div class="d-flex d-sm-block d-lg-flex justify-content-between">
                                  <!-- category -->
                                  <div class="form-group">
                                    <label for="category" class="form-label text-dark"
                                      >Category</label
                                    >
                                    <select
                                      v-model="editForm.category"
                                      class="form-select form-control"
                                      aria-label="Default select example"
                                    >
                                      <option :value="null" class="bg-white text-secondary">
                                        Choose Category
                                      </option>
                                      <option
                                        v-for="(category, index) in categories"
                                        :key="index"
                                        :value="category.id"
                                      >
                                        {{ category.name }}
                                      </option>
                                    </select>

                                    <div class="text-danger mt-2" v-if="errors.category">
                                      {{ errors.category[0] }}
                                    </div>
                                  </div>

                                  <!-- brand -->
                                  <div class="form-group">
                                    <label for="brand" class="form-label text-dark">Brand</label>
                                    <select
                                      v-model="editForm.brand"
                                      class="form-select form-control"
                                      aria-label="Default select example"
                                    >
                                      <option :value="null" class="bg-white text-secondary">
                                        Choose Brand
                                      </option>
                                      <option
                                        v-for="(brand, index) in brands"
                                        :key="index"
                                        :value="brand.id"
                                      >
                                        {{ brand.name }}
                                      </option>
                                    </select>

                                    <div class="text-danger mt-2" v-if="errors.brand">
                                      {{ errors.brand[0] }}
                                    </div>
                                  </div>
                                </div>

                                <!-- price -->
                                <div class="form-group">
                                  <label for="price" class="form-label text-dark">Price</label>
                                  <input
                                    type="number"
                                    v-model="editForm.price"
                                    class="form-control"
                                    id="price"
                                    placeholder="Enter product price"
                                  />
                                  <div class="text-danger mt-2" v-if="errors.price">
                                    {{ errors.price[0] }}
                                  </div>
                                </div>

                                <!-- instock -->
                                <div class="form-group">
                                  <label for="instock" class="form-label text-dark">Instock</label>
                                  <input
                                    type="number"
                                    v-model="editForm.instock"
                                    class="form-control"
                                    id="instock"
                                    placeholder="Enter instock quantity"
                                  />
                                  <div class="text-danger mt-2" v-if="errors.instock">
                                    {{ errors.instock[0] }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div class="d-flex justify-content-end p-3">
                          <button
                            type="button"
                            @click="modalCancel"
                            class="btn btn-secondary mr-3"
                            data-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <button @click="editSave" type="button" class="btn btn-primary">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </teleport>
                <button @click="deleteClicked(product.id)" class="btn btn-sm btn-danger">
                  <i class="fa-solid fa-trash"></i> Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody class="text-center" v-else>
          <tr v-for="(product, index) in reverseProducts.data" :key="index">
            <td class="align-middle" scope="col">{{ product.id }}</td>
            <td class="align-middle" scope="col">{{ product.name }}</td>
            <td class="align-middle" scope="col">
              <div class="col-10 offset-1" style="height: 80px">
                <a :href="'http://localhost:8000/products/' + product.image" target="_blank">
                  <img
                    loading="lazy"
                    class="w-100 h-100 rounded"
                    :src="'http://localhost:8000/products/' + product.image"
                    alt=""
                    style="object-fit: cover"
                  />
                </a>
              </div>
            </td>
            <td class="align-middle" scope="col">{{ product.price }}</td>
            <td class="align-middle" scope="col">{{ product.instock }}</td>
            <td class="align-middle" scope="col">{{ product.view_count }}</td>
            <td class="align-middle">
              <div class="d-flex justify-content-between">
                <button
                  id="editBtn"
                  @click="editClicked(product.id, product.name, product.image, product.description, product.category_id, product.brand_id, product.price, product.instock)"
                  class="btn btn-sm btn-success mr-2"
                  data-toggle="modal"
                  data-target="#productEdit"
                >
                  <i class="fa-solid fa-pen-to-square"></i> Edit
                </button>
                <teleport to="body">
                  <div
                    v-if="editModalVisible"
                    id="productEdit"
                    class="modal fade"
                    data-backdrop="static"
                    data-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-lg">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h2
                            class="modal-title fs-5 text-center text-primary"
                            id="staticBackdropLabel"
                          >
                            Edit product
                          </h2>
                          <button
                            @click="modalCancel"
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            &times;
                          </button>
                        </div>
                        <div class="modal-body">
                          <form action="">
                            <div class="d-sm-flex">
                              <div class="left-form col-sm-6 col-lg-5 col-">
                                <!-- image -->
                                <div class="form-group">
                                  <label for="default-btn" class="form-label text-dark"
                                    >Image</label
                                  >
                                  <div class="container p-0">
                                    <div class="wrapper" id="editWrapper" ref="editWrapper">
                                      <div class="image">
                                        <img ref="ProductImage" id="editProductImage" :src="'http://localhost:8000/products/' + productImage" alt=" " />
                                      </div>
                                      <div class="content">
                                        <div class="icon text-center">
                                          <i class="fas fa-cloud-upload-alt text-primary"></i>
                                        </div>
                                        <div class="text">No file chosen, yet</div>
                                      </div>
                                      <div
                                        @click="editCancelBtnClicked"
                                        id="cancel-btn"
                                        ref="cancelBtn"
                                      >
                                        <i class="fas fa-times text-primary"></i>
                                      </div>
                                      <div class="file-name bg-primary text-center" id="edit-file-name">
                                        File name here
                                      </div>
                                    </div>
                                    <input
                                      type="file"
                                      id="edit-default-btn"
                                      ref="editDefaultBtn"
                                      @change="editFileSelected"
                                      hidden
                                   
                                    />
                                    <button
                                    type="button"
                                      class="btn btn-primary"
                                      @click="editDefaultBtnActivate"
                                      id="custom-btn"
                                    >
                                      Choose file
                                    </button>
                                  </div>

                                  <div class="text-danger mt-2" v-if="errors.image">
                                    {{ errors.image[0] }}
                                  </div>
                                </div>
                              </div>
                              <div class="right-form col-sm-6 offset-lg-1">
                                <!-- title -->
                                <div class="form-group">
                                  <label for="title" class="form-label text-dark"
                                    >Product Title</label
                                  >
                                  <input
                                    type="text"
                                    v-model="editForm.title"
                                    class="form-control"
                                    id="title"
                                    placeholder="Enter product title"
                                  />
                                  <div class="text-danger mt-2" v-if="errors.title">
                                    {{ errors.title[0] }}
                                  </div>
                                </div>

                                <!-- descripton -->
                                <div class="form-group">
                                  <label for="description" class="form-label text-dark"
                                    >Description</label
                                  >
                                  <textarea
                                    v-model="editForm.description"
                                    name=""
                                    id="description"
                                    class="form-control"
                                    rows="3"
                                    placeholder="Enter product description"
                                  ></textarea>
                                  <div class="text-danger mt-2" v-if="errors.description">
                                    {{ errors.description[0] }}
                                  </div>
                                </div>

                                <!-- category and brand -->
                                <div class="d-flex d-sm-block d-lg-flex justify-content-between">
                                  <!-- category -->
                                  <div class="form-group">
                                    <label for="category" class="form-label text-dark"
                                      >Category</label
                                    >
                                    <select
                                      v-model="editForm.category"
                                      class="form-select form-control"
                                      aria-label="Default select example"
                                    >
                                      <option :value="null" class="bg-white text-secondary">
                                        Choose Category
                                      </option>
                                      <option
                                        v-for="(category, index) in categories"
                                        :key="index"
                                        :value="category.id"
                                      >
                                        {{ category.name }}
                                      </option>
                                    </select>

                                    <div class="text-danger mt-2" v-if="errors.category">
                                      {{ errors.category[0] }}
                                    </div>
                                  </div>

                                  <!-- brand -->
                                  <div class="form-group">
                                    <label for="brand" class="form-label text-dark">Brand</label>
                                    <select
                                      v-model="editForm.brand"
                                      class="form-select form-control"
                                      aria-label="Default select example"
                                    >
                                      <option :value="null" class="bg-white text-secondary">
                                        Choose Brand
                                      </option>
                                      <option
                                        v-for="(brand, index) in brands"
                                        :key="index"
                                        :value="brand.id"
                                      >
                                        {{ brand.name }}
                                      </option>
                                    </select>

                                    <div class="text-danger mt-2" v-if="errors.brand">
                                      {{ errors.brand[0] }}
                                    </div>
                                  </div>
                                </div>

                                <!-- price -->
                                <div class="form-group">
                                  <label for="price" class="form-label text-dark">Price</label>
                                  <input
                                    type="number"
                                    v-model="editForm.price"
                                    class="form-control"
                                    id="price"
                                    placeholder="Enter product price"
                                  />
                                  <div class="text-danger mt-2" v-if="errors.price">
                                    {{ errors.price[0] }}
                                  </div>
                                </div>

                                <!-- instock -->
                                <div class="form-group">
                                  <label for="instock" class="form-label text-dark">Instock</label>
                                  <input
                                    type="number"
                                    v-model="editForm.instock"
                                    class="form-control"
                                    id="instock"
                                    placeholder="Enter instock quantity"
                                  />
                                  <div class="text-danger mt-2" v-if="errors.instock">
                                    {{ errors.instock[0] }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div class="d-flex justify-content-end p-3">
                          <button
                            type="button"
                            @click="modalCancel"
                            class="btn btn-secondary mr-3"
                            data-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <button @click="editSave" type="button" class="btn btn-primary">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </teleport>
                <button @click="deleteClicked(product.id)" class="btn btn-sm btn-danger">
                  <i class="fa-solid fa-trash"></i> Delete
                </button>
              </div>
            </td>

            <!-- brand goes here -->
          </tr>
        </tbody>
      </table>

      <div v-if="reverseProducts.data.length == 0">
        <div class="text-center py-5 h3 font-weight-bold">
          There is no product with {{ searchKey }}
        </div>
      </div>

      <div class="float-right">
        <Bootstrap5Pagination
          :limit="2"
          :data="reverseProducts"
          @pagination-change-page="getProductData"
        />
      </div>

      <!-- pagination to stay on the same page after updating a record -->
      <!-- <Pagination :data="laravelData" :limit="1" @pagination-change-page="page => getResults(page, per_page, orderColumn, orderDirection)"></Pagination> -->
    </div>
  </div>
</template>

<style>
.container .wrapper {
  position: relative;
  height: 265px;
  width: 100%;
  border-radius: 10px;
  background: #fff;
  border: 2px dashed #c2cdda;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.wrapper.active {
  border: none;
}
.wrapper.active:hover #cancel-btn {
  display: block;
}
.wrapper #cancel-btn:hover {
  /* color: #e74c3c; */
  transform: scale(1.2);
  transition: 0.5s;
}
.wrapper.active:hover .file-name {
  display: block;
}
.wrapper .image {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper .image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.wrapper .image img[alt]:after {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: #fff;
  font-family: 'Helvetica';
  font-weight: 300;
  line-height: 2;
  text-align: center;
  content: attr(alt);
}
.wrapper .icon {
  font-size: 100px;
  /* color: #9658fe; */
}
.wrapper .text {
  font-size: 18px;
  font-weight: 500;
  color: #5b5b7b;
}
.wrapper #cancel-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 25px;
  cursor: pointer;
  /* color: #9658fe; */
  display: none;
  transition: 0.5s;
}
.wrapper .file-name {
  position: absolute;
  bottom: 0px;
  width: 100%;
  color: #fff;
  padding: 8px 0;
  font-size: 18px;
  /* background: linear-gradient(135deg, #3a8ffe 0%, #9658fe 100%); */
  display: none;
}
.container #custom-btn {
  margin-top: 30px;
  width: 100%;
  height: 50px;
  display: block;
  outline: none;
  border: none;
  border-radius: 25px;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
}
</style>

<script src="../../js/admin/productList.js"></script>
