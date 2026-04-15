const ADDRESSES_BY_SKLAD = {
    "Vostok": [
        {
            "sector": "2-АВ",
            "address": "Импортировано из KML (2-АВ)",
            "lat": "55.942017",
            "lon": "37.513951"
        },
        {
            "sector": "2В",
            "address": "Импортировано из KML (2В)",
            "lat": "55.869488",
            "lon": "37.591323"
        },
        {
            "sector": "3",
            "address": "Импортировано из KML (3)",
            "lat": "55.852537",
            "lon": "37.630611"
        },
        {
            "sector": "3-А",
            "address": "Импортировано из KML (3-А)",
            "lat": "55.954557",
            "lon": "37.837390"
        },
        {
            "sector": "4",
            "address": "Импортировано из KML (4)",
            "lat": "55.790741",
            "lon": "37.687817"
        },
        {
            "sector": "4-А",
            "address": "Импортировано из KML (4-А)",
            "lat": "55.826376",
            "lon": "37.969977"
        },
        {
            "sector": "5",
            "address": "Импортировано из KML (5)",
            "lat": "55.732441",
            "lon": "37.763681"
        },
        {
            "sector": "5-А",
            "address": "Импортировано из KML (5-А)",
            "lat": "55.724857",
            "lon": "38.025574"
        },
        {
            "sector": "6",
            "address": "Импортировано из KML (6)",
            "lat": "55.681601",
            "lon": "37.723764"
        },
        {
            "sector": "6-А",
            "address": "Импортировано из KML (6-А)",
            "lat": "55.625180",
            "lon": "38.046021"
        },
        {
            "sector": "7",
            "address": "Импортировано из KML (7)",
            "lat": "55.650474",
            "lon": "37.667338"
        },
        {
            "sector": "7-А",
            "address": "Импортировано из KML (7-А)",
            "lat": "55.520324",
            "lon": "37.793833"
        }
    ],
    "Center": [
        {
            "sector": "1",
            "address": "Импортировано из KML (1)",
            "lat": "55.829532",
            "lon": "37.499057"
        },
        {
            "sector": "1-А",
            "address": "Импортировано из KML (1-А)",
            "lat": "55.863746",
            "lon": "37.335942"
        },
        {
            "sector": "10-1",
            "address": "Импортировано из KML (10-1)",
            "lat": "55.736568",
            "lon": "37.460856"
        },
        {
            "sector": "10-2",
            "address": "Импортировано из KML (10-2)",
            "lat": "55.778969",
            "lon": "37.488327"
        },
        {
            "sector": "10-A",
            "address": "Импортировано из KML (10-A)",
            "lat": "55.748527",
            "lon": "37.256863"
        },
        {
            "sector": "16-11",
            "address": "Импортировано из KML (16-11)",
            "lat": "55.776915",
            "lon": "37.601646"
        },
        {
            "sector": "16-12",
            "address": "Импортировано из KML (16-12)",
            "lat": "55.740992",
            "lon": "37.641495"
        },
        {
            "sector": "16-13",
            "address": "Импортировано из KML (16-13)",
            "lat": "55.746693",
            "lon": "37.559569"
        },
        {
            "sector": "2-АЦ",
            "address": "Импортировано из KML (2-АЦ)",
            "lat": "55.949779",
            "lon": "37.473211"
        },
        {
            "sector": "2Ц",
            "address": "Импортировано из KML (2Ц)",
            "lat": "55.838113",
            "lon": "37.567756"
        },
        {
            "sector": "8-1",
            "address": "Импортировано из KML (8-1)",
            "lat": "55.695678",
            "lon": "37.618806"
        },
        {
            "sector": "8-2",
            "address": "Импортировано из KML (8-2)",
            "lat": "55.618157",
            "lon": "37.563954"
        },
        {
            "sector": "8-А",
            "address": "Импортировано из KML (8-А)",
            "lat": "55.503842",
            "lon": "37.525719"
        },
        {
            "sector": "9-1",
            "address": "Импортировано из KML (9-1)",
            "lat": "55.679189",
            "lon": "37.512193"
        },
        {
            "sector": "9-2",
            "address": "Импортировано из KML (9-2)",
            "lat": "55.700829",
            "lon": "37.477325"
        },
        {
            "sector": "9-А",
            "address": "Импортировано из KML (9-А)",
            "lat": "55.619368",
            "lon": "37.319330"
        }
    ]
};

