<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <form @submit.prevent="onSubmit" action="">
      <Card class="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle class="text-2xl"> Login </CardTitle>
          <CardDescription>
            Enter your information below to login your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                v-model="form.email"
                required
              />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                v-model="form.password"
                required
              />
            </div>
            <Button @click="authenticate" type="button" variant="outline">
              <div class="flex items-center">
                <Icon name="radix-icons:github-logo" class="mr-1"></Icon>
                Github
              </div>
            </Button>
          </div>
        </CardContent>

        <CardFooter class="flex-col space-y-2">
          <Button :disabled="isLoading" type="submit" class="w-full">
            Login
          </Button>

          <p class="text-sm">
            Dont have an account?
            <NuxtLink
              to="/auth/register"
              class="border-b text-gray-500 text-muted-foreground hover:text-primary"
              >Register
            </NuxtLink>
          </p>
        </CardFooter>
      </Card>
    </form>
  </div>
</template>

<script setup lang="ts">
const { showMessage, toggleLoading, isLoading, showError } = useStore();

type loginForm = {
  password: string;
  email: string;
};

const form = ref<loginForm>({
  password: "",
  email: "",
});

const authenticate = () => {
  window.location.href = "/api/auth/github";
};

const onSubmit = async () => {
  try {
    toggleLoading(true);

    await $fetch("/api/auth/login", {
      method: "POST",
      body: form.value,
    });
    showMessage({
      title: "Welcome Back :)",
      variant: "default",
    });

    window.location.href = "/";
  } catch (error) {
    const err = handleError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
};
</script>
