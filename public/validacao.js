$('#btnConvert').click(function () {
    event.preventDefault();

    const cotacao = $('#cotacao').val();
    const quantidade = $('#quantidade').val();

    $('#cotacao').click(function () {
        $('#cotacao').removeClass('is-invalid');
    })
    $('#quantidade').click(function () {
        $('#quantidade').removeClass('is-invalid');
    })

    if (!cotacao) {
        $('#cotacao').addClass('is-invalid');
        return false;
    }

    if (!quantidade) {
        $('#quantidade').addClass('is-invalid');
        return false;
    }

    $('#form').submit();
})
