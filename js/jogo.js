var instructions;
var exec_count = 0;
var exec_rows = '';

function generate_instr(){
	instructions = '';
	clear_instr();
	for (var i = 0; i < 20; i++) {
		var instr = new Instr(Math.floor(Math.random() * 3));
		instructions += '<tr><td>' + i + '</td><td>' + instr.getString() + '</td></tr>';
	}
	$('#instructions').html(instructions);
	$("#instructions tr").dblclick(function(){
	  $(this).addClass('selected').siblings().removeClass('selected');
	  var instr = $(this).find('td:eq(1)').html();
		$(this).remove();
		exec_rows += '<tr><td>' + exec_count + '</td><td>' + instr + '</td></tr>';
		exec_count++;
		$('#executions').html(exec_rows);
	});
	$("#executions tr").dblclick(function(){
	  $(this).addClass('selected').siblings().removeClass('selected');
		//var i = $(this).find('td:first').html();
		var instr = $(this).find('td:eq(1)').html();
		$(this).remove();
		var temp = document.getElementById('instructions').innerHTML;
		temp += '<tr><td>' + exec_rows + '</td><td>' + instr + '</td></tr>';
		$('#instructions').html(temp);
	});
}

function clear_instr() {
	$('#instructions').html(instructions);
	document.getElementById('executions').innerHTML = '';
	exec_count = 0;
	exec_rows = '';
}
