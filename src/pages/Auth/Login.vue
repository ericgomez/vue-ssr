<template>
  <q-page padding>
    <q-input
      filled
      v-model="user.email"
      label="Email"
      @blur="$v.user.email.$touch"
      @input="$v.user.email.$touch"
      :error="$v.user.email.$error"
    >
      <template v-slot:error>
        <div v-if="!$v.user.email.required">El email es requerido</div>
        <div v-if="!$v.user.email.email">El email no es válido</div>
      </template>
    </q-input>

    <q-input
      filled
      type="password"
      v-model="user.password"
      label="Contraseña"
      @blur="$v.user.password.$touch"
      @input="$v.user.password.$touch"
      :error="$v.user.password.$error"
    >
      <template v-slot:error>
        <div v-if="!$v.user.password.required">La contraseña es requerida</div>
      </template>
    </q-input>

    <q-btn
      class="full-width"
      color="red-9"
      icon-right="send"
      label="Inicia sesión"
      @click.native="submit"
    />
  </q-page>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions, mapMutations } from 'vuex'
import {protect} from "../../utils/auth";

export default {
  name: 'LoginPage',
  preFetch({store, redirect}) {
    console.log("LOGIN PAGE PREFETCH");
    // in preFetch perdemos el contexto de this
    protect(redirect, store.state.auth.logged, '/blog/profile');
  },
  data () {
    return {
      user: {
        email: 'admin@m.com',
        password: 'secret'
      }
    }
  },
  meta () {
    return {
      title: "Iniciar sesión",
      meta: [
        { name: "description", content: "Descripción del inicio de sesión" },
        { name: "keywords", content: "login, iniciar sesión" }
      ]
    }
  },
  validations: {
    user: {
      email: { required, email },
      password: { required }
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    ...mapMutations('auth', ['setUser']),
    submit () {
      this.$v.user.$touch();

      if (this.$v.user.$error) {
        // notify is plugin of quasar to messages
        this.$q.notify({
          message: 'Error validando el formulario',
          position: 'top',
          type: 'negative'
        })
      } else {
        // loading is plugin of quasar to preloader
        this.$q.loading.show();

        // execute directly vuex action login
        this.login(this.user)
          .then(res => {
            console.log('res', res);
            if (res.data.res === 'ok') {
              this.$q.notify({
                message: `Bienvenido de nuevo <span style="color: red">${res.data.userJSON.name}</span>`,
                position: 'bottom',
                color: 'green',
                html: true
              });

              // execute directly vuex mutation setUser
              this.setUser({user: res.data.userJSON, logged: true});

              this.$router.push('/blog/profile')
            } else {
              this.$q.notify({
                message: res.data.message,
                position: 'top',
                type: 'negative'
              })
            }
          })
          .catch(error => {
            this.$q.notify({
              message: error.message,
              position: 'top',
              type: 'negative'
            })
          })
          .finally(() => {
            // hide loading
            this.$q.loading.hide();
          })
      }
    }
  }
}
</script>
