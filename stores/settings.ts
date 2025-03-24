export const useSettingsStore = defineStore('settings', {
    state: () => ({
        difficulty: ref(0),
        fieldSize: ref(0)
    }),
})