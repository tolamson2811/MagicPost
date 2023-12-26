<template>
    <teleport to="body">
        <div
            v-if="show"
            @click="tryClose"
            class="backdrop fixed left-0 top-0 z-50 h-screen w-full"
        ></div>
        <transition name="dialog">
            <div
                class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center"
                v-if="show"
            >
                <dialog
                    open
                    class="flex flex-col items-center justify-between gap-4 rounded-lg p-2"
                >
                    <header
                        class="flex w-full items-center justify-between text-sm font-bold text-sky-900 md:text-base lg:text-lg"
                    >
                        <div></div>
                        <slot name="header">
                            <h2>{{ title }}</h2>
                        </slot>
                        <font-awesome-icon
                            icon="fa-solid fa-xmark"
                            class="hover:cursor-pointer hover:text-sky-950"
                            @click="tryExit"
                        />
                    </header>
                    <section
                        class="text-center text-xs text-sky-900 md:text-sm lg:text-base"
                    >
                        <slot></slot>
                    </section>
                    <menu>
                        <slot name="actions">
                            <button
                                @click="tryClose"
                                class="rounded-lg bg-green-300 p-2 text-xs text-green-900 hover:bg-green-400 md:text-sm lg:text-base"
                            >
                                Xác nhận
                            </button>
                        </slot>
                    </menu>
                </dialog>
            </div>
        </transition>
    </teleport>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    emits: ["close", "exit"],
    methods: {
        tryClose() {
            this.$emit("close");
        },
        tryExit() {
            this.$emit("exit");
        },
    },
};
</script>

<style scoped>
.backdrop {
    background-color: rgba(0, 0, 0, 0.75);
}

.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

.dialog-enter-to,
.dialog-leave-from {
    opacity: 1;
    transform: scale(1);
}

.dialog-enter-active {
    transition: all 0.3s ease-out;
}

.dialog-leave-active {
    transition: all 0.3s ease-in;
}
</style>
