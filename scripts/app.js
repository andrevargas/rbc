const App = (() => {

    const $searchField = $('#search');
    const $showOffTitle = $('#show-off-title');
    const $showOffRow = $('#show-off');
    const $recommendationRow = $('#recommendation');
    const $recommendationTitle = $('#recommendation-title');

    const MIN_SIMILARITY_LEVEL = 0.7;
    const RECOMMENDATION_TIMEOUT = 60000;

    let typingTimer;

    function init() {
        showInitialData();
        setupListeners();
        startRecommendationWorker();
    }

    function findCasesByCriteria(criteria) {
        return database.filter(item =>
            item.brand.toLowerCase().indexOf(criteria) > -1 ||
            item.model.toLowerCase().indexOf(criteria) > -1
        );
    }

    function showFilteredData(data) {
        $showOffTitle.text('Resultados da busca');
        $showOffRow.empty();
        data.forEach(item =>
            $showOffRow.append($(getThumbTemplate(item)))
        );
    }

    function doSearch(ev) {
        const criteria = ev.target.value.toLowerCase();
        if (!criteria) return showInitialData();
        const filteredCases = findCasesByCriteria(criteria);
        showFilteredData(filteredCases);
        User.setLastSearch(criteria, filteredCases);
    }

    function setupListeners() {
        $searchField.on('keyup', (ev) => {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => doSearch(ev), 500);
        });
        $searchField.on('keydown', () => {
            clearTimeout(typingTimer);
        });
    }

    function showInitialData() {
        $showOffTitle.text('Mais populares');
        $showOffRow.empty();
        const mostPopular = [...database].splice(5);
        mostPopular.forEach(item =>
            $showOffRow.append($(getThumbTemplate(item)))
        );
    }

    function startRecommendationWorker() {
        setTimeout(() => {

            const result = RBC.testCase(buildCase());       
            const maxSims = result.filter(item => item.simValue >= MIN_SIMILARITY_LEVEL);

            $recommendationRow.empty();

            if (maxSims.length > 0) {
                $recommendationTitle.html(`Recomendado para você ${twemoji.parse('\u2764\uFE0F')}`);
                maxSims.forEach(item =>
                    $recommendationRow.append($(getMediaObjectTemplate(item)))
                );
            }

            startRecommendationWorker();

        }, RECOMMENDATION_TIMEOUT);
    }

    function buildCase() {

        const purchaseInfo = User.getLastPurchaseInfo();
        const search = User.getLastSearch();

        return Object.assign({}, search.results[0], purchaseInfo);

    }

    function getThumbTemplate(item) {
        return `
            <div class="col-sm-6" id="item-${item.id}">
                <div class="thumbnail">
                    <img src="images/generic-device.jpg">
                    <div class="caption">
                        <h3>${item.brand} ${item.model}</h3>
                        <p>
                            <strong>SO</strong>: ${item.so} ${item.dualSim ? `<span class="label label-info">Dual SIM</span>`: ''}<br />
                            <strong>RAM</strong>: ${item.ram}GB <br />
                            <strong>Armazenamento</strong>: ${item.storage}GB <br />
                            <strong>Tam. da tela</strong>: ${item.screenSize}'
                        </p>
                        <h4>R$ ${item.price.toFixed(2).replace('.', ',')}</h4>
                    </div>
                </div>
            </div>
        `;
    }

    function getMediaObjectTemplate(item) {
        return `
            <div class="col-md-6">
                <div class="media">
                    <div class="media-left">
                        <a href="#">
                            <img class="media-object" src="images/generic-device.jpg" width="100" height="100">
                        </a>
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">${item.brand} ${item.model}</h4>
                        <p>
                            ${item.ram}GB de memória RAM + ${item.storage}GB de armazenamento interno.
                            Aproveite! Por apenas <strong>R$ ${item.price.toFixed(2).replace('.', ',')}</strong>!
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    return {
        init
    };

})();