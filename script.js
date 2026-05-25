(() => {
    const TOTAL = 100000;

    const counterEl = document.getElementById("counter-current");
    const initialView = document.getElementById("initial-view");
    const successView = document.getElementById("success-view");
    const userNumberEl = document.getElementById("user-number");
    const joinButton = document.getElementById("join-button");

    // --- Backend stubs ----------------------------------------------------
    // Заглушки. Позже заменим на реальные вызовы к API + платёжный шлюз.

    async function fetchParticipantCount() {
        // TODO: GET /api/count → { count: number }
        return 0;
    }

    async function joinExperiment() {
        // TODO: POST /api/join → редирект на оплату → webhook → { number: int }
        return { number: Math.max(1, Math.floor(Math.random() * 100000)) };
    }

    // --- View helpers -----------------------------------------------------

    function formatNumber(value) {
        return String(value).padStart(6, "0");
    }

    function renderCounter(value) {
        counterEl.textContent = new Intl.NumberFormat("ru-RU").format(value);
    }

    function showSuccess(number) {
        initialView.classList.add("content--hidden");
        successView.classList.remove("content--hidden");
        successView.setAttribute("aria-hidden", "false");
        userNumberEl.textContent = `№ ${formatNumber(number)}`;
    }

    // --- Init -------------------------------------------------------------

    async function init() {
        const count = await fetchParticipantCount();
        renderCounter(count);
    }

    joinButton.addEventListener("click", async () => {
        joinButton.disabled = true;
        joinButton.textContent = "Подождите…";
        try {
            const { number } = await joinExperiment();
            showSuccess(number);
        } catch (err) {
            console.error(err);
            joinButton.disabled = false;
            joinButton.textContent = "Стать частью этого — 10 ₽";
        }
    });

    init();
})();
