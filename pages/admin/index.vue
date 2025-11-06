<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <Heading title="Dashboard" description="Manage your store"> </Heading>
      <Separator />
      <div class="grid gap-4 grid-cols-3">
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium tracking-tight"
              >Total Revenue</CardTitle
            >
            <Icon
              name="lucide:dollar-sign"
              class="w-4 h-4 text-muted-foreground"
            />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ data.totalRevenue }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium tracking-tight"
              >Sales Count</CardTitle
            >
            <Icon
              name="lucide:credit-card"
              class="w-4 h-4 text-muted-foreground"
            />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <span v-if="data.salesCount > 0">+</span>{{ data.salesCount }}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium tracking-tight"
              >Products in Stock</CardTitle
            >
            <Icon name="lucide:package" class="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ data.stockCount }}</div>
          </CardContent>
        </Card>
      </div>
      <Card v-if="data.graphData" class="w-full">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent class="pl-2">
          <Overview :data="data?.graphData" />
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "admin",
});

const { data, status } = await useFetch("/api/admin/analytics", {
  lazy: true,
});
</script>
