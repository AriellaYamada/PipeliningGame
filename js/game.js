$("#instructions tr").click(function(){
  $(this).addClass('selected').siblings().removeClass('selected');
  var instr = $(this).find('td:second').html();
  console.log(instr);
});
