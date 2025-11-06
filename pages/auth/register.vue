<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <form @submit.prevent="onSubmit" action="">
      <Card class="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle class="text-2xl"> Register </CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="username">Name</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your name"
                v-model="form.name"
              />
            </div>
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
          <Button type="submit" class="w-full"> Register </Button>

          <p class="text-sm">
            Already have an account?
            <NuxtLink
              to="/auth/login"
              class="border-b text-gray-500 text-muted-foreground hover:text-primary"
              >Login
            </NuxtLink>
          </p>
        </CardFooter>
      </Card>
    </form>
  </div>
</template>

<script setup lang="ts">
type registerForm = {
  password: string;
  email: string;
  name: string;
};

const form = ref<registerForm>({
  password: "",
  email: "",
  name: "",
});

const authenticate = () => {
  window.location.href = "/api/auth/github";
};

const onSubmit = async () => {
  try {
    console.log(form.value);

    $fetch("/api/auth/register", {
      method: "POST",
      body: form.value,
    });
    navigateTo("/");
  } catch (error) {
    console.log(error, "Error");
  }
};
</script>
