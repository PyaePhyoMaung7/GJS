<style lang="scss">
@import '../../public/assets//vendor/fontawesome-free/css/all.min.css';
@import 'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i';
@import '../../public/assets/css/sb-admin-2.min.css';
</style>
<template>
  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-md-8">
        <!-- col-xl-10 col-lg-12  -->
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row d-flex justify-content-center">
              <!-- <div class="col-lg-6 d-none d-lg-block bg-login-image"></div> -->
              <div class="col-lg-10">
                <div class="p-5">
                  <div class="row">
                    <h1 class="col-8 text-right h4 text-gray-900 mb-4">Welcome Back!</h1>
                    <div v-if="loading" class="offset-1 text-primary">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                  <div v-if="errors.fail" class="text-center mb-4">
                    <span class="h5 text-danger">{{ errors.fail[0] }}</span>
                  </div>
                  <form class="user">
                    <div class="form-group">
                      <span class="text-danger ml-3" v-if="errors.email">{{
                        errors.email[0]
                      }}</span>
                      <input
                        v-model="form.email"
                        type="email"
                        class="form-control form-control-user"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
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
                      <div class="custom-control custom-checkbox small">
                        <input type="checkbox" class="custom-control-input" id="customCheck" />
                        <label class="custom-control-label" for="customCheck">Remember Me</label>
                      </div>
                    </div>
                    <button
                      @click.prevent="login"
                      type="submit"
                      class="btn btn-primary btn-user btn-block"
                    >
                      Log in
                    </button>
                    <hr />
                    <!-- <a href="index.html" class="btn btn-google btn-user btn-block">
                      <i class="fab fa-google fa-fw"></i> Login with Google
                    </a>
                    <a href="index.html" class="btn btn-facebook btn-user btn-block">
                      <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                    </a> -->
                  </form>
                  <hr />
                  <div class="text-center">
                    <a style="text-decoration: none" class="small" href="forgot-password.html"
                      >Forgot Password?</a
                    >
                  </div>
                  <div class="text-center">
                    <router-link to="/register" class="nav-link"
                      ><span class="small">Create an Account!</span></router-link
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

<script src="../js/login.js"></script>
