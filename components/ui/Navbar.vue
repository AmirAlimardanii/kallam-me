<template>
  <header class="border-b z-10">
    <div class="flex items-center h-16 px-4 justify-between">
      <NuxtLink to="/">
        <img
          src="../../public/logo.svg"
          alt="logo"
          class="cursor-pointer h-[30px]"
        />
      </NuxtLink>
      <nav class="flex items-center space-x-3 lg:space-x-6">
        <template v-if="user">
          <DropdownMenu v-if="user.role === 'ADMIN'">
            <DropdownMenuTrigger as-child>
              <Button variant="secondary" class="relative">
                Admin
                <Icon name="lucide:chevron-down" class="w-4 h-4 ml-1 mt-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56" align="end">
              <DropdownMenuGroup>
                <NuxtLink to="/admin">
                  <DropdownMenuItem> Analytics </DropdownMenuItem>
                </NuxtLink>
                <DropdownMenuSeparator />

                <NuxtLink to="/admin/products">
                  <DropdownMenuItem> Products </DropdownMenuItem>
                </NuxtLink>

                <NuxtLink to="/admin/categories">
                  <DropdownMenuItem> Categories </DropdownMenuItem>
                </NuxtLink>

                <NuxtLink to="/admin/sizes">
                  <DropdownMenuItem> Sizes </DropdownMenuItem>
                </NuxtLink>

                <NuxtLink to="/admin/colors">
                  <DropdownMenuItem> Colors </DropdownMenuItem>
                </NuxtLink>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="icon" class="relative h-8 w-8">
                <Icon name="lucide:user" class="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56" align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>{{ user.name }}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem @click="logout">
                  <Icon name="lucide:log-out" class="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </template>

        <NuxtLink to="/cart">
          <Button class="relative rounded-full px-4 h-10 -pb-1">
            <Icon name="lucide:shopping-bag" class="w-4 h-4 mx-2" />
            ({{ items && items.length ? items.length : 0 }})
          </Button>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession();
const { items } = useCart();
const logout = async () => {
  await clear();
  navigateTo("/auth/login");
};
</script>
