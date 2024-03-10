<style lang="scss">
@import '../../public/assets/vendor/fontawesome-free/css/all.min.css';
@import 'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i';
@import '../../public/assets/css/sb-admin-2.min.css';
</style>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row justify-content-center">
              <!-- <div class="col-lg-5 d-none d-lg-block bg-register-image"></div> -->
              <div class="col-lg-10">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                  </div>

                  <form class="user">
                    <div class="form-group">
                      <span class="text-danger ml-3" v-if="errors.user_name">{{
                        errors.user_name[0]
                      }}</span>
                      <input
                        v-model="form.user_name"
                        type="text"
                        class="form-control form-control-user"
                        id="exampleLastName"
                        placeholder="User Name"
                      />
                    </div>
                    <div class="form-group">
                      <span class="text-danger ml-3" v-if="errors.email">{{
                        errors.email[0]
                      }}</span>
                      <input
                        v-model="form.email"
                        type="email"
                        class="form-control form-control-user"
                        id="exampleInputEmail"
                        placeholder="Email Address"
                      />
                    </div>

                    <div class="form-group">
                      <span class="text-danger ml-3" v-if="errors.password">{{
                        errors.password[0]
                      }}</span>
                      <input
                        v-model="form.password"
                        type="password"
                        class="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                      />
                    </div>

                    <div class="form-group">
                      <span class="text-danger ml-3" v-if="errors.confirm_password">{{
                        errors.confirm_password[0]
                      }}</span>
                      <input
                        v-model="form.confirm_password"
                        type="password"
                        class="form-control form-control-user"
                        id="exampleRepeatPassword"
                        placeholder="Confirm Password"
                      />
                    </div>

                    <button
                      @click.prevent="registerAccount"
                      type="submit"
                      class="btn btn-primary btn-user btn-block"
                    >
                      Register Account
                    </button>

                    <hr />
                    <!-- <a href="index.html" class="btn btn-google btn-user btn-block">
                  <i class="fab fa-google fa-fw"></i> Register with Google
                </a>
                <a href="index.html" class="btn btn-facebook btn-user btn-block">
                  <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
                </a> -->
                  </form>
                  <!-- <hr /> -->
                  <div class="text-center">
                    <a style="text-decoration: none" class="small" href="forgot-password.html"
                      >Forgot Password?</a
                    >
                  </div>
                  <div class="text-center">
                    <router-link to="/login" class="nav-link"
                      ><span class="small">Already have an account? Login!</span></router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../js/register.js"></script>
