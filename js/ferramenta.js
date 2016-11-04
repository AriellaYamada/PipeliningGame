const NUM_INSTR = 5;

var instructions;
var exec_rows = '';
var exec_count = 0;
var instr_count = 0;

var vet_instr = [];		// sequencia base de instruções
var vet_ordem = [];		// ordem determinada pelo usuário

function gera_instrucoes(){
	instructions = '';
	limpa_instrucoes();

	vet_instr = gera_vetor(NUM_INSTR);
	for (let i = 0; i < NUM_INSTR; i++) {
		instructions += '<tr><td>' + i + '</td><td>' + vet_instr[i].getString() + '</td></tr>';
	}

	document.getElementById('instructions').innerHTML = instructions;
	$("#instructions tr").dblclick(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		let pos = $(this).find('td:first').html();
		let instr = $(this).find('td:eq(1)').html();
		vet_ordem.push(pos);
		exec_rows += '<tr><td>' + exec_count + '</td><td>' + instr + '</td></tr>';
		exec_count++;
		instr_count++;
		document.getElementById('executions').innerHTML = exec_rows;
		document.getElementById('instructions').rows[pos].style.pointerEvents = 'none';
		document.getElementById('instructions').rows[pos].style.backgroundColor = '#f2dede';
	});
}

function adiciona_noop() {
	vet_ordem.push(-1);
	exec_rows += '<tr><td>' + exec_count + '</td><td>' + (new Instr(NOOP_INSTR)).getString() + '</td></tr>';
	exec_count++;
	document.getElementById('executions').innerHTML = exec_rows;
}

function limpa_instrucoes() {
	exec_count = 0;
	exec_rows = '';
	instr_count = 0;
	vet_ordem.length = 0;
	document.getElementById('instructions').innerHTML = instructions;
	document.getElementById('executions').innerHTML = exec_rows;
	$("#instructions tr").dblclick(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		let pos = $(this).find('td:first').html();
		let instr = $(this).find('td:eq(1)').html();
		vet_ordem.push(pos);
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
		let v = [];
		for (let i = 0; i < vet_ordem.length; i++) {
			if (vet_ordem[i] < 0)
				v.push(new Instr(NOOP_INSTR));
			else
				v.push(vet_instr[vet_ordem[i]]);
		}
		let dados_ok = verifica_dados(v);
		let estrut_ok = verifica_estrutural(v);
		let semantica_ok = verifica_semantica(vet_instr, vet_ordem);
		console.log("dados_ok = " + dados_ok + "\nestrut_ok = " + estrut_ok + "\nsemantica_ok = " + semantica_ok);
		
		let sol = solucao_otima(vet_instr);
		console.log("Solução ótima:");
		for (let i = 0; i < sol.length; i++)
			console.log(sol[i].getString());
	} else {
		console.log("Não finalizado!");
	}
}
