<!-- ~/components/UiModal.vue -->
<template>
    <teleport to="body">
        <transition name="ui-modal-fade" @after-leave="afterLeave">
            <div v-if="modelValue" class="fixed inset-0 z-75 flex items-center justify-center" aria-modal="true"
                role="dialog" @keydown.esc="onEsc">
                <!-- backdrop -->
                <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="onBackdropClick"></div>

                <!-- panel -->
                <div ref="panel"
                    class="relative z-10 w-full max-w-2xl mx-4 rounded-xl bg-white dark:bg-slate-800 shadow-lg overflow-hidden"
                    :class="panelClasses" @click.stop>
                    <!-- header -->
                    <header class="flex items-center justify-between px-4 py-3 border-b dark:border-slate-700">
                        <div class="flex items-center gap-3">
                            <slot name="header">
                                <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100">
                                    {{ title }}
                                </h3>
                            </slot>
                        </div>

                        <div class="flex items-center gap-2">
                            <slot name="header-actions"></slot>
                            <button v-if="closable" @click="close" type="button"
                                class="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="Close">
                                <svg class="w-5 h-5 text-slate-600 dark:text-slate-300" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </header>

                    <!-- body -->
                    <div class="p-4">
                        <slot />
                    </div>

                    <!-- footer -->
                    <footer class="px-4 py-3 border-t dark:border-slate-700 flex items-center justify-end gap-2">
                        <slot name="footer">
                            <button @click="close" class="px-3 py-1 rounded text-sm">Close</button>
                        </slot>
                    </footer>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: '' },
    closable: { type: Boolean, default: true },
    closeOnBackdrop: { type: Boolean, default: true },
    closeOnEsc: { type: Boolean, default: true },
    trapFocus: { type: Boolean, default: true },
    panelClasses: { type: [String, Object, Array], default: '' }
})

const emit = defineEmits(['update:modelValue', 'open', 'close'])
const panel = ref<HTMLElement | null>(null)
let previouslyFocused: Element | null = null

function open() {
    emit('update:modelValue', true)
    emit('open')
}

function close() {
    emit('update:modelValue', false)
    emit('close')
}

function onBackdropClick() {
    if (props.closeOnBackdrop) close()
}

function onEsc(e: KeyboardEvent) {
    if (!props.closeOnEsc) return
    // esc handled via @keydown.esc on container
    // extra safety:
    if (e.key === 'Escape') close()
}

function afterLeave() {
    // restore focus
    if (previouslyFocused && (previouslyFocused as HTMLElement).focus) {
        ; (previouslyFocused as HTMLElement).focus()
    }
}

watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            // store previous focused element
            previouslyFocused = document.activeElement
            // set focus to first focusable inside panel
            if (props.trapFocus) {
                setTimeout(() => {
                    focusFirstInPanel()
                }, 50)
            }
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }
)

function focusFirstInPanel() {
    if (!panel.value) return
    const focusableSelector = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(',')
    const el = panel.value.querySelector<HTMLElement>(focusableSelector)
    if (el) el.focus()
    else panel.value.focus()
}

/* optional: prevent focus escape (simple trap)
   For complex focus trap, use focus-trap library.
*/
function onFocusIn(e: FocusEvent) {
    if (!props.trapFocus || !panel.value) return
    if (!panel.value.contains(e.target as Node)) {
        // bring focus back
        focusFirstInPanel()
    }
}

onMounted(() => {
    document.addEventListener('focusin', onFocusIn)
})

onBeforeUnmount(() => {
    document.removeEventListener('focusin', onFocusIn)
})
</script>

<style scoped>
.ui-modal-fade-enter-active,
.ui-modal-fade-leave-active {
    transition: all 160ms ease;
}

.ui-modal-fade-enter-from {
    opacity: 0;
    transform: translateY(6px) scale(0.995);
}

.ui-modal-fade-enter-to {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.ui-modal-fade-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.ui-modal-fade-leave-to {
    opacity: 0;
    transform: translateY(6px) scale(0.995);
}
</style>
