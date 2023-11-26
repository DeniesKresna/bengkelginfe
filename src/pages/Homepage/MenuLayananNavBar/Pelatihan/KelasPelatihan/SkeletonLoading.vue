<script setup>
</script>
<template>
  <div class="animate-pulse">
    <div class="px-4 sm:px-6 lg:mx-28 md:mx-20 pt-8 lg:pt-10 flex">
      <div class="text-black pl-10">
        <div class="font-bold text-2xl bg-gray-400 rounded-full h-4 w-20"></div>
        <div
          class="text-3xl font-bold bg-gray-400 rounded-full h-4 w-32 mt-2"
        ></div>
      </div>
    </div>
    <div class="justify-center px-4 sm:px-6 lg:mx-28 md:mx-20 flex">
      <div class="w-full sm:grid sm:grid-cols-1 lg:grid-cols-2 p-5">
        <div class="p-5">
          <div alt="" class="rounded-xl w-[752.5px] h-[501.91px] bg-gray-400" />
        </div>
        <div class="p-5">
          <div class="border-2 border-gray-300 p-10 rounded-xl">
            <div class="text-black">
              <div
                class="font-bold text-md text-3xl rounded-full bg-gray-400 h-4 w-20"
              ></div>
              <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                <button
                  class="mt-5 flex justify-center bg-gray-400 text-white p-2 rounded-xl text-sm text-center mx-2"
                >
                  <span class="my-auto"></span>
                </button>
                <button
                  class="mt-5 flex justify-center bg-gray-400 text-white p-2 rounded-xl text-sm text-center mx-2"
                >
                  <span class="loader"></span>
                </button>
                <button
                  class="mt-5 flex justify-center bg-gray-400 text-white p-2 rounded-xl text-sm text-center mx-2"
                >
                  <div class="my-auto"></div>
                  <div class="my-auto"></div>
                </button>
                <button
                  class="mt-5 flex justify-center bg-gray-400 text-white p-2 rounded-xl text-sm text-center mx-2"
                >
                  <div class="my-auto"></div>
                  <div class="my-auto"></div>
                </button>
              </div>
              <div class="mt-5">
                <div class="flex flex-wrap items-center gap-1">
                  <a class="space-x-1">
                    <div
                      class="inline-flex rounded-2xl px-4 py-1 my-1 border-[1px] bg-gray-400"
                    ></div>
                  </a>
                </div>
              </div>
              <div class="mt-5">
                <div
                  class="font-bold text-2xl bg-gray-400 rounded-full h-4 w-20"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="px-8 sm:px-6 lg:mx-28 md:mx-20 pt-8 lg:pt-10">
      <div class="flex justify-center">
        <div class="font-bold text-2xl bg-gray-400 w-60 h-4 rounded-full"></div>
      </div>
      <div class="mt-5"></div>
      <div class="font-bold text-2xl bg-gray-400 w-full h-4 rounded-full"></div>
    </div>
    <div class="px-8 sm:px-6 lg:mx-28 md:mx-20 pt-10 lg:pt-16">
      <div class="flex justify-center">
        <div class="font-bold text-2xl bg-gray-400 w-60 h-4 rounded-full"></div>
      </div>
      <div class="flex justify-center mt-9">
        <div
          class="w-3/5 grid justify-center grid-cols-1 lg:grid-cols-[repeat(2,max-content)] gap-8"
        >
          <div class="">
            <div alt="" class="rounded-full w-64 h-64 mx-auto bg-gray-400" />
          </div>
          <div class="text-center items-center xs:mt-5 md:mt-5 nama-expert">
            <div
              class="text-black font-bold text-xl bg-gray-400 rounded-full w-60 h-4"
            ></div>
            <div
              class="text-black font-bold text-xl bg-gray-400 rounded-full w-60 h-4 mt-2"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.nama-expert {
  align-self: center;
}

.bg-red-500.text-white {
  background-color: red;
  color: white;
}
</style>