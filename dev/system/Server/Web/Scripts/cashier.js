$(document).ready(() => {
    $('#items .item .information').each((index, elem) => {
        $(elem).on('click', e => {
            $('#items .item').each((index, elem2) => {
                if (elem2 != $(elem).parent()[0]) {
                    $(elem2).removeClass('open');
                }
            });
            $(elem)
                .parent()
                .toggleClass('open');
        });
    });

    let pastHistoryContainer = $('.history .past');
});
