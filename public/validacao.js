$('#btnConvert').click(function () {
    event.preventDefault();

    const cotacao = $('#cotacao').val();
    const quantidade = $('#quantidade').val();

    $('#cotacao').click(function () {
        $('#cotacao').removeClass('is-danger');
    })
    $('#quantidade').click(function () {
        $('#quantidade').removeClass('is-danger');
    })

    if (!cotacao) {
        $('#cotacao').addClass('is-danger');
        return false;
    }

    if (!quantidade) {
        $('#quantidade').addClass('is-danger');
        return false;
    }

    $('#form').submit();
})
