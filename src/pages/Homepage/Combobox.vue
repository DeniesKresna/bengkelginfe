<script setup>
    import { ref, computed } from 'vue'
    import {
        Combobox,
        ComboboxInput,
        ComboboxButton,
        ComboboxOptions,
        ComboboxOption,
        TransitionRoot,
    } from '@headlessui/vue'
    import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

    const props = defineProps({
        bidangs: {
            type: Object,
            required: true
        }
    })

    const { bidangs } = props   

    let selected = ref(bidangs[0])
    let query = ref('')

    let filteredBidangs = computed(() =>
        query.value === ''
            ? bidangs
            : bidangs.filter((bidang) =>
                bidang.title
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.value.toLowerCase().replace(/\s+/g, ''))
            )
    )
</script>
<template>
    <div class="relative inline-flex mr-3">
        <Combobox v-model="selected">
            <div class="relative mt-1">
                <div
                    class="cursor-default  rounded-md text-left shadow sm:text-sm md:w-48 sm:w-48 xs:w-48">
                    <ComboboxInput
                        class="rounded-md text-sm focus:outline-none focus:bg-white border border-slate-200 focus:border-jobhunGreen hover:border-slate-300 md:w-48 sm:w-48 xs:w-48"
                        :displayValue="(bidang) => bidang.title" @change="query = $event.target.value" />
                    <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </ComboboxButton>
                </div>
                <!-- <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0"
                    @after-leave="query = ''"> -->
                    <transition enter-active-class="transition ease-out duration-200 transform" enter-from-class="opacity-0 -translate-y-2"
                        enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-out duration-200"
                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <ComboboxOptions
                        class="absolute z-10 border border-slate-200 origin-top-right top-full mt-5 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg sm:text-sm">
                        <div v-if="filteredBidangs.length === 0 && query !== ''"
                            class="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nothing found.
                        </div>

                        <ComboboxOption v-for="bidang in filteredBidangs" as="template" :key="bidang.id" :value="bidang"
                            v-slot="{ selected, active }">
                            <li class="relative cursor-default select-none py-2 pl-10 pr-4" :class="{
                                'bg-jobhunGreen text-white': active,
                                'text-black': !active,
                            }">
                                <span class="block truncate"
                                    :class="{ 'font-medium': selected, 'font-normal': !selected }">
                                    {{ bidang.title }}
                                </span>
                                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3"
                                    :class="{ 'text-white': active, 'text-jobhunGreen': !active }">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ComboboxOption>
                    </ComboboxOptions>
                <!-- </TransitionRoot> -->
                </transition>
            </div>
        </Combobox>
    </div>
</template>