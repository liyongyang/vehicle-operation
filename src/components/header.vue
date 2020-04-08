<template>
  <el-menu :default-active="activeIndex2"
           class="el-menu-demo"
           mode="horizontal"
           @select="handleSelect"
           background-color="#0747a6"
           text-color="#fff"
           active-text-color="#ffd04b">
    <div class="headerbar">
      <!-- LOGO -->
      <div class="headerbar-left">
        <a href="/"
           class="logo"><img alt="Logo"
               src="../assets/images/logo.png" />
          <span>测试运维部门</span></a>
      </div>

      <nav class="navbar-custom">
        <ul class="list-inline float-right mb-0">
          <li class="list-inline-item dropdown notif">
            <a class="nav-link dropdown-toggle arrow-none"
               data-toggle="dropdown"
               href="#"
               role="button"
               aria-haspopup="false"
               aria-expanded="false">
              <i class="el-icon-message"></i><span class="notif-bullet"></span>
            </a>
            <div class="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-arrow-success dropdown-lg">
              <!-- item-->
              <div class="dropdown-item noti-title">
                <h5>
                  <small><span class="label label-danger pull-xs-right">12</span>Contact Messages</small>
                </h5>
              </div>

              <!-- item-->
              <a href="#"
                 class="dropdown-item notify-item">
                <p class="notify-details ml-0">
                  <b>Jokn Doe</b>
                  <span>New message received</span>
                  <small class="text-muted">2 minutes ago</small>
                </p>
              </a>

              <!-- All-->
              <a href="#"
                 class="dropdown-item notify-item notify-all">
                View All
              </a>
            </div>
          </li>

          <li class="list-inline-item dropdown notif">
            <a class="nav-link dropdown-toggle arrow-none"
               data-toggle="dropdown"
               href="#"
               role="button"
               aria-haspopup="false"
               aria-expanded="false">
              <i class="el-icon-message-solid"></i><span class="notif-bullet"></span>
            </a>
            <div class="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-lg">
              <!-- item-->
              <div class="dropdown-item noti-title">
                <h5>
                  <small><span class="label label-danger pull-xs-right">5</span>Allerts</small>
                </h5>
              </div>

              <!-- item-->
              <a href="#"
                 class="dropdown-item notify-item">
                <div class="notify-icon bg-faded">
                  <img src="../assets/images/avatars/avatar2.png"
                       alt="img"
                       class="rounded-circle img-fluid" />
                </div>
                <p class="notify-details">
                  <b>John Doe</b>
                  <span>User registration</span>
                  <small class="text-muted">3 minutes ago</small>
                </p>
              </a>

              <!-- All-->
              <a href="#"
                 class="dropdown-item notify-item notify-all">
                View All Allerts
              </a>
            </div>
          </li>

          <li class="list-inline-item dropdown notif">
            <a class="nav-link dropdown-toggle nav-user"
               data-toggle="dropdown"
               href="#"
               role="button"
               aria-haspopup="false"
               aria-expanded="false">
              <img src="../assets/images/avatars/admin.png"
                   alt="Profile image"
                   class="avatar-rounded" />
            </a>
            <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
              <!-- item-->
              <div class="dropdown-item noti-title">
                <h5 class="text-overflow">
                  <small>Hello, 这里是测试运维部</small>
                </h5>
              </div>

              <!-- item-->
              <a href="#"
                 class="dropdown-item notify-item">
                <i class="fa fa-power-off"></i> <span>Logout</span>
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    getVehicle_id (value) {
      console.log(this.value)
    }
  }
}
</script>

<style scoped>
@import "../assets/style.css";
</style>