const SKLAD_CONFIG = {
    "Vostok": {
        "resultBlockId": "reusltBlock-Vostok"
    },
    "Center": {
        "resultBlockId": "reusltBlock-Center"
    }
};

const renderState = {
    "Vostok": false,
    "Center": false
};

let activeSklad = null;

function setStatus(text) {
    const el = document.querySelector("#appStatus");
    if (!el) return;
    el.textContent = text || "";
}

function createCardMarkup(sklad, index, sectorData) {
    const lat = sectorData.lat;
    const lon = sectorData.lon;
    const mapUrl = `https://yandex.ru/maps/?ll=${lon},${lat}&mode=point&pt=${lon},${lat}&z=15`;
    const coordsText = `${lat}, ${lon}`;

    return `
        <article class="card is-loading" aria-label="Сектор ${sectorData.sector}">
            <div class="card-body" id="card-body-${sklad}-${index}">
                <h3 class="card-title">Сектор ${sectorData.sector}</h3>
                <p class="card-subtitle">
                    <a class="coord-link" href="${mapUrl}" target="_blank" rel="noopener noreferrer" title="Открыть в Яндекс.Картах">
                        <i class="bi bi-geo-alt"></i>
                        ${coordsText}
                    </a>
                </p>
                <div class="dates" id="list-date-${sklad}-${index}">
                    <div class="date-item">
                        <div class="date-head">
                            <span class="skeleton skeleton-line lg" style="width: 64px"></span>
                            <span class="skeleton skeleton-line lg" style="width: 96px"></span>
                        </div>
                        <div class="skeleton-row">
                            <span class="skeleton skeleton-chip"></span>
                            <span class="skeleton skeleton-chip"></span>
                        </div>
                    </div>
                    <div class="date-item">
                        <div class="date-head">
                            <span class="skeleton skeleton-line lg" style="width: 64px"></span>
                            <span class="skeleton skeleton-line lg" style="width: 96px"></span>
                        </div>
                        <div class="skeleton-row">
                            <span class="skeleton skeleton-chip"></span>
                            <span class="skeleton skeleton-chip"></span>
                        </div>
                    </div>
                </div>
                <div class="server" id="list-server-${sklad}-${index}">
                    <div class="date-item">
                        <div class="date-head">
                            <span class="skeleton skeleton-line" style="width: 140px"></span>
                            <span class="skeleton skeleton-line" style="width: 90px"></span>
                        </div>
                        <span class="skeleton skeleton-line" style="width: 85%"></span>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function fetchData(url, sklad, index, sectorData) {
    fetch(url, {
        "headers": {
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ0eXBlIjoiY29tcGFuaWVzIiwic2VjcmV0IjoiMDViMDMxNGU4OWZjMjk5MTEwOTEzYmYxM2ExYWJiZjhhYmMwMjU2NCIsImlhdCI6MTYwNzAwMDM1MX0.E7pELaHqlRTppS3q1iQoZoj14qOtGSXXlNtl1HbhnFc"
        }
    })
        .then(async (response) => {
            if (!response.ok) {
                let bodyText = "";
                try {
                    bodyText = await response.text();
                } catch (_) {
                    bodyText = "";
                }
                const snippet = bodyText ? bodyText.slice(0, 400) : "";
                throw new Error(`HTTP ${response.status} ${response.statusText}${snippet ? `: ${snippet}` : ""}`);
            }
            return response.json();
        })
        .then(data => {
            const intervals = data?.delivery?.courier?.cantata?.days;
            const serverInfo = document.querySelector(`#list-server-${sklad}-${index}`);
            const dateList = document.querySelector(`#list-date-${sklad}-${index}`);
            const cardBody = document.querySelector(`#card-body-${sklad}-${index}`);
            const card = cardBody ? cardBody.closest(".card") : null;

            if (dateList) dateList.innerHTML = "";
            if (serverInfo) serverInfo.innerHTML = "";
            if (card) card.classList.remove("is-loading");

            if (!Array.isArray(intervals)) {
                const lat = sectorData?.lat ?? "—";
                const lon = sectorData?.lon ?? "—";
                const sector = sectorData?.sector ?? "—";
                const debug = {
                    ok: true,
                    name: data?.name,
                    info: data?.info,
                    delivery: data?.delivery,
                };

                const message = "Ответ API не содержит delivery.courier.cantata.days (массив).";
                serverInfo.insertAdjacentHTML("beforeend", `
                    <div class="date-item">
                        <div class="date-head">
                            <p class="date-title" style="color: var(--danger)">Ошибка</p>
                            <p class="date-meta">${message}</p>
                        </div>
                        <details class="error-details" open>
                            <summary>Показать детали</summary>
                            <pre class="error-pre">${escapeHtml([
                                `sklad: ${sklad}`,
                                `sector: ${sector}`,
                                `lat: ${lat}`,
                                `lon: ${lon}`,
                                `url: ${url}`,
                                `note: days отсутствует или не массив`,
                                `response (partial): ${JSON.stringify(debug, null, 2)}`
                            ].join("\n"))}</pre>
                        </details>
                    </div>
                `);
                return;
            }

            serverInfo.insertAdjacentHTML("beforeend", `
                <div class="date-item">
                    <div class="date-head">
                        <p class="date-title">Данные для проверки</p>
                        <p class="date-meta">${data.info.warehouse}</p>
                    </div>
                    <div class="sectora">
                        <span class="intervalText is-wide" title="Город: ${data.name}">Город: ${data.name}</span>
                        <span class="intervalText is-wide" title="Цена: ${data.delivery.courier.cantata.price}₽">Цена: ${data.delivery.courier.cantata.price}₽</span>
                        <span class="intervalText" title="Бесплатно от: ${data.delivery.courier.cantata.sumRequired}₽">Бесплатно от: ${data.delivery.courier.cantata.sumRequired}₽</span>
                    </div>
                </div>
            `);

            let moreContainerId = `more-${sklad}-${index}`;

            for (let i = 0; i < intervals.length; i++) {
                const dateObj = new Date(intervals[i].date.slice(0, -1));
                const dateStr = dateObj.toLocaleDateString();
                const isToday = isSameLocalDate(dateObj, new Date());
                const intervalMarkup = `
                    <div class="date-item">
                        <div class="date-head">
                            <p class="date-title">Дата${isToday ? " (сегодня)" : ""}</p>
                            <p class="date-meta">${dateStr}</p>
                        </div>
                        <div class="sectora">${intervals[i].intervals}</div>
                    </div>
                `;

                if (i < 2) {
                    dateList.insertAdjacentHTML("beforeend", intervalMarkup);
                    continue;
                }

                if (i === 2) {
                    dateList.insertAdjacentHTML("beforeend", `
                        <div id="${moreContainerId}" hidden>
                            ${intervalMarkup}
                        </div>
                        <button class="btn-more" onclick="toggleMoreDays('${moreContainerId}', this);" type="button">Показать больше дней</button>
                    `);
                    continue;
                }

                const moreBlock = document.querySelector(`#${moreContainerId}`);
                if (moreBlock) moreBlock.insertAdjacentHTML("beforeend", intervalMarkup);
            }

            changeViewIntervals();
        })
        .catch(error => {
            console.error(error);

            const serverInfo = document.querySelector(`#list-server-${sklad}-${index}`);
            const dateList = document.querySelector(`#list-date-${sklad}-${index}`);
            const cardBody = document.querySelector(`#card-body-${sklad}-${index}`);
            const card = cardBody ? cardBody.closest(".card") : null;

            if (dateList) dateList.innerHTML = "";
            if (card) card.classList.remove("is-loading");

            if (serverInfo) {
                serverInfo.innerHTML = "";
                const lat = sectorData?.lat ?? "—";
                const lon = sectorData?.lon ?? "—";
                const sector = sectorData?.sector ?? "—";
                const msg = error?.message ? String(error.message) : String(error);
                serverInfo.insertAdjacentHTML("beforeend", `
                    <div class="date-item">
                        <div class="date-head">
                            <p class="date-title" style="color: var(--danger)">Ошибка</p>
                            <p class="date-meta">Не удалось получить данные с сервера</p>
                        </div>
                        <details class="error-details">
                            <summary>Показать детали</summary>
                            <pre class="error-pre">${escapeHtml([
                                `sklad: ${sklad}`,
                                `sector: ${sector}`,
                                `lat: ${lat}`,
                                `lon: ${lon}`,
                                `url: ${url}`,
                                `error: ${msg}`
                            ].join("\n"))}</pre>
                        </details>
                    </div>
                `);
            }
        });
}

