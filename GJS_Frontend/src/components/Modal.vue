<template>
  <div>
    <div>
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
                <h2 class="modal-title fs-5 text-center text-primary" id="staticBackdropLabel">Create new category</h2>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >&times;</button>
              </div>
              <slot></slot>
            </div>
          </div>
        </div>
        </div>
</template>

<script>
export default{
    name: 'Modal',
    props:{
      show:{
        type: Boolean,
      }
    },
    data() {
        return {
            
        }
    },
    methods:{
    }
}
</script>