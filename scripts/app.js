const App = (() => {

    const $showOff = $('#show-off');
    const $searchField = $('#search');
    const $title = $('#section-title');

    let typingTimer;

    function init() {
        showInitialData();
        setupListeners();
    }

    function findCasesByCriteria(criteria) {
        return database.filter(item =>
            item.brand.toLowerCase().indexOf(criteria) > -1 ||
            item.model.toLowerCase().indexOf(criteria) > -1
        );
    }

    function showFilteredData(data) {
        $title.text('Resultados da busca');
        $showOff.empty();
        data.forEach(item =>
            $showOff.append($(getThumbTemplate(item)))
        );
    }

    function doSearch(ev) {
        const criteria = ev.target.value.toLowerCase();
        if (!criteria) return showInitialData();
        const filteredCases = findCasesByCriteria(criteria);
        showFilteredData(filteredCases);
        User.addSearch(criteria, filteredCases);
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
        $title.text('Mais populares');
        $showOff.empty();
        const mostPopular = [...database].splice(5);
        mostPopular.forEach(item =>
            $showOff.append($(getThumbTemplate(item)))
        );
    }

    function getThumbTemplate(item) {
        return `
            <div class="col-sm-4" id="item-${item.id}">
                <div class="thumbnail">
                    <img src="images/no-image.webp">
                    <div class="caption">
                        <h3>${item.brand} ${item.model}</h3>
                        <p>
                            <strong>SO</strong>: ${item.so} <br />
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

    return {
        init
    };

})();