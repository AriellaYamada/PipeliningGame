const NUM_INSTR = 10;

var instructions;
var exec_rows = '';
var exec_count = 0;

var vet_instr = [];
var vet_ordem = [];

function gera_instrucoes(){
	instructions = '';
	limpa_instrucoes();
	for (let i = 0; i < NUM_INSTR; i++) {
		let instr = new Instr(Math.floor(Math.random() * 3));
		vet_instr.push(instr);
		instructions += '<tr><td>' + i + '</td><td>' + instr.getString() + '</td></tr>';
	}
	document.getElementById('instructions').innerHTML = instructions;
	$("#instructions tr").dblclick(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		vet_ordem.push($(this).find('td:first').html());
		let instr = $(this).find('td:eq(1)').html();
		$(this).remove();
		exec_rows += '<tr><td>' + exec_count + '</td><td>' + instr + '</td></tr>';
		exec_count++;
		document.getElementById('executions').innerHTML = exec_rows;
	});
}

function limpa_instrucoes() {
	exec_count = 0;
	exec_rows = '';
	vet_ordem.length = 0;
	document.getElementById('instructions').innerHTML = instructions;
	document.getElementById('executions').innerHTML = exec_rows;
	$("#instructions tr").dblclick(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		vet_ordem.push($(this).find('td:first').html());
		let instr = $(this).find('td:eq(1)').html();
		$(this).remove();
		exec_rows += '<tr><td>' + exec_count + '</td><td>' + instr + '</td></tr>';
		exec_count++;
		document.getElementById('executions').innerHTML = exec_rows;
	});
}

function ver_end() {
	let size = document.getElementById('executions').rows.length;
	if(size == NUM_INSTR) {
		let v = [];
		for(let i = 0; i < NUM_INSTR; i++) {
			v.push(vet_instr[vet_ordem[i]]);
		}
		let dados_flag = verifica_dados(v);
		let estrut_flag = verifica_estrutural(v);
		console.log("Dados: " + dados_flag + "\nEstrutural: " + estrut_flag);
	} else {
		console.log("Não finalizado!");
	}
}
