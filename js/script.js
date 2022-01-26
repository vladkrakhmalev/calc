$('.calc__flex-item').click(function() {
	$('.calc__flex-item').removeClass('_active')
	if (!$(this).hasClass('_active')) $(this).addClass('_active')
})
$('.calc__color').click(function () {
	$('.calc__color').removeClass('_active')
	if (!$(this).hasClass('_active')) $(this).addClass('_active')
})
$('.calc__color[for="calc-color-ral"]').click(function() {
	$('#color-popup').addClass('_visible')
})
$('.popup__btn-close.btn-close').click(function () {
	$('.popup__bg').removeClass('_visible')
})
$('.popup__color').click(function () {
	let color = $(this).attr('data-ral-color')
	$('.calc__color[for="calc-color-ral"] .calc__text').html(color)
	$('.calc__color[for="calc-color-ral"] .calc__color-circle').removeClass('_ral')
	$('.calc__color[for="calc-color-ral"] .calc__color-circle').addClass('_' + color)
	$('#calc-color-ral').val(color)
	$('.popup__bg').removeClass('_visible')
})
$('.input').click(function () {
	$(this).addClass('_focus')
})


let data = ''
$('.calc__btn').click(function(e) {
	e.preventDefault()
	data = $(e.target).closest('form').serialize()
	$('#form-popup').addClass('_visible')
	
})
$('.popup__btn').click(function(e) {
	e.preventDefault()
	let form = $(e.target).closest('form')
	data += form.serialize()

	$.post('ajax/', data, function (result) {
		if (result.status == 'success') openPopup('All good')
		else alert(result.message)
	}, 'json').fail(function () {
		openPopup('Error')
	})
	clearForm(form)
})
function openPopup(title) {
	let popup = $('#message-popup')
	$('.popup__bg').removeClass('_visible')
	popup.find('.popup__h3').text(title)
	popup.addClass('_visible')
	
}
function clearForm(form) {
	form.find('input').val('')
	form.find('.input').removeClass('_focus')
}



$(".calc__range._left").slider({
	animate: "fast",
	range: "min",
	min: 0,
	max: $('.calc__input-val[name="calc-width"]').attr('max'),
	value: $('.calc__input-val[name="calc-width"]').val(),
	classes: {
		"ui-slider": "range",
		"ui-slider-handle": "range__handle",
		"ui-slider-range": "range__line"
	},
	orientation: 'vertical'
});

$(".calc__range._bottom").slider({
	animate: "fast",
	range: "min",
	min: 0,
	max: $('.calc__input-val[name="calc-height"]').attr('max'),
	value: $('.calc__input-val[name="calc-height"]').val(),
	classes: {
		"ui-slider": "range",
		"ui-slider-handle": "range__handle",
		"ui-slider-range": "range__line"
	},
})

$(document).ready(function () {

	$(".calc__range._left").slider({
		slide: function (event, ui) {
			$('.calc__input-val[name="calc-width"]').val(ui.value)
		}
	})
	$(".calc__range._bottom").slider({
		slide: function (event, ui) {
			$('.calc__input-val[name="calc-height"]').val(ui.value)
		}
	})

	$('.calc__input-val[name="calc-width"]').on('input', function () {
		$(".calc__range._left").slider("value", $(this).val())
	})
	$('.calc__input-val[name="calc-height"]').on('input', function () {
		$(".calc__range._bottom").slider("value", $(this).val())
	})
})

