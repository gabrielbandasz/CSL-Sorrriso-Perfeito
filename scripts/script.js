/* ================= FORMULÁRIO ================= */
const form = document.getElementById("form-contato");
const mensagemErro = document.getElementById("mensagemErro");

if (form && mensagemErro) {

   form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const mensagem = document.getElementById("mensagem")?.value.trim();

    if (!nome || !email || !mensagem) {
        mensagemErro.style.color = "red";
        mensagemErro.textContent = "Por favor, preencha todos os campos.";
        return;
    }

    // 🔥 some o formulário
    form.style.display = "none";

    // 🔥 mostra mensagem de sucesso
    const sucesso = document.getElementById("mensagemSucesso");
    sucesso.style.display = "block";
});

}


/* ================= VIA CEP ================= */
const cepInput = document.getElementById("cep");

if (cepInput) {

    cepInput.addEventListener("blur", function () {

        const cep = this.value.replace(/\D/g, "");

        if (cep.length !== 8) {
            mostrarMensagem("CEP inválido.", "red");
            return;
        }

        mostrarMensagem("Buscando endereço...", "#ccc");

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {

                if (data.erro) {
                    mostrarMensagem("CEP não encontrado.", "red");
                    return;
                }

                document.getElementById("rua").value = data.logradouro || "";
                document.getElementById("bairro").value = data.bairro || "";
                document.getElementById("cidade").value = data.localidade || "";
                document.getElementById("estado").value = data.uf || "";

                mostrarMensagem("Endereço preenchido automaticamente.", "green");
            })
            .catch(() => {
                mostrarMensagem("Erro ao buscar CEP.", "red");
            });

    });

}

function mostrarMensagem(texto, cor) {
    if (mensagemErro) {
        mensagemErro.style.color = cor;
        mensagemErro.textContent = texto;
    }
}




/* ================= ANIMAÇÃO REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* ================= CARROSSEL ================= */
const track = document.querySelector(".carousel-track");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

if (track && nextButton && prevButton) {

    const slides = Array.from(track.children);
    let currentIndex = 0;

    function updateCarousel() {
        if (!slides.length) return;
        const slideWidth = slides[0].clientWidth;
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }

    function goToNext() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function goToPrev() {
        currentIndex =
            currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        updateCarousel();
    }

    nextButton.addEventListener("click", goToNext);
    prevButton.addEventListener("click", goToPrev);

    window.addEventListener("resize", updateCarousel);
    window.addEventListener("load", updateCarousel);
}

/* ================= MODO ESCURO ================= */

const toggleThemeBtn = document.getElementById("toggle-theme");

// Carrega preferência salva
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleThemeBtn.textContent = "☀️";
}

if (toggleThemeBtn) {

    toggleThemeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            toggleThemeBtn.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            toggleThemeBtn.textContent = "🌙";
        }

    });

}
/* ================= WEATHER ================= */

const apiKey = "d1b40f8bc46c5a89ecc43734ad4cb7e1"; // coloque sua chave
const cidade = "Sapucaia do Sul,BR";

async function getWeather() {
    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${apiKey}&units=metric&lang=pt_br`
        );

        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }

        const data = await response.json();

        const temperatura = Math.round(data.main.temp);
        const descricao = data.weather[0].description;
        const iconCode = data.weather[0].icon;

        document.getElementById("weather-temp").textContent = `${temperatura}°C`;
        document.getElementById("weather-desc").textContent = descricao;
        document.getElementById("weather-icon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    } catch (error) {
        console.error(error);
        document.getElementById("weather-desc").textContent = "Erro ao carregar clima";
    }
}

getWeather();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js")
      .then(() => console.log("Service Worker registrado"))
      .catch(err => console.log("Erro no SW:", err));
  });
}

const toggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav");

toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});