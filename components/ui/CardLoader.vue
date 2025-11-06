<template>
  <Card>
    <CardContent class="py-6">
      <div class="grid gap-4 p-2 w-full">
        <div class="relative w-full flex justify-center">
          <Skeleton
            class="h-[200px] w-[90%] rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse"
          />
        </div>

        <div class="flex flex-col w-full space-y-2 mt-2">
          <Skeleton
            class="h-4 w-[80%] bg-gray-300 dark:bg-gray-700 animate-pulse"
          />
          <Skeleton
            class="h-4 w-[60%] bg-gray-300 dark:bg-gray-700 animate-pulse"
          />
        </div>
      </div>
    </CardContent>

    <CardFooter class="border-t p-4 w-full flex items-center justify-center">
      <Skeleton
        class="h-4 w-[200px] bg-gray-300 dark:bg-gray-700 animate-pulse"
      />
    </CardFooter>
  </Card>
</template>

<style scoped>
@keyframes pulse {
  0% {
    background-color: rgb(209, 213, 219); /* Light gray */
  }
  50% {
    background-color: rgb(229, 231, 235); /* Slightly darker */
  }
  100% {
    background-color: rgb(209, 213, 219); /* Light gray */
  }
}

.animate-pulse {
  animation: pulse 1.5s infinite ease-in-out;
}
</style>
