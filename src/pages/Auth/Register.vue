<template>
  <q-page padding>
    <q-input
      filled
      v-model="signUp.name"
      label="Nombre"
      @blur="$v.signUp.name.$touch"
      @input="$v.signUp.name.$touch"
      :error="$v.signUp.name.$error"
    >
      <template v-slot:error>
        <div v-if="!$v.signUp.name.required">El nombre es requerido</div>
        <div v-if="!$v.signUp.name.minLength">El nombre es demasiado corto</div>
      </template>
    </q-input>

    <q-input
      filled
      v-model="signUp.email"
      label="Correo electrónico"
      @blur="$v.signUp.email.$touch"
      @input="$v.signUp.email.$touch"
      :error="$v.signUp.email.$error"
    >
      <template v-slot:error>
        <div v-if="!$v.signUp.email.required">El email es requerido</div>
        <div v-if="!$v.signUp.email.email">El email no es válido</div>
      </template>
    </q-input>

    <q-input
      filled
      type="password"
      v-model="signUp.password"
      label="Contraseña"
      @blur="$v.signUp.password.$touch"
      @input="$v.signUp.password.$touch"
      :error="$v.signUp.password.$error"
    >
      <template v-slot:error>
        <div v-if="!$v.signUp.password.required">La contraseña es requerida</div>
        <div v-if="!$v.signUp.password.minLength">La contraseña debe tener una longitud mayor o igual a 6</div>
      </template>
    </q-input>

    <q-btn
      class="full-width"
      color="red-9"
      icon-right="send"
      label="Registro"
      @click.native="submit"
    />
  </q-page>
</template>

<script>
  import { required, email, minLength } from 'vuelidate/lib/validators'
  import { mapActions } from 'vuex'

  export default {
    name: 'RegisterPage',
    data () {
      return {
        signUp: {
          name: 'User',
          email: 'user@g.com',
          password: ''
        }
      }
    },
    validations: {
      signUp: {
        email: { required, email },
        name: { required, minLength: minLength(2) },
        password: { required, minLength: minLength(6) },
      }
    },
    methods: {
      ...mapActions('auth', ['register']),
      submit () {
        this.$v.signUp.$touch();
        if (this.$v.signUp.$error) {
          this.$q.notify({
            message: 'Error validando el formulario',
            position: 'top',
            type: 'negative'
          })
        } else {
          this.$q.loading.show();

          this.register(this.signUp).then(res => {
            if (res.data.res === "ok") {
              this.$q.notify({
                message: res.data.message,
                position: 'top',
                type: 'positive'
              });

              this.$router.push('/login')
            } else {
              this.$q.notify({
                message: res.data.message,
                position: 'top',
                type: 'negative'
              })
            }
          }).catch(error => {
            this.$q.notify({
              message: error.message,
              position: 'top',
              type: 'negative'
            })
          }).finally(() => {
            this.$q.loading.hide();
          })
        }
      }
    }
  }
</script>