function escapeHtml(input) {
    return String(input)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function changeViewIntervals() {
    const parentList = document.querySelectorAll(".sectora");

    for (let i = 0; i < parentList.length; i++) {
        parentList[i].childNodes.forEach(node => {
            let content;

            if (node.nodeType === 3 && (content = node.textContent.trim())) {
                const span = document.createElement("span");
                span.className = "intervalText";
                const cls = intervalToClass(content);
                if (cls) span.classList.add(cls);
                span.innerText = content;
                node.parentNode.replaceChild(span, node);
            }
        });
    }
}

function intervalToClass(text) {
    // Map exact interval strings to CSS classes
    // (we keep this strict to avoid coloring unexpected content)
    switch (text) {
        case "07:00-10:00":
            return "i-0700-1000";
        case "10:00-14:00":
            return "i-1000-1400";
        case "14:00-18:00":
            return "i-1400-1800";
        case "18:00-22:00":
            return "i-1800-2200";
        case "21:00-00:00":
            return "i-2100-0000";
        case "09:00-17:00":
            return "i-0900-1700";
        default:
            return "";
    }
}

function changeTextBtn(clickedElement) {
    clickedElement.innerHTML =
        clickedElement.innerHTML === "Показать больше дней" ? "Скрыть" : "Показать больше дней";
}

function toggleMoreDays(containerId, btn) {
    const el = document.getElementById(containerId);
    if (!el || !btn) return;
    const isHidden = el.hasAttribute("hidden");
    if (isHidden) el.removeAttribute("hidden");
    else el.setAttribute("hidden", "");
    btn.textContent = isHidden ? "Скрыть" : "Показать больше дней";
}

function isSameLocalDate(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function getIntervals(sklad) {
    const banner = document.querySelector("#bannerContent");
    const config = SKLAD_CONFIG[sklad];

    if (!config || renderState[sklad]) {
        return;
    }

    if (banner) banner.classList.add("is-compact");

    const resultBlock = document.querySelector(`#${config.resultBlockId}`);
    const sectors = ADDRESSES_BY_SKLAD[sklad] || [];

    if (sklad === activeSklad) setStatus("Загрузка…");

    for (let i = 0; i < sectors.length; i++) {
        const sector = sectors[i];
        const link = `https://delivery.cantata.ru/api/delivery/delivery_calc?language=RU&lat_for_zone=${sector.lat}&lon_for_zone=${sector.lon}`;

        resultBlock.insertAdjacentHTML("beforeend", createCardMarkup(sklad, i, sector));
        fetchData(link, sklad, i, sector);
    }

    renderState[sklad] = true;

    if (sklad === activeSklad) setTimeout(() => setStatus("Готово"), 300);
}

function activateSklad(sklad) {
    activeSklad = sklad;

    const btnV = document.getElementById("skladBtnVostok");
    const btnC = document.getElementById("skladBtnCenter");
    const panelV = document.getElementById("panelVostok");
    const panelC = document.getElementById("panelCenter");

    const isV = sklad === "Vostok";

    if (btnV) {
        btnV.classList.toggle("is-active", isV);
        btnV.setAttribute("aria-pressed", String(isV));
    }
    if (btnC) {
        btnC.classList.toggle("is-active", !isV);
        btnC.setAttribute("aria-pressed", String(!isV));
    }

    if (panelV) panelV.classList.toggle("is-active", isV);
    if (panelC) panelC.classList.toggle("is-active", !isV);

    setStatus("");
    getIntervals(sklad);
}

setStatus("Выберите склад");
