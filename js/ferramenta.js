const NUM_INSTR = 10;

var instructions;
var exec_rows = '';
var exec_count = 0;
var instr_count = 0;

var vet_instr = [];
var v = [];

function gera_instrucoes(){
	instructions = '';
	limpa_instrucoes();
	for (let i = 0; i < NUM_INSTR; i++) {
		let instr = new Instr(Math.floor(Math.random() * 2));
		vet_instr.push(instr);
		instructions += '<tr><td>' + i + '</td><td>' + instr.getString() + '</td></tr>';
	}
	document.getElementById('instructions').innerHTML = instructions;
	$("#instructions tr").dblclick(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		let pos = $(this).find('td:first').html();
		let instr = $(this).find('td:eq(1)').html();
		v.push(vet_instr[pos]);
		exec_rows += '<tr><td>' + exec_count + '</td><td>' + instr + '</td></tr>';
		exec_count++;
		instr_count++;
		document.getElementById('executions').innerHTML = exec_rows;
		document.getElementById('instructions').rows[pos].style.pointerEvents = 'none';
		document.getElementById('instructions').rows[pos].style.backgroundColor = '#f2dede';
	});
}

function adiciona_noop() {
	let instr = new Instr(NOOP_INSTR);
	v.push(instr);
	exec_rows += '<tr><td>' + exec_count + '</td><td>' + instr.getString() + '</td></tr>';
	exec_count++;
	document.getElementById('executions').innerHTML = exec_rows;
}

function limpa_instrucoes() {
	exec_count = 0;
	exec_rows = '';
	instr_count = 0;
	v.length = 0;
	document.getElementById('instructions').innerHTML = instructions;
	document.getElementById('executions').innerHTML = exec_rows;
	$("#instructions tr").dblclick(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		let pos = $(this).find('td:first').html();
		let instr = $(this).find('td:eq(1)').html();
		v.push(vet_instr[pos]);
		exec_rows += '<tr><td>' + exec_count + '</td><td>' + instr + '</td></tr>';
		exec_count++;
		instr_count++;
		document.getElementById('executions').innerHTML = exec_rows;
		document.getElementById('instructions').rows[pos].style.pointerEvents = 'none';
		document.getElementById('instructions').rows[pos].style.backgroundColor = '#f2dede';
	});
}

function ver_end() {
	if(instr_count >= NUM_INSTR){
		let size = document.getElementById('executions').rows.length;
			let dados_flag = verifica_dados(v);
			let estrut_flag = verifica_estrutural(v);
			console.log("Dados: " + dados_flag + "\nEstrutural: " + estrut_flag);
	} else {
		console.log("Não finalizado!");
	}
}
