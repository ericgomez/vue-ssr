<template>
  <q-page class="flex flex-center" style="background: radial-gradient(circle, #607d8b 0%, #1d1d1d 100%)">
    <q-card
      inline
      class="text-white q-pa-lg"
      style="width: 500px; background: radial-gradient(circle, #cfd8dc 0%, #e0f7fa 100%)"
    >
      <q-card-section v-if="user.name">
        <p class="text-h4 text-black">{{ user.name.toUpperCase() }}</p>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <q-input
          disable
          label="Correo electrónico"
          :value="email"
        />
        <q-input
          v-model="user.name"
          label="Nombre"
          @blur="$v.user.name.$touch"
          :error="$v.user.name.$error"
        />
        <q-input
          label="Contraseña"
          type="password"
          v-model="user.password"
          @blur="$v.user.password.$touch"
          :error="$v.user.password.$error"
        />
      </q-card-section>

      <q-card-actions>
        <q-btn
          class="full-width"
          color="black"
          icon-right="send"
          label="Actualizar datos"
          @click.native="submit"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import { protect } from "./../utils/auth";

export default {
  name: 'ProfilePage',
  preFetch ({store, redirect}) {
    console.log('PROFILE PAGE');
    // protect(redirect, !store.state.auth.logged, '/login');
  },
  meta: {
    title: 'Perfil de usuario'
  },
  mounted () {
    this.user.name = this.$store.state.auth.name;
  },
  data () {
    return {
      user: {
        name: '',
        password: ''
      }
    }
  },
  validations: {
    user: {
      name: { required, minLength: minLength(2) },
      password: { required, minLength: minLength(6) },
    }
  },
  computed: {
    ...mapState('auth', ['email'])
  },
  methods: {
    ...mapActions('auth', ['updateProfile']),
    submit () {
      this.$v.user.$touch();

      if (this.$v.user.$error) {
        this.$q.notify({
          message: 'Error validando el formulario',
          position: 'top',
          type: 'negative'
        });
        return;
      }

      this.$q.loading.show();

      this.updateProfile(this.user).then(res => {
        if (res.data.res === 'ok') {
          this.$store.commit('auth/setName', this.name, {root: true});
          this.$q.notify({
            message: res.data.message,
            position: 'top',
            type: 'positive'
          })
        }
      }).catch(err => {
        this.$q.notify({
          message: err.message,
          position: 'top',
          type: 'negative'
        })
      }).finally(() => {
        this.$q.loading.hide()
      })
    }
  }
}
</script>
