<template>
  <div class="card">
    <div class="heading">
      <h2>Login</h2>
      <small>Kindly enter your details to log in </small>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form--field">
        <input
          v-model="email"
          type="text"
          name="email"
          id="email"
          required
        />
        <label alt="email" for="email" placeholder="email">Email Address</label>
        <small class="error">{{emailError}}</small>
      </div>
      <div class="form--field">
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
          required
        />
        <label alt="password" for="password" placeholder="password"
          >Password</label
        >
        <small class="error">{{passwordError}}</small>
      </div>
      <button class="btn">Log in</button>
    </form>
    <p>Forgot your password?</p>
    <small class="privacy"
      >Privacy Policy <span>and</span> Terms of services</small
    >
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { validatePassword, validateEmail} from '@/utils/Validators';
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const password = ref('')
    const email = ref('');
    const passwordError = ref('');
    const emailError = ref('');
    const formIsInValid = computed(() => emailError.value || passwordError.value );
    const router = useRouter();

    
    const handleSubmit = () => {

      if (formIsInValid.value || !email.value || !password.value) return

      router.replace({ name: 'Dashboard'})
    }

    watch(password, () => {
      if (password) {
        if (!validatePassword(password.value)) {
          passwordError.value ='Password must be more than 7 with at least a number, letter and special character '
        } else {
          passwordError.value = ""
        }
      }
    })

    watch(email, () => {
      if (email.value) {
        if (!validateEmail(email.value)) {
          emailError.value = "invalid email format"
        } else {
          emailError.value = ""
        }
      }
    })



    return { email, password, emailError, passwordError, formIsInValid, handleSubmit };
  },
});
</script>
<style scoped>
.card {
  width: 467px;
  height: 564px;
  background: #ffffff;
  border: 1px solid rgba(164, 167, 183, 0.3);
  border-radius: 8px;
  box-sizing: border-box;
  padding: 38px 66px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;
}

.error {
  color: red;
  font-size: 12px;
}

.heading h2 {
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  /* identical to box height, or 133% */

  color: #434854;
}

.heading small {
  font-weight: 100;
  font-size: 12px;
  line-height: 24px;
}

.card p {
  font-weight: 400;
  font-size: 14px;
  line-height: 12px;

  text-align: center;

  color: #0a74dc;
  cursor: pointer;
}

.card .privacy {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */

  text-align: center;
  text-decoration-line: underline;

  color: #303b54;
}

.privacy span {
  text-decoration-line: none;
  display: inline-block;
  color: rgba(0, 0, 0, 0.2);
  padding: 0 2px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

form .form--field {
  position: relative;
  box-sizing: border-box;
  float: left;
  margin: auto;
  padding: 0px;
  font-size: 1em;
}

.form--field > input {
  background: #ffffff;
  border: 1px solid #a4a7b7;
  border-radius: 4px;
  height: 45px;
  width: 335px;
  outline: none;
  padding: 10px;
  box-sizing: border-box;
}

.form--field > input:focus {
  border: 1px solid #0a74dc;
}

.form--field > label {
  font-size: 11px;
  line-height: 16px;
  color: #b0b9c8;
  width: auto;
  padding: 0px 0.5em 0px 0.5em;
  margin: 0px;
  background: white;
  transition: 0.2s ease-in-out;
  top: -5px;
  left: 2em;
  position: absolute;
}

form > button {
  width: 100%;
  height: 48px;
}

@media screen and (max-width: 575px) {
  .card {
    width: 100%;
  }
  .form--field {
    width: 100%;
  }

  .form--field > input {
    width: 100%;
  }
}

@media screen and (max-width: 375px) {
  .card {
    padding: 38px 10px;
  }
}
</style>
