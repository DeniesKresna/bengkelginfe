<script setup>
import {ROLE_ADMIN} from "../../utils/Constants"
const props = defineProps({
    module: {
        type: String,
        required: true
    },
    noCreate: {
        type: Boolean,
        default: false
    },
    withFilter: {
        type: Boolean,
        default: false
    },
    withDownload: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(["onTriggerCreate","onTriggerFilter","onDownloadFilter"])

const roleName = localStorage.getItem("role_name")

</script>
<template>
    <div class="sm:flex sm:justify-between sm:items-center mb-5">
        <div class="mb-4 sm:mb-0">
            <!-- <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Bidang ✨</h1> -->
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                <a
                    href="#"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                    <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">
                    {{ props.module }} ✨
                    </h1>
                </a>
                </li>
            </ol>
        </div>
        <div
            v-if="withFilter"
            class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end"
            >
            <button
                class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                @click="emit('onTriggerFilter')"
            >
                <svg
                class="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16"
                >
                <path
                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
                />
                </svg>
                <span class="hidden xs:block ml-2">Filter {{ module }}</span>
            </button>
        </div>
        <div
            v-if="withDownload"
            class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end"
            >
            <button
                class="btn bg-orange-500 hover:bg-orange-600 text-white"
                @click="emit('onDownloadFilter')"
            >
                <svg
                class="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16"
                >
                <path
                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
                />
                </svg>
                <span class="hidden xs:block ml-2">Download {{ module }}</span>
            </button>
        </div>
        <div
            v-if="roleName == ROLE_ADMIN && !noCreate"
            class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
            >
            <button
                class="btn bg-emerald-500 hover:bg-emerald-600 text-white"
                @click="emit('onTriggerCreate')"
            >
                <svg
                class="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16"
                >
                <path
                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
                />
                </svg>
                <span class="hidden xs:block ml-2">Create {{ module }}</span>
            </button>
        </div>
    </div>
</template>