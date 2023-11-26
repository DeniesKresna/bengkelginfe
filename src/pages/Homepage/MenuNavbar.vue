<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'
    
    const dropdownOpen = ref(false)
    const trigger = ref(null)
    const dropdown = ref(null)

   // close on click outside
const clickHandler = ({ target }) => {
    if (!dropdownOpen.value || dropdown.value.contains(target) || trigger.value.contains(target)) return
    dropdownOpen.value = false
}

// close if the esc key is pressed
const keyHandler = ({ keyCode }) => {
    if (!dropdownOpen.value || keyCode !== 27) return
    dropdownOpen.value = false
}

    onMounted(() => {
        document.addEventListener('click', clickHandler)
        document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
        document.removeEventListener('click', clickHandler)
        document.removeEventListener('keydown', keyHandler)
    })

</script>
<template>
    <div class="w-full md:block md:w-auto">
        <ul class="flex flex-col p-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li class="hidden md:block">
                <router-link to="/dashboard/car"
                    class="block py-2 pr-4 pl-3 text-black rounded hover:text-jobhunGreen md:p-0 duration-300">
                    Car</router-link>
            </li>
            <li class="hidden md:block">
                <router-link to="/dashboard/customer"
                    class="block py-2 pr-4 pl-3 text-black rounded hover:text-jobhunGreen md:p-0 duration-300">
                    Customer</router-link>
            </li>
            <li class="hidden md:block">
                <router-link to="/dashboard/execution"
                    class="block py-2 pr-4 pl-3 text-black rounded hover:text-jobhunGreen md:p-0 duration-300">
                    Execution</router-link>
            </li>
            <li class="hidden md:block">
                <router-link to="/dashboard/user"
                    class="block py-2 pr-4 pl-3 text-black rounded hover:text-jobhunGreen md:p-0 duration-300">
                    User</router-link>
            </li>
        </ul>
    </div>
</template>