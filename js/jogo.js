var instructions;
var exec_count = 0;
var exec_rows = '';

function gera_instrucoes(){
	instructions = '';
	limpa_instrucoes();
	for (var i = 0; i < 10; i++) {
		var instr = new Instr(Math.floor(Math.random() * 3));
		instructions += '<tr><td>' + i + '</td><td>' + instr.getString() + '</td></tr>';
	}
	document.getElementById('instructions').innerHTML = instructions;
	$("#instructions tr").dblclick(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		var instr = $(this).find('td:eq(1)').html();
		$(this).remove();
		exec_rows += '<tr><td>' + exec_count + '</td><td>' + instr + '</td></tr>';
		exec_count++;
		document.getElementById('executions').innerHTML = exec_rows;
	});
}

function limpa_instrucoes() {
	exec_count = 0;
	exec_rows = '';
	document.getElementById('instructions').innerHTML = instructions;
	document.getElementById('executions').innerHTML = exec_rows;
	$("#instructions tr").dblclick(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		var instr = $(this).find('td:eq(1)').html();
		$(this).remove();
		exec_rows += '<tr><td>' + exec_count + '</td><td>' + instr + '</td></tr>';
		exec_count++;
		document.getElementById('executions').innerHTML = exec_rows;
	});
}

function ver_end() {
	var size = document.getElementById('executions').rows.length;
	//if(size == 10)
}
