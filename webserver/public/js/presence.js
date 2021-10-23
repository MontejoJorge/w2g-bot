$(document).ready(function () {
   main();
});

function main() {
   $('.presence-form').on('click', '.remove-activity', function () {
      let row = $('.activity-row');

      if (row.length <= 1) {
         $(this).addClass('disabled');
         $(this).parents('.activity-row').addClass('latest');
      } else {
         $(this).parents('.activity-row').remove();
      }
   });
}

function addAcitity() {
   let latest = $('.latest');

   $('button.disabled').removeClass('disabled');

   $(latest).clone().find('input:text').val('').end().insertAfter('.latest');

   $(latest).removeClass('latest');
}
