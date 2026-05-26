(() => {
    const counterEl = document.getElementById("counter-current");
    const initialView = document.getElementById("initial-view");
    const successView = document.getElementById("success-view");
    const userNumberEl = document.getElementById("user-number");
    const joinButton = document.getElementById("join-button");

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

    async function fetchCount() {
        const res = await fetch("/api/count");
        const { count } = await res.json();
        return count;
    }

    async function joinExperiment() {
        const res = await fetch("/api/join", { method: "POST" });
        if (!res.ok) throw new Error(`server error ${res.status}`);
        return res.json(); // { number }
    }

    async function init() {
        try {
            const count = await fetchCount();
            renderCounter(count);
        } catch {
            // счётчик не критичен
        }
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
