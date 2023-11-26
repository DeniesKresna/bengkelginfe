<template>
    <div class="dots-bars-3"></div>
</template>
<style>
.dots-bars-3 {
    width: 40px;
    height: 26px;
    --c: linear-gradient(black 0 0);
    background:
        var(--c) 0 100%,
        var(--c) 50% 100%,
        var(--c) 100% 100%;
    background-size: 8px calc(100% - 4px);
    background-repeat: no-repeat;
    position: relative;
}

.dots-bars-3:before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: black;
    left: 0;
    top: 0;
    animation:
        db3-1 1.5s linear infinite alternate,
        db3-2 0.75s cubic-bezier(0, 200, .8, 200) infinite;
}


@keyframes db3-1 {
    100% {
        left: calc(100% - 8px)
    }
}

@keyframes db3-2 {
    100% {
        top: -0.1px
    }
}</style>