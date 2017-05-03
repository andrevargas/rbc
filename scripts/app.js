const App = (() => {

    const init = () => {
        showInitialData();
        setupListeners();
    }

    const doSearch = (ev) => {
        console.log(ev);
    }

    const setupListeners = () => {
        $('#search').on('keyup', doSearch);
    }

    const showInitialData = () => {
        const $showOff = $('#show-off');
        const mostPopular = [...database].splice(5);
        mostPopular.forEach(item => {
            $showOff.append($(getThumbTemplate(item)));
        });
    }

    const getThumbTemplate = item => `
        <div class="col-sm-4" id="item-${item.id}">
            <div class="thumbnail">
                <img src="images/no-image.webp">
                <div class="caption">
                    <h3>${item.brand} ${item.model}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit ad illo facere hic soluta dolores.</p>
                </div>
            </div>
        </div>
    `;

    return {
        init
    };

})();