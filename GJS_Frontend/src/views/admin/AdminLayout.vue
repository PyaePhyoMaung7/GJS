<style lang="scss">
@import '../../../public/assets/vendor/fontawesome-free/css/all.min.css';
@import 'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i';
@import '../../../public/assets/css/sb-admin-2.min.css';
</style>

<template>
  <div>
    <!-- Page Wrapper -->
    <Head>
      <title>Dashboard</title>
    </Head>
    <div id="wrapper">
      <!-- Sidebar -->
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
          </div>
          <div class="sidebar-brand-text mx-3">GJS Admin</div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0" />

        <!-- Nav Item - Dashboard -->

        <li class="nav-item active">
          <router-link to="/admin/dashboard" class="nav-link">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></router-link
          >
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider my-0" />
        <!-- Heading -->
        <!-- <div class="sidebar-heading">Users</div> -->

        <li class="nav-item">
          <router-link to="/admin/user/list" class="nav-link">
            <i class="fas fa-fw fa-user"></i>
            <span>Users</span></router-link
          >
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider my-0" />

        <li class="nav-item">
          <router-link to="/admin/category/list" class="nav-link">
            <i class="fas fa-fw fa-list"></i>
            <span>Categories</span></router-link
          >
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider my-0" />

        <li class="nav-item">
          <router-link to="/admin/product/list" class="nav-link">
            <i class="fas fa-fw fa-gem"></i>
            <span>Products</span></router-link
          >
        </li>

        <hr class="sidebar-divider my-0" />

        <li class="nav-item">
          <router-link to="/admin/order/list" class="nav-link">
            <i class="fas fa-fw fa-file-invoice"></i>
            <span>Orders</span></router-link
          >
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider my-0" />

        <li class="nav-item">
          <router-link to="/admin/material/list" class="nav-link">
            <i class="fas fa-fw fa-layer-group"></i>
            <span>Materials</span></router-link
          >
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider my-0" />

        <li class="nav-item">
          <router-link to="/admin/brand/list" class="nav-link">
            <i class="fas fa-fw fa-tag"></i>
            <span>Brands</span></router-link
          >
        </li>

        <hr class="sidebar-divider my-0" />
        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i class="fas fa-fw fa-folder"></i>
            <span>Pages</span>
          </a>
          <div
            id="collapsePages"
            class="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Login Screens:</h6>
              <a class="collapse-item" href="login.html">Login</a>
              <a class="collapse-item" href="register.html">Register</a>
              <a class="collapse-item" href="forgot-password.html">Forgot Password</a>
              <div class="collapse-divider"></div>
              <h6 class="collapse-header">Other Pages:</h6>
              <a class="collapse-item" href="404.html">404 Page</a>
              <a class="collapse-item" href="blank.html">Blank Page</a>
            </div>
          </div>
        </li>

        <!-- Nav Item - Charts -->
        <li class="nav-item">
          <a class="nav-link" href="charts.html">
            <i class="fas fa-fw fa-chart-area"></i>
            <span>Charts</span></a
          >
        </li>

        <!-- Nav Item - Tables -->
        <li class="nav-item">
          <a class="nav-link" href="tables.html">
            <i class="fas fa-fw fa-table"></i>
            <span>Tables</span></a
          >
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block" />

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
          <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

        <!-- Sidebar Message -->
        <div class="sidebar-card d-none d-lg-flex">
          <img
            class="sidebar-card-illustration mb-2"
            src="../assets/img/undraw_rocket.svg"
            alt="..."
          />
          <p class="text-center mb-2">
            <strong>SB Admin Pro</strong> is packed with premium features, components, and more!
          </p>
          <a class="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro"
            >Upgrade to Pro!</a
          >
        </div>
      </ul>
      <!-- End of Sidebar -->

      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <!-- Topbar -->
          <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <!-- Sidebar Toggle (Topbar) -->
            <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
              <i class="fa fa-bars"></i>
            </button>

            <!-- Topbar Search -->
            <transition name="title" mode="out-in">
              <h1 v-if="title" class="h3 font-weight-bold ml-md-2 mb-0 text-gray-800">
                {{ title }}
              </h1>
            </transition>

            <!-- Topbar Navbar -->
            <ul class="navbar-nav ml-auto">
              <!-- Nav Item - Search Dropdown (Visible Only XS) -->
              <li class="nav-item dropdown no-arrow d-sm-none">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="searchDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-search fa-fw"></i>
                </a>
                <!-- Dropdown - Messages -->
                <div
                  class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                  aria-labelledby="searchDropdown"
                >
                  <form class="form-inline mr-auto w-100 navbar-search">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control bg-light border-0 small"
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
                </div>
              </li>

              <!-- Nav Item - Alerts -->
              <li class="nav-item dropdown no-arrow mx-1">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="alertsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-bell fa-fw"></i>
                  <!-- Counter - Alerts -->
                  <span class="badge badge-danger badge-counter">3+</span>
                </a>
                <!-- Dropdown - Alerts -->
                <div
                  class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="alertsDropdown"
                >
                  <h6 class="dropdown-header">Alerts Center</h6>
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <div class="mr-3">
                      <div class="icon-circle bg-primary">
                        <i class="fas fa-file-alt text-white"></i>
                      </div>
                    </div>
                    <div>
                      <div class="small text-gray-500">December 12, 2019</div>
                      <span class="font-weight-bold"
                        >A new monthly report is ready to download!</span
                      >
                    </div>
                  </a>
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <div class="mr-3">
                      <div class="icon-circle bg-success">
                        <i class="fas fa-donate text-white"></i>
                      </div>
                    </div>
                    <div>
                      <div class="small text-gray-500">December 7, 2019</div>
                      $290.29 has been deposited into your account!
                    </div>
                  </a>
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <div class="mr-3">
                      <div class="icon-circle bg-warning">
                        <i class="fas fa-exclamation-triangle text-white"></i>
                      </div>
                    </div>
                    <div>
                      <div class="small text-gray-500">December 2, 2019</div>
                      Spending Alert: We've noticed unusually high spending for your account.
                    </div>
                  </a>
                  <a class="dropdown-item text-center small text-gray-500" href="#"
                    >Show All Alerts</a
                  >
                </div>
              </li>

              <!-- Nav Item - Messages -->
              <li class="nav-item dropdown no-arrow mx-1">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="messagesDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-envelope fa-fw"></i>
                  <!-- Counter - Messages -->
                  <span class="badge badge-danger badge-counter">7</span>
                </a>
                <!-- Dropdown - Messages -->
                <div
                  class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="messagesDropdown"
                >
                  <h6 class="dropdown-header">Message Center</h6>
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <div class="dropdown-list-image mr-3">
                      <img
                        class="rounded-circle"
                        src="../assets/img/undraw_profile_1.svg"
                        alt="..."
                      />
                      <div class="status-indicator bg-success"></div>
                    </div>
                    <div class="font-weight-bold">
                      <div class="text-truncate">
                        Hi there! I am wondering if you can help me with a problem I've been having.
                      </div>
                      <div class="small text-gray-500">Emily Fowler · 58m</div>
                    </div>
                  </a>
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <div class="dropdown-list-image mr-3">
                      <img
                        class="rounded-circle"
                        src="../assets/img/undraw_profile_2.svg"
                        alt="..."
                      />
                      <div class="status-indicator"></div>
                    </div>
                    <div>
                      <div class="text-truncate">
                        I have the photos that you ordered last month, how would you like them sent
                        to you?
                      </div>
                      <div class="small text-gray-500">Jae Chun · 1d</div>
                    </div>
                  </a>
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <div class="dropdown-list-image mr-3">
                      <img
                        class="rounded-circle"
                        src="../assets/img/undraw_profile_3.svg"
                        alt="..."
                      />
                      <div class="status-indicator bg-warning"></div>
                    </div>
                    <div>
                      <div class="text-truncate">
                        Last month's report looks great, I am very happy with the progress so far,
                        keep up the good work!
                      </div>
                      <div class="small text-gray-500">Morgan Alvarez · 2d</div>
                    </div>
                  </a>
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <div class="dropdown-list-image mr-3">
                      <img
                        class="rounded-circle"
                        src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                        alt="..."
                      />
                      <div class="status-indicator bg-success"></div>
                    </div>
                    <div>
                      <div class="text-truncate">
                        Am I a good boy? The reason I ask is because someone told me that people say
                        this to all dogs, even if they aren't good...
                      </div>
                      <div class="small text-gray-500">Chicken the Dog · 2w</div>
                    </div>
                  </a>
                  <a class="dropdown-item text-center small text-gray-500" href="#"
                    >Read More Messages</a
                  >
                </div>
              </li>

              <div class="topbar-divider d-none d-sm-block"></div>

              <!-- Nav Item - User Information -->
              <li class="nav-item dropdown no-arrow">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="mr-2 d-none d-lg-inline text-gray-600 small text-uppercase">{{
                    this.$store.getters.getUserInfo.name
                  }}</span>
                  <img v-if="this.$store.getters.getUserInfo.image == null"
                    class="img-profile rounded-circle"
                    src='http://localhost:8000/profile_images/default_images/default_user_photo.jpg'
                    
                  />
                  <img v-else
                    class="img-profile rounded-circle"
                    :src="
                      'http://localhost:8000/profile_images/' +
                      this.$store.getters.getUserInfo.image
                    "
                  />
                </a>
                <!-- Dropdown - User Information -->
                <div
                  class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown"
                >
                  <button
                    @click="profileModalVisible = true"
                    class="dropdown-item"
                    data-toggle="modal"
                    data-target="#profileModal"
                  >
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Profile
                  </button>

                  <teleport to="body">
                    <div
                      v-if="profileModalVisible"
                      id="profileModal"
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
                              Admin Profile
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
                                          <img
                                            ref="ProfileImage"
                                            id="profileImage"
                                            :src="
                                              'http://localhost:8000/profile_images/' +
                                              profile.image
                                            "
                                            alt=" "
                                          />
                                        </div>
                                        <div class="content">
                                          <div class="icon text-center">
                                            <i class="fas fa-cloud-upload-alt text-primary"></i>
                                          </div>
                                          <div class="text">No file chosen, yet</div>
                                        </div>
                                        <div
                                          @click="profileCancelBtnClicked"
                                          id="cancel-btn"
                                          ref="cancelBtn"
                                        >
                                          <i class="fas fa-times text-primary"></i>
                                        </div>
                                        <div
                                          class="file-name bg-primary text-center"
                                          id="profile-file-name"
                                        >
                                          File name here
                                        </div>
                                      </div>
                                      <input
                                        type="file"
                                        id="profile-default-btn"
                                        ref="editDefaultBtn"
                                        @change="profileFileSelected"
                                        hidden
                                      />
                                      <button
                                        type="button"
                                        class="btn btn-primary"
                                        @click="profileDefaultBtnActivate"
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
                                  <!-- name -->
                                  <div class="form-group">
                                    <label for="name" class="form-label text-dark">User Name</label>
                                    <input
                                      type="text"
                                      v-model="profile.name"
                                      class="form-control"
                                      id="name"
                                      placeholder="Enter Your Name"
                                    />
                                    <div class="text-danger mt-2" v-if="errors.name">
                                      {{ errors.name[0] }}
                                    </div>
                                  </div>

                                  <!-- email -->
                                  <div class="form-group">
                                    <label for="email" class="form-label text-dark"
                                      >Email Address</label
                                    >
                                    <input
                                      type="email"
                                      v-model="profile.email"
                                      class="form-control"
                                      id="email"
                                      placeholder="Enter Email Address"
                                      disabled
                                    />
                                    <div class="text-danger mt-2" v-if="errors.email">
                                      {{ errors.email[0] }}
                                    </div>
                                  </div>

                                  <!-- phone -->
                                  <div class="form-group">
                                    <label for="phone" class="form-label text-dark"
                                      >Phone Number</label
                                    >
                                    <input
                                      type="number"
                                      v-model="profile.phone"
                                      class="form-control"
                                      id="phone"
                                      placeholder="Enter Phone Number"
                                    />
                                    <div class="text-danger mt-2" v-if="errors.phone">
                                      {{ errors.phone[0] }}
                                    </div>
                                  </div>

                                  <!-- role and gender -->
                                  <div class="d-flex d-sm-block d-lg-flex justify-content-between">
                                    <!-- category -->
                                    <div class="form-group">
                                      <label for="role" class="form-label text-dark">Role</label>
                                      <input
                                        type="text"
                                        v-model="profile.role"
                                        class="form-control"
                                        id="phone"
                                        placeholder="Your Role"
                                        disabled
                                      />

                                      <div class="text-danger mt-2" v-if="errors.role">
                                        {{ errors.role[0] }}
                                      </div>
                                    </div>

                                    <!-- gender -->
                                    <div class="form-group">
                                      <label for="brand" class="form-label text-dark">Gender</label>
                                      <select
                                        v-model="profile.gender"
                                        class="form-select form-control"
                                        aria-label="Default select example"
                                      >
                                        <option value="male" class="bg-white text-secondary">
                                          Male
                                        </option>
                                        <option value="female" class="bg-white text-secondary">
                                          Female
                                        </option>
                                      </select>

                                      <div class="text-danger mt-2" v-if="errors.gender">
                                        {{ errors.gender[0] }}
                                      </div>
                                    </div>
                                  </div>

                                  <!-- descripton -->
                                  <div class="form-group">
                                    <label for="address" class="form-label text-dark"
                                      >Address</label
                                    >
                                    <textarea
                                      v-model="profile.address"
                                      name=""
                                      id="address"
                                      class="form-control"
                                      rows="3"
                                      placeholder="Enter Address"
                                    ></textarea>
                                    <div class="text-danger mt-2" v-if="errors.address">
                                      {{ errors.address[0] }}
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
                            <button @click="profileSave" type="button" class="btn btn-primary">
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </teleport>

                  <a class="dropdown-item" href="#">
                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Settings
                  </a>
                  <button
                    id="passwordBtn"
                    @click="passwordClicked()"
                    class="dropdown-item"
                    data-toggle="modal"
                    data-target="#passwordModal"
                  >
                    <i class="fas fa-key fa-sm fa-fw mr-2 text-gray-400"></i>
                    Password
                  </button>

                  <teleport to="body">
                    <div
                      v-if="passwordModalVisible"
                      id="passwordModal"
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
                              Password
                            </h2>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              &times;
                            </button>
                          </div>
                          <div class="modal-body">
                            <!-- old Password -->
                            <div class="form-group">
                              <div class="d-flex justify-content-between">
                                <label for="oldPassword" class="form-label text-dark"
                                >Old Password</label
                              >  <span @click="passwordToggle" class="password-toggle-icon"><i class="fas fa-eye-slash"></i></span>
                              </div>
                             
                              <input
                                type="password"
                                v-model="passwordForm.oldPassword"
                                class="form-control old-password password"
                                id="oldPassword"
                                aria-describedby="old Password"
                                placeholder="Enter Old Password"
                              />
                              <div class="text-danger mt-2" v-if="errors.oldPassword">
                                {{ errors.oldPassword[0] }}
                              </div>
                            </div>

                            <!-- New Password -->
                            <div class="form-group">
                              <label for="newPassword" class="form-label text-dark"
                                >New Password</label
                              >
                              <input
                                type="password"
                                v-model="passwordForm.newPassword"
                                class="form-control password"
                                id="newPassword"
                                aria-describedby="new Password"
                                placeholder="Enter New Password"
                              />
                              <div class="text-danger mt-2" v-if="errors.newPassword">
                                {{ errors.newPassword[0] }}
                              </div>
                            </div>

                            <!-- Confirm Password -->
                            <div class="form-group">
                              <label for="confirmPassword" class="form-label text-dark"
                                >Confirm Password</label
                              >
                              <input
                                type="password"
                                v-model="passwordForm.confirmPassword"
                                class="form-control password"
                                id="confirmPassword"
                                aria-describedby="confirm Password"
                                placeholder="Enter New Password Again"
                              />
                              <div class="text-danger mt-2" v-if="errors.confirmPassword">
                                {{ errors.confirmPassword[0] }}
                              </div>
                            </div>
                          </div>
                          <div class="d-flex justify-content-end p-3">
                            <button
                              type="button"
                              class="btn btn-secondary mr-3"
                              data-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button @click="passwordSave" type="button" class="btn btn-primary">
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </teleport>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </nav>
          <!-- Topbar End -->

          <!-- route components switch here -->
          <router-view v-slot="{ Component }">
            <transition name="view" mode="out-in">
              <keep-alive>
                <component :is="Component"></component>
              </keep-alive>
            </transition>
          </router-view>
        </div>

        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright &copy; Your Website 2021</span>
            </div>
          </div>
        </footer>
        <!-- End of Footer -->
      </div>

      <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            Select "Logout" below if you are ready to end your current session.
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <button class="btn btn-primary" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.view-enter-from {
  opacity: 0;
  transform: translateY(100px);
}
.view-enter-active {
  transition: all 0.3s ease-out;
}
.view-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
.view-leave-active {
  transition: all 0.3s ease-out;
}
.title-enter-from,
.title-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
.title-enter-active,
.title-leave-active {
  transition: all 0.3s ease-out;
}
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

<script src="../../js/admin/adminLayout.js"></script>
